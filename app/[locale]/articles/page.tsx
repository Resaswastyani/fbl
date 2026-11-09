import { prisma } from "@/server/db";
import { stripHtml } from "@/lib/seo";
import ArticlesClient from "./ArticlesClient";

async function getArticles() {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
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
        author: { select: { name: true } },
      },
    });
    // Kirim ringkasan saja (bukan isi artikel penuh) ke client
    return rows.map((a) => ({
      ...a,
      content: stripHtml(a.content, 300),
      content_en: a.content_en ? stripHtml(a.content_en, 300) : null,
      thumbnail: a.thumbnail ?? undefined,
      createdAt: a.createdAt.toISOString(),
      author: { name: a.author?.name ?? null, email: "" },
    }));
  } catch (error) {
    console.error("Articles page: gagal mengambil artikel", error);
    return undefined;
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  return <ArticlesClient initialArticles={articles} />;
}
