import { cache } from "react";
import { prisma } from "@/server/db";
import { stripHtml } from "@/lib/seo";

// Satu query per request, dipakai bersama oleh layout (metadata/JSON-LD) dan page
export const getPublishedArticle = cache(async (id: string) => {
  try {
    return await prisma.article.findFirst({
      where: { id, published: true },
      select: {
        id: true,
        title: true,
        title_en: true,
        content: true,
        content_en: true,
        thumbnail: true,
        published: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { name: true } },
      },
    });
  } catch {
    return null;
  }
});

// Artikel terkait = artikel sebelum & sesudahnya (urut tanggal), sehingga setiap artikel
// mendapat link internal dari artikel lain. Hanya ringkasan yang dikirim, bukan isi penuh.
export const getRelatedArticles = cache(async (id: string) => {
  try {
    const all = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        title_en: true,
        thumbnail: true,
        published: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { name: true } },
      },
    });
    const idx = all.findIndex((a) => a.id === id);
    const picks =
      idx < 0
        ? all.slice(0, 3)
        : [all[idx - 1], all[idx + 1], all[idx + 2] ?? all[idx - 2]].filter(Boolean);
    const ids = picks.map((a) => a!.id);

    // Ambil potongan isi untuk excerpt saja
    const excerpts = await prisma.article.findMany({
      where: { id: { in: ids } },
      select: { id: true, content: true, content_en: true },
    });
    return picks.map((a) => {
      const e = excerpts.find((x) => x.id === a!.id);
      return {
        ...a!,
        content: stripHtml(e?.content ?? "", 200),
        content_en: e?.content_en ? stripHtml(e.content_en, 200) : null,
      };
    });
  } catch {
    return [];
  }
});
