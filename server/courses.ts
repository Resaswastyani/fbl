import { prisma } from "@/server/db";

// Daftar kursus ringkas untuk halaman publik: tanpa isi lesson (LongText) yang besar
export function getCourseSummaries() {
  return prisma.course.findMany({
    select: {
      id: true,
      title: true,
      title_en: true,
      description: true,
      description_en: true,
      price: true,
      published: true,
      lessons: {
        select: {
          id: true,
          title: true,
          title_en: true,
          type: true,
          duration: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
