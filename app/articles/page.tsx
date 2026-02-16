// // app/articles/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { ArrowUpRight, Calendar, User, Eye, Loader } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Header } from "@/components/Header";
// import Footer from "@/components/Footer";

// interface Article {
//   id: string;
//   title: string;
//   content: string;
//   thumbnail?: string;
//   published: boolean;
//   viewCount: number;
//   createdAt: string;
//   author: {
//     name: string | null;
//     email: string;
//   };
// }

// export default function ArticlesPage() {
//   const router = useRouter();
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     try {
//       const res = await fetch("/api/articles");
//       const data = await res.json();
//       setArticles(data.articles || []);
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const stripHtml = (html: string) => {
//     return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <Loader className="animate-spin h-8 w-8 text-[#156d95]" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="min-h-screen bg-white pt-24 md:pt-28">
//         {" "}
//         {/* ✅ PADDING TOP DITAMBAH */}
//         {/* ARTICLES GRID */}
//         <section className="w-full py-8 md:py-12 bg-white">
//           {" "}
//           {/* ✅ TAMBAH PADDING Y */}
//           <div className="max-w-7xl mx-auto px-8 md:px-12">
//             {articles.length === 0 ? (
//               <div className="text-center py-20">
//                 <p className="text-[#6e6e6e] text-lg">
//                   Belum ada artikel yang tersedia.
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {articles.map((article, index) => (
//                   <motion.article
//                     key={article.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     className="group cursor-pointer"
//                     onClick={() => router.push(`/articles/${article.id}`)}
//                   >
//                     {/* Thumbnail */}
//                     <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-gray-100">
//                       {article.thumbnail ? (
//                         <img
//                           src={article.thumbnail}
//                           alt={article.title}
//                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#156d95]/10 to-[#111A4A]/10">
//                           <span className="text-[#156d95] text-4xl font-bold">
//                             FBL
//                           </span>
//                         </div>
//                       )}
//                       {/* Overlay on hover */}
//                       <div className="absolute inset-0 bg-[#111A4A]/0 group-hover:bg-[#111A4A]/10 transition-colors duration-300" />
//                     </div>

//                     {/* Meta Info */}
//                     <div className="flex items-center gap-4 text-xs text-[#6e6e6e] mb-3 font-mono uppercase tracking-tight">
//                       <span className="flex items-center gap-1">
//                         <Calendar size={12} />
//                         {formatDate(article.createdAt)}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Eye size={12} />
//                         {article.viewCount} views
//                       </span>
//                     </div>

//                     {/* Title */}
//                     <h2
//                       className="text-xl font-medium text-[#111A4A] mb-2 leading-tight group-hover:text-[#156d95] transition-colors"
//                       style={{ fontFamily: "var(--font-figtree), Figtree" }}
//                     >
//                       {article.title}
//                     </h2>

//                     {/* Excerpt */}
//                     <p
//                       className="text-sm text-[#6e6e6e] leading-relaxed mb-3"
//                       style={{ fontFamily: "var(--font-figtree), Figtree" }}
//                     >
//                       {stripHtml(article.content)}
//                     </p>

//                     {/* Author */}
//                     <div className="flex items-center gap-2">
//                       <div className="w-6 h-6 rounded-full bg-[#156d95] text-white flex items-center justify-center text-xs font-bold">
//                         {(article.author.name || article.author.email)
//                           .charAt(0)
//                           .toUpperCase()}
//                       </div>
//                       <span className="text-xs text-[#6e6e6e]">
//                         {article.author.name || article.author.email}
//                       </span>
//                     </div>

//                     {/* Read More Link */}
//                     <div className="mt-4 flex items-center gap-1 text-[#156d95] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
//                       Baca Selengkapnya
//                       <ArrowUpRight size={14} />
//                     </div>
//                   </motion.article>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// }

// app/articles/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  User,
  Eye,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  author: {
    name: string | null;
    email: string;
  };
}

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
  };

  // Pagination logic
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin h-8 w-8 text-[#156d95]" />
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-white pt-24 md:pt-28">
        {" "}
        {/* ✅ PADDING TOP DITAMBAH */}
        {/* ARTICLES GRID */}
        <section className="w-full py-8 md:py-12 bg-white">
          {" "}
          {/* ✅ TAMBAH PADDING Y */}
          <div className="max-w-7xl mx-auto px-8 md:px-12">
            {articles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#6e6e6e] text-lg">
                  Belum ada artikel yang tersedia.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/articles/${article.id}`)}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-gray-100">
                        {article.thumbnail ? (
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#156d95]/10 to-[#111A4A]/10">
                            <span className="text-[#156d95] text-4xl font-bold">
                              FBL
                            </span>
                          </div>
                        )}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-[#111A4A]/0 group-hover:bg-[#111A4A]/10 transition-colors duration-300" />
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-[#6e6e6e] mb-3 font-mono uppercase tracking-tight">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(article.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {article.viewCount} views
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-xl font-medium text-[#111A4A] mb-2 leading-tight group-hover:text-[#156d95] transition-colors"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p
                        className="text-sm text-[#6e6e6e] leading-relaxed mb-3"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {stripHtml(article.content)}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#156d95] text-white flex items-center justify-center text-xs font-bold">
                          {(article.author.name || article.author.email)
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <span className="text-xs text-[#6e6e6e]">
                          {article.author.name || article.author.email}
                        </span>
                      </div>

                      {/* Read More Link */}
                      <div className="mt-4 flex items-center gap-1 text-[#156d95] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Baca Selengkapnya
                        <ArrowUpRight size={14} />
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-12 gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-[#156d95] hover:text-white hover:border-[#156d95] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                              currentPage === page
                                ? "bg-[#156d95] text-white"
                                : "border border-gray-200 text-gray-600 hover:bg-[#156d95] hover:text-white hover:border-[#156d95]"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-[#156d95] hover:text-white hover:border-[#156d95] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  );
}
