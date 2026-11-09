import ArticleDetailClient from "./ArticleDetailClient";
import { getPublishedArticle, getRelatedArticles } from "./data";

type ArticleRow = NonNullable<Awaited<ReturnType<typeof getPublishedArticle>>>;

// Ubah Date -> string agar bisa dikirim ke client component
function serialize(a: ArticleRow) {
  return {
    ...a,
    thumbnail: a.thumbnail ?? undefined,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    author: { name: a.author?.name ?? null, email: "" },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getPublishedArticle(id);
  // Draft (belum publish) tetap ditangani client seperti sebelumnya
  if (!article) return <ArticleDetailClient />;

  const related = await getRelatedArticles(id);
  return (
    <ArticleDetailClient
      initialArticle={serialize(article)}
      initialRelated={related.map(serialize)}
    />
  );
}
