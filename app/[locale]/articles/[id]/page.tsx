import { getLocale } from "next-intl/server";
import ArticleDetailClient from "./ArticleDetailClient";
import { getPublishedArticle, getRelatedArticles } from "./data";

type ArticleRow = NonNullable<Awaited<ReturnType<typeof getPublishedArticle>>>;
type RelatedRow = Awaited<ReturnType<typeof getRelatedArticles>>[number];

// Judul halaman sudah menjadi satu-satunya <h1>; heading H1 di dalam isi diturunkan ke H2
const demoteH1 = (html: string | null) =>
  html ? html.replace(/<h1(\s|>)/gi, "<h2$1").replace(/<\/h1>/gi, "</h2>") : html;

// Ubah Date -> string agar bisa dikirim ke client component.
// Hanya isi bahasa yang sedang dipakai yang dikirim (isi bisa berisi banyak gambar).
function serialize<T extends ArticleRow | RelatedRow>(a: T, locale: string) {
  const useEn = locale === "en" && !!a.content_en;
  return {
    ...a,
    content: useEn ? "" : demoteH1(a.content) ?? "",
    content_en: useEn ? demoteH1(a.content_en ?? null) : null,
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

  const [related, locale] = await Promise.all([getRelatedArticles(id), getLocale()]);
  return (
    <ArticleDetailClient
      initialArticle={serialize(article, locale)}
      initialRelated={related.map((r) => serialize(r, locale))}
    />
  );
}
