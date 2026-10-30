import type { Metadata } from "next";
import { prisma } from "@/server/db";
import {
  buildMetadata,
  stripHtml,
  absoluteUrl,
  JsonLd,
  SITE_URL,
} from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

async function getCourse(id: string) {
  try {
    return await prisma.course.findFirst({
      where: { id, published: true },
      select: { id: true, title: true, description: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    return buildMetadata({
      title: "Kursus Forex",
      description: "Kursus forex dan trading dari Forex for Better Living.",
      path: `/course/${id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${course.title} – Kursus Forex`,
    description: stripHtml(
      course.description ||
        `Kursus ${course.title} dari Forex for Better Living. Belajar forex dan trading bersama mentor profesional.`
    ),
    path: `/course/${course.id}`,
    keywords: ["kursus forex", "kelas trading", course.title],
  });
}

export default async function CourseLayout({ children, params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);

  return (
    <>
      {course && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: stripHtml(course.description || course.title, 300),
            url: absoluteUrl(`/course/${course.id}`),
            inLanguage: "id-ID",
            provider: { "@id": `${SITE_URL}/#organization` },
          }}
        />
      )}
      {children}
    </>
  );
}
