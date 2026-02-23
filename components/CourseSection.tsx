// // app/components/CourseSection.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Star,
//   Play,
//   X,
//   CheckIcon,
//   ShoppingCart,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { useCart } from "@/app/context/cart-context";
// import { useRouter } from "next/navigation";

// type Course = {
//   id: string;
//   title: string;
//   description?: string;
//   price?: string;
//   lessons: Lesson[];
//   published?: boolean;
// };

// type Lesson = {
//   id: string;
//   title: string;
//   type: "video" | "pdf" | "text" | "html";
//   content?: string;
//   contentUrl?: string;
//   duration?: string;
// };

// export default function CourseSection() {
//   const { addToCart, items, isLoggedIn } = useCart();
//   const router = useRouter();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [bundleCourses, setBundleCourses] = useState<Course[]>([]);
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const [lastAddedItem, setLastAddedItem] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Fetch enrolled courses untuk user yang login
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchEnrolledCourses();
//     }
//   }, [isLoggedIn]);

//   const fetchEnrolledCourses = async () => {
//     try {
//       const res = await fetch("/api/enrollments", {
//         credentials: "include",
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setEnrolledCourses(data.courses.map((c: any) => c.id));
//       }
//     } catch (error) {
//       console.error("Error fetching enrolled courses:", error);
//     }
//   };

//   // Listen to cartAdded event for guest users
//   useEffect(() => {
//     const handleCartAdded = (event: any) => {
//       if (event.detail?.guest) {
//         setLastAddedItem(event.detail.item);
//         setShowSuccessPopup(true);

//         setTimeout(() => {
//           setShowSuccessPopup(false);
//           setShowLoginPrompt(true);
//         }, 2000);
//       }
//     };

//     window.addEventListener("cartAdded", handleCartAdded as EventListener);
//     return () => {
//       window.removeEventListener("cartAdded", handleCartAdded as EventListener);
//     };
//   }, []);

//   // Fetch courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch("/api/courses");

//         const contentType = response.headers.get("content-type");
//         if (!contentType || !contentType.includes("application/json")) {
//           console.error("Non-JSON response from courses API");
//           setCourses(mockCourses);
//           setBundleCourses(mockCourses);
//           setLoading(false);
//           return;
//         }

//         const data = await response.json();
//         const coursesData = data.courses || data;

//         const sortedCourses = [...coursesData].sort((a, b) => {
//           const aIsFree = a.price === "Free";
//           const bIsFree = b.price === "Free";
//           if (aIsFree && !bIsFree) return -1;
//           if (!aIsFree && bIsFree) return 1;
//           return 0;
//         });

//         setCourses(sortedCourses);
//         setBundleCourses(sortedCourses);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         setCourses(mockCourses);
//         setBundleCourses(mockCourses);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   // Calculate bundle price
//   const calculateBundlePrice = () => {
//     const total = bundleCourses.reduce((sum, course) => {
//       if (course.price === "Free") return sum;
//       const price = course.price?.replace(/[^0-9]/g, "") || "0";
//       return sum + parseInt(price);
//     }, 0);

//     const discounted = Math.round(total * 0.6);

//     return {
//       originalPrice: total,
//       discountedPrice: discounted,
//       courseCount: bundleCourses.length,
//       courseTitles: bundleCourses.map((c) => c.title).join(", "),
//       courseIds: bundleCourses.map((c) => c.id),
//       courseNames: bundleCourses.map((c) => c.title),
//     };
//   };

//   // Format price
//   const formatPrice = (price: string | number) => {
//     const priceStr = typeof price === "number" ? price.toString() : price;
//     if (priceStr === "Free") return "Free";
//     const numeric = priceStr.replace(/[^0-9]/g, "");
//     return numeric
//       ? `Rp ${parseInt(numeric).toLocaleString("id-ID")}`
//       : priceStr;
//   };

//   // Check if course is free
//   const isCourseFree = (course: Course) => {
//     return !course.price || course.price === "Free" || course.price === "0";
//   };

