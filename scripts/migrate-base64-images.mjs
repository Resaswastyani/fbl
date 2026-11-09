// Kompres ulang gambar base64 di isi artikel & lesson (tetap inline, tanpa storage eksternal).
// Setiap gambar diubah ke WebP, lebar maks 1000px, quality 70.
//
//   node --env-file=.env.local scripts/migrate-base64-images.mjs          -> simulasi (tidak menulis apa pun)
//   node --env-file=.env.local scripts/migrate-base64-images.mjs --apply  -> jalankan sungguhan
//
// Mode --apply selalu menyimpan backup isi lama ke scripts/backup-base64-<waktu>.json dulu.
import { PrismaClient } from "@prisma/client";
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const APPLY = process.argv.includes("--apply");
const prisma = new PrismaClient();
const DATA_URL = /data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)/gi;
const cache = new Map(); // base64 asli -> data URL hasil kompres

async function optimize(mime, b64) {
  const key = b64.slice(0, 200) + b64.length;
  if (cache.has(key)) return cache.get(key);
  const original = `data:${mime};base64,${b64}`;
  let result = original;
  try {
    const input = Buffer.from(b64.replace(/\s/g, ""), "base64");
    let out = await sharp(input)
      .rotate()
      .resize(1000, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 70 })
      .toBuffer();
    if (out.length > 200 * 1024) {
      out = await sharp(input)
        .rotate()
        .resize(800, null, { withoutEnlargement: true, fit: "inside" })
        .webp({ quality: 60 })
        .toBuffer();
    }
    // Pakai hasil kompres hanya kalau memang lebih kecil
    if (out.length < input.length) result = `data:image/webp;base64,${out.toString("base64")}`;
  } catch (e) {
    console.warn("  gagal kompres satu gambar, dibiarkan:", e.message);
  }
  cache.set(key, result);
  return result;
}

async function optimizeHtml(html) {
  if (!html || !html.includes("data:image")) return { html, count: 0 };
  let count = 0;
  let out = "";
  let last = 0;
  for (const m of html.matchAll(DATA_URL)) {
    out += html.slice(last, m.index) + (await optimize(m[1], m[2]));
    last = m.index + m[0].length;
    count++;
  }
  return { html: out + html.slice(last), count };
}

const targets = [
  { model: "article", label: "Artikel", fields: ["content", "content_en"] },
  { model: "lesson", label: "Lesson", fields: ["content", "content_en"] },
];

const pending = [];
let totalImages = 0;
let totalBefore = 0;
let totalAfter = 0;
const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB";

for (const t of targets) {
  const rows = await prisma[t.model].findMany({
    select: { id: true, title: true, ...Object.fromEntries(t.fields.map((f) => [f, true])) },
  });
  for (const row of rows) {
    const data = {};
    let images = 0;
    let before = 0;
    let after = 0;
    for (const f of t.fields) {
      const { html, count } = await optimizeHtml(row[f]);
      if (count > 0 && html !== row[f]) {
        data[f] = html;
        images += count;
        before += row[f].length;
        after += html.length;
      }
    }
    if (images === 0) continue;
    totalImages += images;
    totalBefore += before;
    totalAfter += after;
    console.log(`${t.label} "${row.title.slice(0, 45)}": ${images} gambar, ${mb(before)} -> ${mb(after)}`);
    pending.push({
      model: t.model,
      id: row.id,
      data,
      original: Object.fromEntries(Object.keys(data).map((f) => [f, row[f]])),
    });
  }
}

console.log(`\nTotal: ${totalImages} gambar di ${pending.length} baris`);
console.log(`Ukuran isi: ${mb(totalBefore)} -> ${mb(totalAfter)}`);

if (APPLY && pending.length) {
  // Backup ditulis SEBELUM database diubah
  const file = `scripts/backup-base64-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  writeFileSync(file, JSON.stringify(pending.map(({ data, ...rest }) => rest)));
  console.log(`Backup isi lama: ${file}`);
  for (const p of pending) {
    await prisma[p.model].update({ where: { id: p.id }, data: p.data });
  }
  console.log(`Database diperbarui: ${pending.length} baris`);
} else if (!APPLY) {
  console.log("\nIni simulasi. Jalankan dengan --apply untuk benar-benar mengompres gambar.");
}
await prisma.$disconnect();
