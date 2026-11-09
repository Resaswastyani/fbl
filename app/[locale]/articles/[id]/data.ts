import { cache } from "react";
import { prisma } from "@/server/db";

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

export const getRelatedArticles = cache(async (excludeId: string) => {
  try {
    return await prisma.article.findMany({
      where: { published: true, NOT: { id: excludeId } },
      orderBy: { createdAt: "desc" },
      take: 3,
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
    return [];
  }
});
