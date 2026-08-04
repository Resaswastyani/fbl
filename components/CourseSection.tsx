"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  X,
  CheckIcon,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

type Course = {
  id: string;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  price?: string;
  lessons: Lesson[];
  published?: boolean;
};

type Lesson = {
  id: string;
  title: string;
  title_en?: string;
  type: "video" | "pdf" | "text" | "html";
  content?: string;
  content_en?: string;
  contentUrl?: string;
  duration?: string;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardHoverVariants = {
  rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.02,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

const bundleCardVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const floatAnimation = {
  y: [-5, 5, -5],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const shimmerAnimation = {
  background: [
    "linear-gradient(90deg, #156d95 0%, #0d476e 50%, #156d95 100%)",
    "linear-gradient(90deg, #0d476e 0%, #156d95 50%, #0d476e 100%)",
    "linear-gradient(90deg, #156d95 0%, #0d476e 50%, #156d95 100%)",
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear",
  },
};

const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 50,
    transition: {
      duration: 0.2,
    },
  },
};

const lessonItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
};

export default function CourseSection() {
  const t = useTranslations("Course");
  const locale = useLocale();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [usdRate, setUsdRate] = useState<number>(0.000063); // Default fallback rate
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/IDR");
        const data = await res.json();
        if (data?.rates?.USD) {
          setUsdRate(data.rates.USD);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
      }
    };
    fetchRate();
  }, []);

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

  const extractNumberFromTitle = (title: string): number => {
    const match = title.match(/^(\\d+)\\./);
    return match ? parseInt(match[1], 10) : 999;
  };

  const calculateBundlePrice = () => {
    const total = bundleCourses.reduce((sum, course) => {
      if (course.price === "Free") return sum;
      const price = course.price?.replace(/[^0-9]/g, "") || "0";
      return sum + parseInt(price);
    }, 0);

    const discounted = Math.round(total * 0.265847);

    return {
      originalPrice: total,
      discountedPrice: discounted,
      courseCount: bundleCourses.length,
      courseTitles: bundleCourses.map((c) => locale === "en" ? c.title_en || c.title : c.title).join(", "),
      courseIds: bundleCourses.map((c) => c.id),
      courseNames: bundleCourses.map((c) => locale === "en" ? c.title_en || c.title : c.title),
    };
  };

  const formatPrice = (price: string | number) => {
    const priceStr = typeof price === "number" ? price.toString() : price;
    if (priceStr === "Free" || priceStr === "0" || !priceStr) return "Free";
    
    const numeric = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
    if (isNaN(numeric)) return priceStr;

    if (locale === "en") {
      const usdValue = numeric * usdRate;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(usdValue);
    }

    return `Rp ${numeric.toLocaleString("id-ID")}`;
  };

  const isCourseFree = (course: Course) => {
    return !course.price || course.price === "Free" || course.price === "0";
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.includes(courseId);
  };

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
        name: locale === "en" ? course.title_en || course.title : course.title,
        price: isCourseFree(course)
          ? 0
          : parseFloat(course.price?.replace(/[^0-9]/g, "") || "0"),
        quantity: 1,
        isBundle: false,
        courseIds: [course.id],
        courseNames: [locale === "en" ? course.title_en || course.title : course.title],
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

  const handleStartLearning = async (course: Course) => {
    if (!isLoggedIn) {
      router.push(`/course/${course.id}`);
      return;
    }

    if (isEnrolled(course.id)) {
      router.push(`/course/${course.id}`);
    } else if (isCourseFree(course)) {
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

  const getPlainTextPreview = (
    htmlContent: string | undefined,
    wordCount: number = 20,
  ): string => {
    if (!htmlContent) return "Deskripsi tidak tersedia.";

    const plainText = htmlContent
      .replace(/<[^>]*>/g, " ")
      .replace(/\\s+/g, " ")
      .trim();

    const words = plainText.split(" ");
    if (words.length <= wordCount) return plainText;

    return words.slice(0, wordCount).join(" ") + "...";
  };

  const mockCourses: Course[] = [
    {
      id: "c-forex-basics",
      title: "Forex Foundations",
      description:
        "Dasar-dasar forex trading\\nAnalisis teknikal dan fundamental",
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

  const getButtonConfig = (course: Course) => {
    if (isEnrolled(course.id)) {
      return {
        text: t("continueLearning"),
        action: () => handleStartLearning(course),
        variant: "default" as const,
        disabled: false,
      };
    }

    if (isCourseFree(course)) {
      return {
        text: t("startLearning"),
        action: () => handleStartLearning(course),
        variant: "default" as const,
        disabled: false,
      };
    }

    if (isCourseInCart(course.id)) {
      return {
        text: t("inCart"),
        action: () => router.push("/student/cart"),
        variant: "outline" as const,
        disabled: false,
      };
    }

    return {
      text: t("addToCart"),
      action: () => handleAddToCart(course, false),
      variant: "default" as const,
      disabled: false,
    };
  };

  const bundleInfo = calculateBundlePrice();

  if (loading) {
    return (
      <div className="w-full pt-24 pb-16 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="h-12 w-12 border-4 border-[#156d95] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 bg-white dark:bg-[#050508] transition-colors duration-500">
      <AnimatePresence>
        {showSuccessPopup && lastAddedItem && (
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-6 right-6 z-60"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#156d95] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
              >
                <CheckIcon className="text-[#156d95] w-4 h-4" />
              </motion.div>
              <span className="font-medium">
                {lastAddedItem.name} {t("successAdd")}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoginPrompt && lastAddedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-8 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
              >
                <CheckIcon className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-[#156d95] mb-3"
              >
                {t("loginPrompt")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              >
                <strong>{lastAddedItem.name}</strong> {t("loginText")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="w-full py-3 bg-gradient-to-r from-[#156d95] to-[#0d476e] text-white rounded-xl font-medium hover:shadow-lg transition"
                >
                  {t("loginNow")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCloseLoginPrompt}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
                >
                  {t("later")}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="lg:col-span-1 lg:sticky lg:top-24"
          >
            <motion.div
              variants={bundleCardVariants}
              initial="rest"
              whileHover="hover"
            >
              <Card className="h-full border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-[#156d95] to-[#0d476e] relative">
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={shimmerAnimation}
                />
                <motion.div
                  animate={floatAnimation}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <motion.div
                      animate={pulseAnimation}
                      className="bg-[#ff6b00] text-white rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1"
                    >
                      <Zap className="w-4 h-4" />
                      {t("hotDeal")}
                    </motion.div>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white backdrop-blur-sm"
                    >
                      {t("discount")}
                    </Badge>
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold text-white mt-4 mb-2"
                  >
                    {t("bundleTitle")}
                  </motion.h2>
                  <p className="text-white/90 text-base mb-3">
                    <span className="font-bold">
                      {t("includes", { count: bundleInfo.courseCount })}
                    </span>
                  </p>
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-white/80 text-sm space-y-1 mb-4 pr-2"
                  >
                    {bundleInfo.courseNames.map((title, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-start"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-[#ff6b00] mr-2"
                        >
                          •
                        </motion.span>
                        <span>{title}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-white/70 line-through text-lg"
                    >
                      {formatPrice(bundleInfo.originalPrice)}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-white text-2xl font-bold"
                    >
                      {formatPrice(bundleInfo.discountedPrice)}
                    </motion.div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isBundleInCart() ? (
                      <Button
                        className="w-full bg-white text-[#156d95] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all"
                        onClick={() => router.push("/student/cart")}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />{" "}
                        {t("viewCart")}
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-white text-[#156d95] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all"
                        onClick={() => handleAddToCart(null, true)}
                      >
                        {t("addToCart")}
                      </Button>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {currentCourses.map((course, index) => {
                const buttonConfig = getButtonConfig(course);
                return (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    initial="rest"
                    whileHover="hover"
                    animate="visible"
                  >
                    <motion.div variants={cardHoverVariants}>
                      <Card className="border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0a0a12]">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <motion.h3
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-xl font-bold text-gray-900 dark:text-white"
                                >
                                  {locale === "en" ? course.title_en || course.title : course.title}
                                </motion.h3>
                                <AnimatePresence>
                                  {isEnrolled(course.id) && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0 }}
                                    >
                                      <Badge className="bg-green-100 text-green-700">
                                        {t("enrolled")}
                                      </Badge>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                <AnimatePresence>
                                  {isCourseFree(course) && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0 }}
                                    >
                                      <Badge className="bg-blue-100 text-blue-700">
                                        {t("free")}
                                      </Badge>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
                              >
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  {course.lessons.length} {t("lessons")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {course.lessons.reduce(
                                    (acc, lesson) =>
                                      acc + parseInt(lesson.duration || "0"),
                                    0,
                                  )}{" "}
                                  {t("minutes")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  {t("allLevels")}
                                </span>
                              </motion.div>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2"
                              >
                                {locale === "en" ? course.description_en || course.description : course.description}
                              </motion.p>
                            </div>
                            <div className="flex flex-col sm:items-end gap-2">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg font-bold text-[#156d95]"
                              >
                                {formatPrice(course.price)}
                              </motion.div>
                              <div className="flex items-center gap-2">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#156d95] text-[#156d95] hover:bg-[#156d95]/5"
                                    onClick={() => handlePreviewCourse(course)}
                                  >
                                    {t("preview")}
                                  </Button>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
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
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center mt-8 gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#156d95] hover:text-white hover:border-[#156d95] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                          currentPage === page
                            ? "bg-[#156d95] text-white shadow-lg"
                            : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#156d95] hover:text-white hover:border-[#156d95]"
                        }`}
                      >
                        {page}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#156d95] hover:text-white hover:border-[#156d95] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPreviewOpen && (
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 z-10"
                  onClick={handleClosePreview}
                >
                  <X className="h-5 w-5" />
                </motion.button>
                {selectedCourse && (
                  <div className="p-8">
                    <motion.h3
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                      {locale === "en" ? selectedCourse.title_en || selectedCourse.title : selectedCourse.title}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-8"
                    >
                      <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#156d95]" />
                        {t("lessons")}:
                      </h4>
                      <div className="space-y-3">
                        {selectedCourse.lessons.map((lesson, index) => (
                          <motion.div
                            key={lesson.id}
                            custom={index}
                            variants={lessonItemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02, x: 5 }}
                            onClick={() => handleSelectLesson(lesson)}
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                              selectedLesson?.id === lesson.id
                                ? "bg-[#156d95] text-white shadow-lg"
                                : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                            }`}
                          >
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className={`p-2 rounded-lg mr-3 ${
                                selectedLesson?.id === lesson.id
                                  ? "bg-white/20"
                                  : "bg-[#156d95] text-white"
                              }`}
                            >
                              <Play className="h-4 w-4" />
                            </motion.div>
                            <div className="flex-1">
                              <h5 className="font-medium">{locale === "en" ? lesson.title_en || lesson.title : lesson.title}</h5>
                              <p className="text-sm opacity-90 flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                {lesson.duration} {t("minutes")} • {lesson.type}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {selectedLesson && (
                        <motion.div
                          key={selectedLesson.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="border-t pt-6"
                        >
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {locale === "en" ? selectedLesson.title_en || selectedLesson.title : selectedLesson.title}
                          </h4>
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              Duration
                            </div>
                            <div className="font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#156d95]" />
                              {selectedLesson.duration} {t("minutes")} •{" "}
                              {selectedLesson.type}
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              Description
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                              {getPlainTextPreview(locale === "en" ? selectedLesson.content_en || selectedLesson.content : selectedLesson.content, 30)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