//   // Check if user is enrolled
//   const isEnrolled = (courseId: string) => {
//     return enrolledCourses.includes(courseId);
//   };

//   // Handle preview course
//   const handlePreviewCourse = (course: Course) => {
//     setSelectedCourse(course);
//     setSelectedLesson(course.lessons[0] || null);
//     setIsPreviewOpen(true);
//   };

//   const handleClosePreview = () => {
//     setIsPreviewOpen(false);
//     setSelectedCourse(null);
//     setSelectedLesson(null);
//   };

//   const handleSelectLesson = (lesson: Lesson) => {
//     setSelectedLesson(lesson);
//   };

//   // Handle Add to Cart (untuk course berbayar)
//   const handleAddToCart = (course: Course | null, isBundle = false) => {
//     const bundleInfo = calculateBundlePrice();
//     let newItem: any;

//     if (isBundle) {
//       newItem = {
//         id: "bundle-all",
//         name: "Ultimate Trading Bundle",
//         price: bundleInfo.discountedPrice,
//         quantity: 1,
//         isBundle: true,
//         courseIds: bundleInfo.courseIds,
//         courseNames: bundleInfo.courseNames,
//       };
//     } else if (course) {
//       newItem = {
//         id: course.id,
//         name: course.title,
//         price: isCourseFree(course)
//           ? 0
//           : parseFloat(course.price?.replace(/[^0-9]/g, "") || "0"),
//         quantity: 1,
//         isBundle: false,
//         courseIds: [course.id],
//         courseNames: [course.title],
//       };
//     } else {
//       console.error("Invalid course or bundle");
//       return;
//     }

//     addToCart(newItem);

//     if (isLoggedIn) {
//       setLastAddedItem(newItem);
//       setShowSuccessPopup(true);

//       setTimeout(() => {
//         setShowSuccessPopup(false);
//       }, 2500);
//     }
//   };

//   // Handle Belajar Sekarang (untuk course free atau yang sudah dibeli)
//   const handleStartLearning = async (course: Course) => {
//     if (!isLoggedIn) {
//       // Guest user - langsung redirect ke course detail
//       router.push(`/course/${course.id}`);
//       return;
//     }

//     if (isEnrolled(course.id)) {
//       // Sudah enrolled - langsung ke course
//       router.push(`/course/${course.id}`);
//     } else if (isCourseFree(course)) {
//       // Course free tapi belum enrolled - enroll dulu
//       try {
//         const res = await fetch("/api/enrollments", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ courseId: course.id }),
//         });

//         if (res.ok) {
//           setEnrolledCourses([...enrolledCourses, course.id]);
//           router.push(`/course/${course.id}`);
//         } else {
//           const data = await res.json();
//           alert(data.error || "Gagal mendaftar ke course");
//         }
//       } catch (error) {
//         console.error("Error enrolling:", error);
//         alert("Terjadi kesalahan saat mendaftar");
//       }
//     }
//   };

//   const handleLogin = () => {
//     setShowLoginPrompt(false);
//     router.push("/login");
//   };

//   const handleCloseLoginPrompt = () => {
//     setShowLoginPrompt(false);
//   };

//   const isBundleInCart = () => {
//     return items.some((item) => item.isBundle);
//   };

//   const isCourseInCart = (courseId: string) => {
//     return items.some((item) => !item.isBundle && item.id === courseId);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(courses.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentCourses = courses.slice(startIndex, endIndex);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   // Helper: Strip HTML tags dan ambil beberapa kata untuk preview
//   const getPlainTextPreview = (htmlContent: string | undefined, wordCount: number = 20): string => {
//     if (!htmlContent) return "Deskripsi tidak tersedia.";

//     // Remove HTML tags
//     const plainText = htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

//     // Split into words and take first N words
//     const words = plainText.split(" ");
//     if (words.length <= wordCount) return plainText;

//     return words.slice(0, wordCount).join(" ") + "...";
//   };

