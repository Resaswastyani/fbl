import type { MetadataRoute } from "next";
import { prisma } from "@/server/db";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: Array<[string, Entry["changeFrequency"], number]> = [
  ["/", "daily", 1.0],
  ["/robot-trading", "weekly", 0.9],
  ["/professional-course", "weekly", 0.9],
  ["/articles", "daily", 0.8],
  ["/video-trading", "weekly", 0.8],
  ["/webinar", "weekly", 0.7],
  ["/panduan-ea-trial", "monthly", 0.7],
  ["/mentor", "monthly", 0.7],
  ["/broker-rekommendation", "monthly", 0.7],
  ["/position-size-calculator", "monthly", 0.6],
  ["/Jurnal-trading", "monthly", 0.5],
  ["/philosophy", "monthly", 0.5],
  ["/signup", "yearly", 0.4],
  ["/disclaimer", "yearly", 0.3],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ([path, changeFrequency, priority]) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  try {
    const [articles, courses] = await Promise.all([
      prisma.article.findMany({
        where: { published: true },
        select: { id: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.course.findMany({
        where: { published: true },
        select: { id: true, updatedAt: true },
      }),
    ]);

    for (const a of articles) {
      entries.push({
        url: `${SITE_URL}/articles/${a.id}`,
        lastModified: a.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
    for (const c of courses) {
      entries.push({
        url: `${SITE_URL}/course/${c.id}`,
        lastModified: c.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error("Sitemap: gagal mengambil artikel/kursus", error);
  }

  return entries;
}
