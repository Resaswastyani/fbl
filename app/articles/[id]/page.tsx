// app/articles/[id]/page.tsx
"use client";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Calendar,
  User,
  Eye,
  Loader,
  Share2,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string | null;
    email: string;
  };
}

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string);
    }
  }, [params.id]);

  const fetchArticle = async (id: string) => {
    try {
      const res = await fetch(`/api/articles?id=${id}`);
      const data = await res.json();

      if (data.article) {
        setArticle(data.article);
        // Fetch related articles (exclude current)
        fetchRelatedArticles(id);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (currentId: string) => {
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      const filtered = (data.articles || [])
        .filter((a: Article) => a.id !== currentId && a.published)
        .slice(0, 3);
      setRelatedArticles(filtered);
    } catch (error) {
      console.error("Error fetching related articles:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link disalin ke clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin h-8 w-8 text-[#156d95]" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-[#111A4A] mb-4">
            Artikel tidak ditemukan
          </h1>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[#156d95] hover:underline"
          >
            <ArrowLeft size={16} />
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-white">
        {/* HERO SECTION WITH THUMBNAIL - FULLWIDTH */}
        <section className="w-full pt-24 md:pt-32 pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Link */}
              <Link
                href="/articles"
                className="inline-flex items-center gap-1 text-[#6e6e6e] mb-6 hover:text-[#202020] transition-colors"
              >
                <span className="text-xs uppercase tracking-tight font-mono flex items-center gap-1">
                  <ArrowLeft size={14} strokeWidth={1.5} />
                  Kembali ke Artikel
                </span>
              </Link>

              {/* Title - Full width */}
              <h1
                className="text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-tight tracking-tight text-[#111A4A] mb-6 max-w-5xl"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                {article.title}
              </h1>

              {/* Meta Info - Full width layout */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#6e6e6e] mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#156d95] text-white flex items-center justify-center text-sm font-bold">
                    {(article.author.name || article.author.email)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-[#111A4A]">
                      {article.author.name || article.author.email}
                    </p>
                    <p className="text-xs">Penulis</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(article.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {article.viewCount} views
                  </span>
                </div>

                <button
                  onClick={handleShare}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-[#156d95] hover:text-[#156d95] transition-colors"
                >
                  <Share2 size={14} />
                  Bagikan
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THUMBNAIL - FULLWIDTH EDGE TO EDGE */}
        {article.thumbnail && (
          <section className="w-full pb-12 bg-white">
            <div className="w-full px-4 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full aspect-[21/9] rounded-xl overflow-hidden max-h-[70vh]"
              >
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </section>
        )}

        {/* ARTICLE CONTENT - WIDER READABLE WIDTH */}
        <section className="w-full pb-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {/* Custom prose styling to match theme */}
              <div
                className="article-content text-[#111A4A] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </motion.div>

            {/* Tags or Categories (if available) */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-[#6e6e6e] mb-3">
                Dipublikasikan pada:
              </p>
              <p className="text-[#111A4A] font-medium">
                {formatDate(article.createdAt)}
              </p>
              {article.updatedAt !== article.createdAt && (
                <p className="text-xs text-[#6e6e6e] mt-1">
                  Diperbarui: {formatDate(article.updatedAt)}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* RELATED ARTICLES - FULLWIDTH */}
        {relatedArticles.length > 0 && (
          <section className="w-full py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-2xl font-medium text-[#111A4A] mb-8"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Artikel Terkait
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedArticles.map((related, index) => (
                    <motion.article
                      key={related.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => router.push(`/articles/${related.id}`)}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {related.thumbnail ? (
                          <img
                            src={related.thumbnail}
                            alt={related.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#156d95]/10 to-[#111A4A]/10">
                            <span className="text-[#156d95] text-2xl font-bold">
                              FBL
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-[#6e6e6e] mb-2 font-mono">
                          <span>{formatDate(related.createdAt)}</span>
                          <span>•</span>
                          <span>{related.viewCount} views</span>
                        </div>
                        <h3
                          className="text-lg font-medium text-[#111A4A] leading-tight group-hover:text-[#156d95] transition-colors line-clamp-2"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {related.title}
                        </h3>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA SECTION - FULLWIDTH */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-[32px] md:text-[40px] font-medium leading-tight text-[#111A4A] mb-6"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Siap Memulai Trading Journey Anda?
              </h2>
              <p
                className="text-lg text-[#6e6e6e] mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Bergabunglah dengan ribuan trader Indonesia yang telah belajar
                bersama Forex for Better Living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/login")}
                  className="inline-flex items-center justify-center bg-[#156d95] text-white rounded-lg px-8 py-4 text-base font-medium transition-all hover:bg-[#0d5a7c]"
                >
                  Mulai Belajar Sekarang
                  <ArrowUpRight size={18} className="ml-2" />
                </button>
                <Link
                  href="/articles"
                  className="inline-flex items-center justify-center border-2 border-[#111A4A] text-[#111A4A] rounded-lg px-8 py-4 text-base font-medium transition-all hover:bg-[#111A4A] hover:text-white"
                >
                  Lihat Semua Artikel
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  );
}
