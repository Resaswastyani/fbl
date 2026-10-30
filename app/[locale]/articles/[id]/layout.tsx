import type { Metadata } from "next";
import { prisma } from "@/server/db";
import {
  buildMetadata,
  stripHtml,
  absoluteUrl,
  JsonLd,
  SITE_NAME,
  SITE_URL,
  OG_IMAGE,
} from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

async function getArticle(id: string) {
  try {
    return await prisma.article.findFirst({
      where: { id, published: true },
      select: {
        id: true,
        title: true,
        content: true,
        thumbnail: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { name: true } },
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return buildMetadata({
      title: "Artikel Edukasi Forex",
      description: "Artikel edukasi forex dan trading dari Forex for Better Living.",
      path: `/articles/${id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: stripHtml(article.content),
    path: `/articles/${article.id}`,
    image: article.thumbnail || OG_IMAGE,
    type: "article",
  });
}

export default async function ArticleLayout({ children, params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);

  return (
    <>
      {article && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: stripHtml(article.content),
            image: [absoluteUrl(article.thumbnail || OG_IMAGE)],
            datePublished: article.createdAt.toISOString(),
            dateModified: article.updatedAt.toISOString(),
            author: {
              "@type": "Person",
              name: article.author?.name || SITE_NAME,
            },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: absoluteUrl(`/articles/${article.id}`),
            inLanguage: "id-ID",
          }}
        />
      )}
      {children}
    </>
  );
}
