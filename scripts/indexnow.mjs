// Kirim semua URL dari sitemap ke IndexNow (Bing, Yandex, Seznam, Naver, dll).
// Pemakaian: npm run indexnow   (jalankan setelah deploy ke production)
const SITE = process.env.SITE_URL || "https://www.forexforbetterliving.com";
const KEY = "f90c6a9d7c8d5a9903c997c608959b90";

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`Gagal mengambil sitemap: HTTP ${r.status}`);
  return r.text();
});
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("Sitemap tidak berisi URL");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: ${urls.length} URL dikirim -> HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