//   // Mock courses
//   const mockCourses: Course[] = [
//     {
//       id: "c-forex-basics",
//       title: "Forex Foundations",
//       description:
//         "Dasar-dasar forex trading\nAnalisis teknikal dan fundamental",
//       price: "Free",
//       published: true,
//       lessons: [
//         {
//           id: "l1",
//           title: "Pengenalan Forex",
//           type: "html",
//           content: "Content...",
//           duration: "12",
//         },
//         {
//           id: "l2",
//           title: "Pair & Pip",
//           type: "video",
//           contentUrl: "/videos/pair-pip.mp4",
//           duration: "12",
//         },
//       ],
//     },
//     {
//       id: "c-strategy",
//       title: "Strategi Breakout & Pullback",
//       description: "Teknik trading lanjutan",
//       price: "Rp 599.000",
//       published: true,
//       lessons: [
//         {
//           id: "l4",
//           title: "Breakout Setup",
//           type: "video",
//           contentUrl: "/videos/breakout.mp4",
//           duration: "18",
//         },
//       ],
//     },
//   ];

//   // Get button text and action
//   const getButtonConfig = (course: Course) => {
//     if (isEnrolled(course.id)) {
//       return {
//         text: "Lanjutkan Belajar",
//         action: () => handleStartLearning(course),
//         variant: "default" as const,
//         disabled: false,
//       };
//     }

//     if (isCourseFree(course)) {
//       return {
//         text: "Belajar Sekarang",
//         action: () => handleStartLearning(course),
//         variant: "default" as const,
//         disabled: false,
//       };
//     }

//     if (isCourseInCart(course.id)) {
//       return {
//         text: "Dalam Keranjang",
//         action: () => router.push("/student/cart"),
//         variant: "outline" as const,
//         disabled: false,
//       };
//     }

//     return {
//       text: "Add to Cart",
//       action: () => handleAddToCart(course, false),
//       variant: "default" as const,
//       disabled: false,
//     };
//   };

//   const bundleInfo = calculateBundlePrice();

//   if (loading) {
//     return (
//       <div className="w-full pt-24 pb-16 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#156d95]"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
//       {/* Success Popup - Untuk Logged-in User */}
//       {showSuccessPopup && lastAddedItem && (
//         <div className="fixed top-6 right-6 z-60 animate-slide-in">
//           <div className="bg-[#156d95] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
//             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//               <CheckIcon className="text-[#156d95] w-4 h-4" />
//             </div>
//             <span className="font-medium">
//               {lastAddedItem.name} berhasil ditambahkan ke keranjang
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Login Prompt - Untuk Guest User */}
//       {showLoginPrompt && lastAddedItem && (
//         <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center animate-fade-in">
//             <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
//               <CheckIcon className="w-10 h-10 text-green-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-[#156d95] mb-3">
//               Berhasil Ditambahkan!
//             </h2>
//             <p className="text-gray-700 mb-8 leading-relaxed">
//               <strong>{lastAddedItem.name}</strong> sudah masuk ke keranjang.
//               <br />
//               Silakan <strong>login</strong> untuk melanjutkan ke pembayaran.
//             </p>
//             <div className="flex flex-col gap-3">
//               <button
//                 onClick={handleLogin}
//                 className="w-full py-3 bg-[#156d95] text-white rounded-xl font-medium hover:bg-[#0f5a7a] transition"
//               >
//                 Login Sekarang
//               </button>
//               <button
//                 onClick={handleCloseLoginPrompt}
//                 className="text-gray-600 hover:text-gray-800 underline"
//               >
//                 Nanti saja
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           {/* Bundle Card - TANPA SCROLL, TAMPIL SEMUA */}
//           <div className="lg:col-span-1 lg:sticky lg:top-24">
//             <Card className="h-full border-0 shadow-xl overflow-hidden bg-gradient-to-br from-[#156d95] to-[#0d476e]">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="bg-[#ff6b00] text-white rounded-full px-3 py-1 text-sm font-medium">
//                     HOT DEAL
//                   </div>
//                   <Badge variant="secondary" className="bg-white/20 text-white">
//                     40% OFF
//                   </Badge>
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-2">
//                   ULTIMATE TRADING BUNDLE
//                 </h2>
//                 <p className="text-white/90 text-base mb-3">
//                   <span className="font-bold">
//                     Includes {bundleInfo.courseCount} Courses:
//                   </span>
//                 </p>
//                 {/* ✅ HAPUS max-h-32 overflow-y-auto, TAMPIL SEMUA */}
//                 <ul className="text-white/80 text-sm space-y-1 mb-4 pr-2">
//                   {bundleInfo.courseNames.map((title, index) => (
//                     <li key={index} className="flex items-start">
//                       <span className="text-[#ff6b00] mr-2">•</span>
//                       <span>{title}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="flex items-center mb-4">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className="h-5 w-5 text-yellow-400 fill-yellow-400"
//                       />
//                     ))}
//                   </div>
//                   <span className="text-white/80 ml-2 text-sm">
//                     4.9 (2.4k ratings)
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="text-white/70 line-through text-lg">
//                     {formatPrice(bundleInfo.originalPrice)}
//                   </div>
//                   <div className="text-white text-2xl font-bold">
//                     {formatPrice(bundleInfo.discountedPrice)}
//                   </div>
//                 </div>
//                 {isBundleInCart() ? (
//                   <Button
//                     className="w-full bg-white text-[#156d95] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
//                     onClick={() => router.push("/student/cart")}
//                   >
//                     <ShoppingCart className="mr-2 h-5 w-5" /> VIEW IN CART
//                   </Button>
//                 ) : (
//                   <Button
//                     className="w-full bg-white text-[#156d95] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
//                     onClick={() => handleAddToCart(null, true)}
//                   >
//                     ADD TO CART
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Courses List */}
//           <div className="lg:col-span-2">
//             <div className="space-y-6">
//               {currentCourses.map((course) => {
//                 const buttonConfig = getButtonConfig(course);
//                 return (
//                   <Card
//                     key={course.id}
//                     className="border border-gray-200 hover:shadow-md transition-all overflow-hidden"
//                   >
//                     <CardContent className="p-6">
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <h3 className="text-xl font-bold text-gray-900">
//                               {course.title}
//                             </h3>
//                             {isEnrolled(course.id) && (
//                               <Badge className="bg-green-100 text-green-700">
//                                 Terdaftar
//                               </Badge>
//                             )}
//                             {isCourseFree(course) && (
//                               <Badge className="bg-blue-100 text-blue-700">
//                                 Gratis
//                               </Badge>
//                             )}
//                           </div>
//                           <div className="mt-2 flex items-center">
//                             <div className="flex text-yellow-400">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className="h-4 w-4 fill-yellow-400"
//                                 />
//                               ))}
//                             </div>
//                             <span className="ml-2 text-sm text-gray-500">
//                               4.9 (2.4k)
//                             </span>
//                           </div>
//                           <p className="text-gray-600 mt-2 text-sm line-clamp-2">
//                             {course.description}
//                           </p>
//                         </div>
//                         <div className="flex flex-col sm:items-end gap-2">
//                           <div className="text-lg font-bold text-[#156d95]">
//                             {formatPrice(course.price)}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="border-[#156d95] text-[#156d95] hover:bg-[#156d95]/5"
//                               onClick={() => handlePreviewCourse(course)}
//                             >
//                               Preview
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant={buttonConfig.variant}
//                               className={
//                                 buttonConfig.variant === "default"
//                                   ? "bg-[#156d95] hover:bg-[#0d476e] text-white"
//                                   : ""
//                               }
//                               onClick={buttonConfig.action}
//                               disabled={buttonConfig.disabled}
//                             >
//                               {buttonConfig.text}
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-center mt-8 gap-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-[#156d95] hover:text-white hover:border-[#156d95] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {[...Array(totalPages)].map((_, i) => {
//                     const page = i + 1;
//                     return (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
//                           currentPage === page
//                             ? "bg-[#156d95] text-white"
//                             : "border border-gray-200 text-gray-600 hover:bg-[#156d95] hover:text-white hover:border-[#156d95]"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-[#156d95] hover:text-white hover:border-[#156d95] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Preview Modal - FIX DESKRIPSI HTML */}
//       <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
//         <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//           <button
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 z-10"
//             onClick={handleClosePreview}
//           >
//             <X className="h-5 w-5" />
//           </button>
//           {selectedCourse && (
//             <div className="pt-8">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                 {selectedCourse.title}
//               </h3>
//               <div className="flex items-center mb-6">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 fill-yellow-400" />
//                   ))}
//                 </div>
//                 <span className="ml-2 text-gray-500">4.9 (2.4k ratings)</span>
//               </div>

//               <div className="mb-8">
//                 <h4 className="font-bold text-lg mb-4 text-gray-900">
//                   Lessons:
//                 </h4>
//                 <div className="space-y-3">
//                   {selectedCourse.lessons.map((lesson) => (
//                     <div
//                       key={lesson.id}
//                       className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${selectedLesson?.id === lesson.id ? "bg-[#156d95] text-white" : "bg-gray-50 hover:bg-gray-100"}`}
//                       onClick={() => handleSelectLesson(lesson)}
//                     >
//                       <div
//                         className={`p-2 rounded-lg mr-3 ${selectedLesson?.id === lesson.id ? "bg-white/20" : "bg-[#156d95] text-white"}`}
//                       >
//                         <Play className="h-4 w-4" />
//                       </div>
//                       <div className="flex-1">
//                         <h5 className="font-medium">{lesson.title}</h5>
//                         <p className="text-sm opacity-90">
//                           {lesson.duration} min • {lesson.type}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {selectedLesson && (
//                 <div className="border-t pt-6">
//                   <h4 className="text-xl font-bold text-gray-900 mb-4">
//                     {selectedLesson.title}
//                   </h4>
//                   <div className="mb-4">
//                     <div className="text-sm text-gray-500 mb-1">Duration</div>
//                     <div className="font-medium">
//                       {selectedLesson.duration} minutes • {selectedLesson.type}
//                     </div>
//                   </div>
//                   <div className="mb-6">
//                     <div className="text-sm text-gray-500 mb-1">
//                       Description
//                     </div>
//                     {/* ✅ FIX: Gunakan helper untuk strip HTML dan ambil preview */}
//                     <div className="text-gray-600">
//                       {getPlainTextPreview(selectedLesson.content, 30)}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </section>
//   );
// }

// app/components/CourseSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Play,
  X,
  CheckIcon,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";

type Course = {
  id: string;
  title: string;
  description?: string;
  price?: string;
  lessons: Lesson[];
  published?: boolean;
};

type Lesson = {
  id: string;
  title: string;
  type: "video" | "pdf" | "text" | "html";
  content?: string;
  contentUrl?: string;
  duration?: string;
};

export default function CourseSection() {
  const { addToCart, items, isLoggedIn } = useCart();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [bundleCourses, setBundleCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch enrolled courses untuk user yang login
  useEffect(() => {
    if (isLoggedIn) {
      fetchEnrolledCourses();
    }
  }, [isLoggedIn]);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch("/api/enrollments", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setEnrolledCourses(data.courses.map((c: any) => c.id));
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  // Listen to cartAdded event for guest users
  useEffect(() => {
    const handleCartAdded = (event: any) => {
      if (event.detail?.guest) {
        setLastAddedItem(event.detail.item);
        setShowSuccessPopup(true);

        setTimeout(() => {
          setShowSuccessPopup(false);
          setShowLoginPrompt(true);
        }, 2000);
      }
    };

    window.addEventListener("cartAdded", handleCartAdded as EventListener);
    return () => {
      window.removeEventListener("cartAdded", handleCartAdded as EventListener);
    };
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response from courses API");
          setCourses(mockCourses);
          setBundleCourses(mockCourses);
          setLoading(false);
          return;
        }

        const data = await response.json();
        const coursesData = data.courses || data;

        // ✅ SORT BY EXTRACTED NUMBER FROM TITLE to ensure correct order
        const sortedCourses = [...coursesData].sort((a, b) => {
          const numA = extractNumberFromTitle(a.title);
          const numB = extractNumberFromTitle(b.title);
          return numA - numB;
        });

        setCourses(sortedCourses);
        setBundleCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses(mockCourses);
        setBundleCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Helper: Extract number from title (e.g., "1. Title" -> 1, "10. Title" -> 10)
  const extractNumberFromTitle = (title: string): number => {
    const match = title.match(/^(\d+)\./);
    return match ? parseInt(match[1], 10) : 999;
  };

  // Calculate bundle price
  const calculateBundlePrice = () => {
    const total = bundleCourses.reduce((sum, course) => {
      if (course.price === "Free") return sum;
      const price = course.price?.replace(/[^0-9]/g, "") || "0";
      return sum + parseInt(price);
    }, 0);

    const discounted = Math.round(total * 0.6);

    return {
      originalPrice: total,
      discountedPrice: discounted,
      courseCount: bundleCourses.length,
      courseTitles: bundleCourses.map((c) => c.title).join(", "),
      courseIds: bundleCourses.map((c) => c.id),
      courseNames: bundleCourses.map((c) => c.title),
    };
  };

  // Format price
  const formatPrice = (price: string | number) => {
    const priceStr = typeof price === "number" ? price.toString() : price;
    if (priceStr === "Free") return "Free";
    const numeric = priceStr.replace(/[^0-9]/g, "");
    return numeric
      ? `Rp ${parseInt(numeric).toLocaleString("id-ID")}`
      : priceStr;
  };

  // Check if course is free
  const isCourseFree = (course: Course) => {
    return !course.price || course.price === "Free" || course.price === "0";
  };

  // Check if user is enrolled
  const isEnrolled = (courseId: string) => {
    return enrolledCourses.includes(courseId);
  };

  // Handle preview course
  const handlePreviewCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(course.lessons[0] || null);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedCourse(null);
    setSelectedLesson(null);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  // Handle Add to Cart (untuk course berbayar)
  const handleAddToCart = (course: Course | null, isBundle = false) => {
    const bundleInfo = calculateBundlePrice();
    let newItem: any;

    if (isBundle) {
      newItem = {
        id: "bundle-all",
        name: "Ultimate Trading Bundle",
        price: bundleInfo.discountedPrice,
        quantity: 1,
        isBundle: true,
        courseIds: bundleInfo.courseIds,
        courseNames: bundleInfo.courseNames,
      };
    } else if (course) {
      newItem = {
        id: course.id,
        name: course.title,
        price: isCourseFree(course)
          ? 0
          : parseFloat(course.price?.replace(/[^0-9]/g, "") || "0"),
        quantity: 1,
        isBundle: false,
        courseIds: [course.id],
        courseNames: [course.title],
      };
    } else {
      console.error("Invalid course or bundle");
      return;
    }

    addToCart(newItem);

    if (isLoggedIn) {
      setLastAddedItem(newItem);
      setShowSuccessPopup(true);

      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2500);
    }
  };

  // Handle Belajar Sekarang (untuk course free atau yang sudah dibeli)
  const handleStartLearning = async (course: Course) => {
    if (!isLoggedIn) {
      // Guest user - langsung redirect ke course detail
      router.push(`/course/${course.id}`);
      return;
    }

    if (isEnrolled(course.id)) {
      // Sudah enrolled - langsung ke course
      router.push(`/course/${course.id}`);
    } else if (isCourseFree(course)) {
      // Course free tapi belum enrolled - enroll dulu
      try {
        const res = await fetch("/api/enrollments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ courseId: course.id }),
        });

        if (res.ok) {
          setEnrolledCourses([...enrolledCourses, course.id]);
          router.push(`/course/${course.id}`);
        } else {
          const data = await res.json();
          alert(data.error || "Gagal mendaftar ke course");
        }
      } catch (error) {
        console.error("Error enrolling:", error);
        alert("Terjadi kesalahan saat mendaftar");
      }
    }
  };

  const handleLogin = () => {
    setShowLoginPrompt(false);
    router.push("/login");
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  const isBundleInCart = () => {
    return items.some((item) => item.isBundle);
  };

  const isCourseInCart = (courseId: string) => {
    return items.some((item) => !item.isBundle && item.id === courseId);
  };

  // Pagination logic
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Helper: Strip HTML tags dan ambil beberapa kata untuk preview
  const getPlainTextPreview = (
    htmlContent: string | undefined,
    wordCount: number = 20,
  ): string => {
    if (!htmlContent) return "Deskripsi tidak tersedia.";

    // Remove HTML tags
    const plainText = htmlContent
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Split into words and take first N words
    const words = plainText.split(" ");
    if (words.length <= wordCount) return plainText;

    return words.slice(0, wordCount).join(" ") + "...";
  };

  // Mock courses
  const mockCourses: Course[] = [
    {
      id: "c-forex-basics",
      title: "Forex Foundations",
      description:
        "Dasar-dasar forex trading\nAnalisis teknikal dan fundamental",
      price: "Free",
      published: true,
      lessons: [
        {
          id: "l1",
          title: "Pengenalan Forex",
          type: "html",
          content: "Content...",
          duration: "12",
        },
        {
          id: "l2",
          title: "Pair & Pip",
          type: "video",
          contentUrl: "/videos/pair-pip.mp4",
          duration: "12",
        },
      ],
    },
    {
      id: "c-strategy",
      title: "Strategi Breakout & Pullback",
      description: "Teknik trading lanjutan",
      price: "Rp 599.000",
      published: true,
      lessons: [
        {
          id: "l4",
          title: "Breakout Setup",
          type: "video",
          contentUrl: "/videos/breakout.mp4",
          duration: "18",
        },
      ],
    },
  ];

  // Get button text and action
  const getButtonConfig = (course: Course) => {
    if (isEnrolled(course.id)) {
      return {
        text: "Lanjutkan Belajar",
        action: () => handleStartLearning(course),
        variant: "default" as const,
        disabled: false,
      };
    }

    if (isCourseFree(course)) {
      return {
        text: "Belajar Sekarang",
        action: () => handleStartLearning(course),
        variant: "default" as const,
        disabled: false,
      };
    }

    if (isCourseInCart(course.id)) {
      return {
        text: "Dalam Keranjang",
        action: () => router.push("/student/cart"),
        variant: "outline" as const,
        disabled: false,
      };
    }

    return {
      text: "Add to Cart",
      action: () => handleAddToCart(course, false),
      variant: "default" as const,
      disabled: false,
    };
  };

  const bundleInfo = calculateBundlePrice();

  if (loading) {
    return (
      <div className="w-full pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#156d95]"></div>
      </div>
    );
  }

  return (
    <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
      {/* Success Popup - Untuk Logged-in User */}
      {showSuccessPopup && lastAddedItem && (
        <div className="fixed top-6 right-6 z-60 animate-slide-in">
          <div className="bg-[#156d95] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <CheckIcon className="text-[#156d95] w-4 h-4" />
            </div>
            <span className="font-medium">
              {lastAddedItem.name} berhasil ditambahkan ke keranjang
            </span>
          </div>
        </div>
      )}

      {/* Login Prompt - Untuk Guest User */}
      {showLoginPrompt && lastAddedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
              <CheckIcon className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#156d95] mb-3">
              Berhasil Ditambahkan!
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              <strong>{lastAddedItem.name}</strong> sudah masuk ke keranjang.
              <br />
              Silakan <strong>login</strong> untuk melanjutkan ke pembayaran.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-[#156d95] text-white rounded-xl font-medium hover:bg-[#0f5a7a] transition"
              >
                Login Sekarang
              </button>
              <button
                onClick={handleCloseLoginPrompt}
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Nanti saja
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Bundle Card - TANPA SCROLL, TAMPIL SEMUA */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <Card className="h-full border-0 shadow-xl overflow-hidden bg-gradient-to-br from-[#156d95] to-[#0d476e]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="bg-[#ff6b00] text-white rounded-full px-3 py-1 text-sm font-medium">
                    HOT DEAL
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    40% OFF
                  </Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-2">
                  ULTIMATE TRADING BUNDLE
                </h2>
                <p className="text-white/90 text-base mb-3">
                  <span className="font-bold">
                    Includes {bundleInfo.courseCount} Courses:
                  </span>
                </p>
                {/* ✅ HAPUS max-h-32 overflow-y-auto, TAMPIL SEMUA */}
                <ul className="text-white/80 text-sm space-y-1 mb-4 pr-2">
                  {bundleInfo.courseNames.map((title, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#ff6b00] mr-2">•</span>
                      <span>{title}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  {/* <span className="text-white/80 ml-2 text-sm">
                    4.9 (2.4k ratings)
                  </span> */}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white/70 line-through text-lg">
                    {formatPrice(bundleInfo.originalPrice)}
                  </div>
                  <div className="text-white text-2xl font-bold">
                    {formatPrice(bundleInfo.discountedPrice)}
                  </div>
                </div>
                {isBundleInCart() ? (
                  <Button
                    className="w-full bg-white text-[#156d95] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                    onClick={() => router.push("/student/cart")}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> VIEW IN CART
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-white text-[#156d95] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                    onClick={() => handleAddToCart(null, true)}
                  >
                    ADD TO CART
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Courses List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {currentCourses.map((course) => {
                const buttonConfig = getButtonConfig(course);
                return (
                  <Card
                    key={course.id}
                    className="border border-gray-200 hover:shadow-md transition-all overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {/* ✅ TAMPILKAN TITLE ASLI (SUDAH ADA NOMOR DI API) */}
                            <h3 className="text-xl font-bold text-gray-900">
                              {course.title}
                            </h3>
                            {isEnrolled(course.id) && (
                              <Badge className="bg-green-100 text-green-700">
                                Terdaftar
                              </Badge>
                            )}
                            {isCourseFree(course) && (
                              <Badge className="bg-blue-100 text-blue-700">
                                Gratis
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2 flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              4.9 (2.4k)
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="text-lg font-bold text-[#156d95]">
                            {formatPrice(course.price)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#156d95] text-[#156d95] hover:bg-[#156d95]/5"
                              onClick={() => handlePreviewCourse(course)}
                            >
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              variant={buttonConfig.variant}
                              className={
                                buttonConfig.variant === "default"
                                  ? "bg-[#156d95] hover:bg-[#0d476e] text-white"
                                  : ""
                              }
                              onClick={buttonConfig.action}
                              disabled={buttonConfig.disabled}
                            >
                              {buttonConfig.text}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 gap-2">
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
          </div>
        </div>
      </div>

      {/* Preview Modal - FIX DESKRIPSI HTML */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 z-10"
            onClick={handleClosePreview}
          >
            <X className="h-5 w-5" />
          </button>
          {selectedCourse && (
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCourse.title}
              </h3>
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400" />
                  ))}
                </div>
                {/* <span className="ml-2 text-gray-500">4.9 (2.4k ratings)</span> */}
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 text-gray-900">
                  Lessons:
                </h4>
                <div className="space-y-3">
                  {selectedCourse.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${selectedLesson?.id === lesson.id ? "bg-[#156d95] text-white" : "bg-gray-50 hover:bg-gray-100"}`}
                      onClick={() => handleSelectLesson(lesson)}
                    >
                      <div
                        className={`p-2 rounded-lg mr-3 ${selectedLesson?.id === lesson.id ? "bg-white/20" : "bg-[#156d95] text-white"}`}
                      >
                        <Play className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{lesson.title}</h5>
                        <p className="text-sm opacity-90">
                          {lesson.duration} min • {lesson.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedLesson && (
                <div className="border-t pt-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {selectedLesson.title}
                  </h4>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Duration</div>
                    <div className="font-medium">
                      {selectedLesson.duration} minutes • {selectedLesson.type}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">
                      Description
                    </div>
                    {/* ✅ FIX: Gunakan helper untuk strip HTML dan ambil preview */}
                    <div className="text-gray-600">
                      {getPlainTextPreview(selectedLesson.content, 30)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
