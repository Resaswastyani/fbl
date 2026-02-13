"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import {
  Trash2,
  Plus,
  Play,
  FileText,
  Award,
  User,
  MessageCircle,
  Edit,
  Loader,
  File,
  Image,
  Newspaper,
  Eye,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// UI primitives
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/rich-text-editor";
import type { RichTextEditorRef } from "@/components/rich-text-editor";
import Sidebar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";

/* ---------------- Types ---------------- */
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
  quiz?: Quiz;
};

type Quiz = {
  id: string;
  questions: {
    id: string;
    q: string;
    choices: string[];
    answerIndex: number;
  }[];
};

type UserProgress = {
  userId: string;
  courseId: string;
  completedLessons: string[];
  score?: number;
};

type UserRole = "PELANGGAN" | "ADMIN" | "MENTOR";

// ✅ TYPE BARU: Article
type Article = {
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
};

type TradingVideo = {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  videoType: "YOUTUBE" | "UPLOAD";
  thumbnail?: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string | null;
    email: string;
  };
};

/* -------------- Mock Data -------------- */
const MOCK_COURSES: Course[] = [
  {
    id: "c-forex-basics",
    title: "Forex Foundations",
    description:
      "Dasar-dasar forex: pasangan mata uang, pip, leverage, margin, dan psikologi trading.",
    price: "Free",
    published: true,
    lessons: [
      {
        id: "l1",
        title: "Pengenalan Forex",
        type: "html",
        content: `
          <h2>Pengenalan Forex</h2>
          <p>Forex adalah pasar keuangan terbesar di dunia dengan volume perdagangan harian mencapai triliunan dolar.</p>
          <h3>Apa itu Forex?</h3>
          <p>Forex adalah singkatan dari <strong>Foreign Exchange</strong>, yaitu pertukaran mata uang asing.</p>
          <h3>Keuntungan Trading Forex</h3>
          <ul>
            <li>Market buka 24 jam</li>
            <li>Liquidity tinggi</li>
            <li>Leverage yang fleksibel</li>
          </ul>
        `,
        duration: "8m",
      },
      {
        id: "l2",
        title: "Pair & Pip",
        type: "video",
        contentUrl: "/videos/pair-pip.mp4",
        duration: "12m",
      },
      {
        id: "l3",
        title: "Manajemen Risiko",
        type: "pdf",
        contentUrl: "/pdfs/risk-management.pdf",
        duration: "10m",
      },
    ],
  },
  {
    id: "c-strategy",
    title: "Strategi Breakout & Pullback",
    description: "Strategi trading teknikal praktis untuk entry dan exit.",
    price: "$49",
    published: true,
    lessons: [
      {
        id: "l4",
        title: "Breakout Setup",
        type: "video",
        contentUrl: "/videos/breakout.mp4",
        duration: "18m",
      },
      {
        id: "l5",
        title: "Pullback Rules",
        type: "html",
        content: `
          <h2>Pullback Rules</h2>
          <p>Pullback adalah retracement sementara dalam trend yang sedang berlangsung.</p>
          <h3>Cara Mengidentifikasi Pullback</h3>
          <ol>
            <li>Tunggu harga kembali ke support/resistance</li>
            <li>Perhatikan volume trading</li>
            <li>Gunakan indikator konfirmasi</li>
          </ol>
        `,
        duration: "9m",
      },
    ],
  },
];

/* -------------- Main Component -------------- */
export default function ForexDashboardLMS() {
  const { register, handleSubmit, reset, setValue } = useForm<any>();
  const {
    register: registerLesson,
    handleSubmit: handleSubmitLesson,
    reset: resetLesson,
    setValue: setLessonValue,
  } = useForm<any>();

  // ✅ FORM BARU untuk Article
  const {
    register: registerArticle,
    handleSubmit: handleSubmitArticle,
    reset: resetArticle,
    setValue: setArticleValue,
  } = useForm<any>();

  // ✅ FORM BARU untuk TradingVideo
  const {
    register: registerVideo,
    handleSubmit: handleSubmitVideo,
    reset: resetVideo,
    setValue: setVideoValue,
    watch: watchVideo,
  } = useForm<any>();

  const { theme, setTheme } = useTheme();
  const safeTheme: "light" | "dark" = theme === "dark" ? "dark" : "light";
  const toggleTheme = () => setTheme(safeTheme === "light" ? "dark" : "light");

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // RichTextEditor refs
  const contentEditorRef = useRef<RichTextEditorRef>(null);
  const articleContentRef = useRef<RichTextEditorRef>(null);

  // Role validation on mount
  useEffect(() => {
    const validateUser = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        if (!data?.user) {
          router.push("/login");
          return;
        }

        setUser(data.user);
        setUserRole(data.user.role);

        if (data.user.role === "PELANGGAN") {
          router.push("/student/dashboard");
          return;
        }

        if (data.user.role !== "ADMIN" && data.user.role !== "MENTOR") {
          router.push("/student/dashboard");
          return;
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/login");
      } finally {
        setLoadingUser(false);
      }
    };

    validateUser();
  }, [router]);

  /* UI state */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [courses, setCourses] = useState<Course[]>([]);

  // ✅ STATE BARU untuk Articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleDeleteTarget, setArticleDeleteTarget] =
    useState<Article | null>(null);
  const [articleConfirmOpen, setArticleConfirmOpen] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  // ✅ STATE BARU untuk Trading Videos
  const [videos, setVideos] = useState<TradingVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TradingVideo | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<TradingVideo | null>(null);
  const [videoDeleteTarget, setVideoDeleteTarget] =
    useState<TradingVideo | null>(null);
  const [videoConfirmOpen, setVideoConfirmOpen] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [activeMenu, setActiveMenu] = useState<
    | "dashboard"
    | "courses"
    | "modules"
    | "videos"
    | "pdfs"
    | "articles"
    | "quizzes"
    | "progress"
    | "forum"
    | "certificates"
    | "profile"
    | "article-management"
    | "video-trading" // ✅ MENU BARU
    | "lesson-content"
  >("dashboard");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [progressList, setProgressList] = useState<UserProgress[]>([]);

  // Lesson management states
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonDeleteTarget, setLessonDeleteTarget] = useState<Lesson | null>(
    null,
  );
  const [lessonConfirmOpen, setLessonConfirmOpen] = useState(false);

  // Fetch courses from API on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses || data);
        } else {
          setCourses(MOCK_COURSES);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses(MOCK_COURSES);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ FETCH ARTICLES
  useEffect(() => {
    const fetchArticles = async () => {
      setLoadingArticles(true);
      try {
        const response = await fetch("/api/articles");
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles || []);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoadingArticles(false);
      }
    };

    if (activeMenu === "article-management") {
      fetchArticles();
    }
  }, [activeMenu]);

  useEffect(() => {
    setMounted(true);
    setProgressList([
      {
        userId: "u1",
        courseId: "c-forex-basics",
        completedLessons: ["l1"],
        score: 80,
      },
      { userId: "u1", courseId: "c-strategy", completedLessons: [], score: 0 },
    ]);
  }, []);

  /* ================= ARTICLE CRUD HANDLERS ================= */

  const openAddArticle = () => {
  setEditingArticle(null);
  resetArticle({ title: "", thumbnail: "", published: false });
  
  // Reset editor
  setTimeout(() => {
    if (articleContentRef.current) {
      articleContentRef.current.setValue("");
    }
  }, 100);
  
  setArticleModalOpen(true);
};

const openEditArticle = (article: Article) => {
  setEditingArticle(article);
  resetArticle({
    title: article.title,
    thumbnail: article.thumbnail || "",
    published: article.published,
  });
  
  setArticleModalOpen(true);
  
  // Set content ke editor
  setTimeout(() => {
    if (articleContentRef.current && article.content) {
      articleContentRef.current.setValue(article.content);
    }
  }, 150);
};
  const handleThumbnailUpload = async (file: File) => {
    setUploadingThumbnail(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setArticleValue("thumbnail", data.url);
    } catch (error) {
      console.error("Thumbnail upload error:", error);
      alert("Gagal mengupload thumbnail");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const confirmDeleteArticle = (article: Article) => {
    setArticleDeleteTarget(article);
    setArticleConfirmOpen(true);
  };

  const doDeleteArticle = async () => {
    if (!articleDeleteTarget) return;

    try {
      const response = await fetch(
        `/api/articles?id=${articleDeleteTarget.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete article");
      }

      setArticles((prev) => prev.filter((a) => a.id !== articleDeleteTarget.id));
      setArticleDeleteTarget(null);
      setArticleConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting article:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      alert(`Gagal menghapus artikel: ${errorMessage}`);
    }
  };

  const handleSaveArticle = async (data: any) => {
  try {
    // Get content dari editor ref
    const contentValue = articleContentRef.current?.getValue() || "";

    if (editingArticle) {
      const response = await fetch("/api/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingArticle.id,
          title: data.title,
          content: contentValue,
          thumbnail: data.thumbnail,
          published: data.published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update article");
      }

      const result = await response.json();
      setArticles((prev) =>
        prev.map((a) => (a.id === editingArticle.id ? result.article : a)),
      );
    } else {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          content: contentValue,
          thumbnail: data.thumbnail,
          published: data.published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create article");
      }

      const result = await response.json();
      setArticles((prev) => [result.article, ...prev]);
    }

    setArticleModalOpen(false);
    resetArticle();
    // Reset editor
    if (articleContentRef.current) {
      articleContentRef.current.setValue("");
    }
  } catch (error) {
    console.error("Error saving article:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Terjadi kesalahan";
    alert(`Gagal menyimpan artikel: ${errorMessage}`);
  }
};
  // fetch video trading
  useEffect(() => {
    const fetchVideos = async () => {
      setLoadingVideos(true);
      try {
        const response = await fetch("/api/trading-videos");
        if (response.ok) {
          const data = await response.json();
          setVideos(data.videos || []);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoadingVideos(false);
      }
    };

    if (activeMenu === "video-trading") {
      fetchVideos();
    }
  }, [activeMenu]);

  // ================= TRADING VIDEO CRUD HANDLERS =================

  const openAddVideo = () => {
    setEditingVideo(null);
    resetVideo({
      title: "",
      description: "",
      videoUrl: "",
      videoType: "YOUTUBE",
      thumbnail: "",
      published: false,
    });
    setVideoModalOpen(true);
  };

  const openEditVideo = (video: TradingVideo) => {
    setEditingVideo(video);
    resetVideo({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      videoType: video.videoType,
      thumbnail: video.thumbnail || "",
      published: video.published,
    });
    setVideoModalOpen(true);
  };

  const handleVideoUpload = async (file: File) => {
    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setVideoValue("videoUrl", data.url);
      setVideoValue("videoType", "UPLOAD");
    } catch (error) {
      console.error("Video upload error:", error);
      alert("Gagal mengupload video");
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSaveVideo = async (data: any) => {
    try {
      if (editingVideo) {
        // Update video
        const response = await fetch("/api/trading-videos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingVideo.id,
            title: data.title,
            description: data.description,
            videoUrl: data.videoUrl,
            videoType: data.videoType,
            thumbnail: data.thumbnail,
            published: data.published,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update video");
        }

        const result = await response.json();
        setVideos((prev) =>
          prev.map((v) => (v.id === editingVideo.id ? result.video : v)),
        );
      } else {
        // Create new video
        const response = await fetch("/api/trading-videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            videoUrl: data.videoUrl,
            videoType: data.videoType,
            thumbnail: data.thumbnail,
            published: data.published,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create video");
        }

        const result = await response.json();
        setVideos((prev) => [result.video, ...prev]);
      }

      setVideoModalOpen(false);
      resetVideo();
    } catch (error) {
      console.error("Error saving video:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      alert(`Gagal menyimpan video: ${errorMessage}`);
    }
  };

  const confirmDeleteVideo = (video: TradingVideo) => {
    setVideoDeleteTarget(video);
    setVideoConfirmOpen(true);
  };

  const doDeleteVideo = async () => {
    if (!videoDeleteTarget) return;

    try {
      const response = await fetch(
        `/api/trading-videos?id=${videoDeleteTarget.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete video");
      }

      setVideos((prev) => prev.filter((v) => v.id !== videoDeleteTarget.id));
      setVideoDeleteTarget(null);
      setVideoConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting video:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      alert(`Gagal menghapus video: ${errorMessage}`);
    }
  };

  // Helper: Extract YouTube ID
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
      /youtube\.com\/shorts\/([^&\s?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  // Helper: Get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = extractYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  /* ================= EXISTING CRUD HANDLERS ================= */

  const openAddCourse = () => {
    setEditMode(false);
    setSelectedCourse(null);
    reset({ title: "", description: "", price: "" });
    setModalOpen(true);
  };

  const openEditCourse = (c: Course) => {
    setEditMode(true);
    setSelectedCourse(c);
    reset({ title: c.title, description: c.description, price: c.price });
    setModalOpen(true);
  };

  const handleSaveCourse = async (data: any) => {
    try {
      if (editMode && selectedCourse) {
        const response = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedCourse.id,
            title: data.title,
            description: data.description,
            price: data.price,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update course");
        }

        const result = await response.json();
        const updatedCourse = result.course;

        setCourses((prev) =>
          prev.map((p) => (p.id === selectedCourse.id ? updatedCourse : p)),
        );
      } else {
        const response = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            price: data.price || "Free",
            published: false,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create course");
        }

        const result = await response.json();
        const newCourse = result.course;

        if (!newCourse.lessons) {
          newCourse.lessons = [];
        }

        setCourses((prev) => [newCourse, ...prev]);
      }

      setModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error saving course:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      alert(
        editMode
          ? `Gagal memperbarui course: ${errorMessage}`
          : `Gagal membuat course: ${errorMessage}`,
      );
    }
  };

  const confirmDeleteCourse = (c: Course) => {
    setDeleteTarget(c);
    setConfirmOpen(true);
  };

  const doDeleteCourse = async () => {
    if (!deleteTarget) return;

    try {
      const response = await fetch(`/api/courses?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete course");
      }

      setCourses((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      setConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting course:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      alert(`Gagal menghapus course: ${errorMessage}`);
    }
  };

  /* ---------- Lesson CRUD Handlers ---------- */
  const openAddLesson = (courseId: string) => {
    setEditingLesson(null);
    setSelectedCourse(courses.find((c) => c.id === courseId) || null);
    resetLesson({ title: "", type: "html", contentUrl: "", duration: "" });

    // Reset editor content
    setTimeout(() => {
      if (contentEditorRef.current) {
        contentEditorRef.current.setValue("");
      }
    }, 100);

    setLessonModalOpen(true);
  };
  const openEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setSelectedCourse(
      courses.find((c) => c.lessons?.some((l) => l.id === lesson.id)) || null,
    );

    // Reset form dengan value yang benar
    resetLesson({
      title: lesson.title,
      type: lesson.type,
      contentUrl: lesson.contentUrl || "",
      duration: lesson.duration || "",
      content: lesson.content || "",
    });

    setLessonModalOpen(true);

    // Set timeout untuk set content ke editor setelah modal terbuka
    setTimeout(() => {
      if (contentEditorRef.current && lesson.content) {
        contentEditorRef.current.setValue(lesson.content);
      }
    }, 150);
  };
  // const handleSaveLesson = async (data: any) => {
  //   if (!selectedCourse) return;

  //   try {
  //     const contentValue = contentEditorRef.current?.value || data.content;

  //     if (editingLesson) {
  //       const response = await fetch("/api/lessons", {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           id: editingLesson.id,
  //           title: data.title,
  //           type: data.type,
  //           content:
  //             data.type === "html" || data.type === "text"
  //               ? contentValue
  //               : null,
  //           contentUrl:
  //             data.type === "video" || data.type === "pdf"
  //               ? data.contentUrl
  //               : null,
  //           duration: data.duration,
  //         }),
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error || "Failed to update lesson");
  //       }

  //       const result = await response.json();
  //       const updatedLesson = result.lesson;

  //       setCourses((prev) =>
  //         prev.map((c) =>
  //           c.id === selectedCourse.id
  //             ? {
  //                 ...c,
  //                 lessons: c.lessons
  //                   ? c.lessons.map((l) =>
  //                       l.id === updatedLesson.id ? updatedLesson : l,
  //                     )
  //                   : [updatedLesson],
  //               }
  //             : c,
  //         ),
  //       );
  //     } else {
  //       const response = await fetch("/api/lessons", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           title: data.title,
  //           type: data.type,
  //           content:
  //             data.type === "html" || data.type === "text"
  //               ? contentValue
  //               : null,
  //           contentUrl:
  //             data.type === "video" || data.type === "pdf"
  //               ? data.contentUrl
  //               : null,
  //           duration: data.duration,
  //           courseId: selectedCourse.id,
  //         }),
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error || "Failed to create lesson");
  //       }

  //       const result = await response.json();
  //       const newLesson = result.lesson;

  //       setCourses((prev) =>
  //         prev.map((c) =>
  //           c.id === selectedCourse.id
  //             ? {
  //                 ...c,
  //                 lessons: c.lessons ? [...c.lessons, newLesson] : [newLesson],
  //               }
  //             : c,
  //         ),
  //       );
  //     }

  //     setLessonModalOpen(false);
  //     resetLesson();
  //   } catch (error) {
  //     console.error("Error saving lesson:", error);
  //     const errorMessage =
  //       error instanceof Error ? error.message : "Terjadi kesalahan";
  //     alert(
  //       `Gagal ${editingLesson ? "memperbarui" : "membuat"} lesson: ${errorMessage}`,
  //     );
  //   }
  // };
  const handleSaveLesson = async (data: any) => {
    if (!selectedCourse) return;

    try {
      // Get content dari RichTextEditor ref
      let contentValue = "";
      if (data.type === "html" || data.type === "text") {
        contentValue =
          contentEditorRef.current?.getValue() || data.content || "";
      }

      let contentUrlValue = data.contentUrl || null;

      if (editingLesson) {
        const response = await fetch("/api/lessons", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingLesson.id,
            title: data.title,
            type: data.type,
            content: contentValue || null,
            contentUrl: contentUrlValue,
            duration: data.duration,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update lesson");
        }

        const result = await response.json();
        const updatedLesson = result.lesson;

        setCourses((prev) =>
          prev.map((c) =>
            c.id === selectedCourse.id
              ? {
                  ...c,
                  lessons: c.lessons
                    ? c.lessons.map((l) =>
                        l.id === updatedLesson.id ? updatedLesson : l,
                      )
                    : [updatedLesson],
                }
              : c,
          ),
        );
      } else {
        const response = await fetch("/api/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            type: data.type,
            content: contentValue || null,
            contentUrl: contentUrlValue,
            duration: data.duration,
            courseId: selectedCourse.id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create lesson");
        }

        const result = await response.json();
        const newLesson = result.lesson;

        setCourses((prev) =>
          prev.map((c) =>
            c.id === selectedCourse.id
              ? {
                  ...c,
                  lessons: c.lessons ? [...c.lessons, newLesson] : [newLesson],
                }
              : c,
          ),
        );
      }

      setLessonModalOpen(false);
      resetLesson();
      // Reset editor content
      if (contentEditorRef.current) {
        contentEditorRef.current.setValue("");
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      alert(
        `Gagal ${editingLesson ? "memperbarui" : "membuat"} lesson: ${errorMessage}`,
      );
    }
  };

  const confirmDeleteLesson = (lesson: Lesson) => {
    setLessonDeleteTarget(lesson);
    setLessonConfirmOpen(true);
  };

  const doDeleteLesson = async () => {
    if (!lessonDeleteTarget || !selectedCourse) return;

    try {
      const response = await fetch(
        `/api/lessons?id=${lessonDeleteTarget.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete lesson");
      }

      setCourses((prev) =>
        prev.map((c) =>
          c.id === selectedCourse!.id
            ? {
                ...c,
                lessons: c.lessons?.filter((l) => l.id !== lessonDeleteTarget.id) || [],
              }
            : c,
        ),
      );
      setLessonDeleteTarget(null);
      setLessonConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      alert(`Gagal menghapus lesson: ${errorMessage}`);
    }
  };

  /* ---------- Course/Module helpers ---------- */
  const markLessonComplete = (
    userId: string,
    courseId: string,
    lessonId: string,
  ) => {
    setProgressList((prev) => {
      const p = prev.find(
        (x) => x.userId === userId && x.courseId === courseId,
      );
      if (!p) {
        return [
          ...prev,
          { userId, courseId, completedLessons: [lessonId], score: 0 },
        ];
      } else if (!p.completedLessons.includes(lessonId)) {
        return prev.map((x) =>
          x === p
            ? { ...p, completedLessons: [...p.completedLessons, lessonId] }
            : x,
        );
      }
      return prev;
    });
  };

  /* ================= RENDER PANELS ================= */

  const DashboardPanel = () => {
    const totalCourses = courses.length;
    const totalLessons = courses.reduce(
      (acc, c) => acc + (c.lessons?.length || 0),
      0,
    );
    const completedLessons = progressList.reduce(
      (acc, p) => acc + p.completedLessons.length,
      0,
    );
    const totalArticles = articles.length;

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent>
              <h3 className="text-sm text-muted-foreground">Kursus</h3>
              <div className="text-2xl font-semibold">{totalCourses}</div>
              <div className="text-xs mt-1 text-muted-foreground">
                Total kursus tersedia
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm text-muted-foreground">Lessons</h3>
              <div className="text-2xl font-semibold">{totalLessons}</div>
              <div className="text-xs mt-1 text-muted-foreground">
                Total lesson
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm text-muted-foreground">Artikel</h3>
              <div className="text-2xl font-semibold">{totalArticles}</div>
              <div className="text-xs mt-1 text-muted-foreground">
                Total artikel
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm text-muted-foreground">
                Progress (murid)
              </h3>
              <div className="text-2xl font-semibold">{completedLessons}</div>
              <div className="text-xs mt-1 text-muted-foreground">
                Lesson terselesaikan
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Kursus Terbaru</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <Card key={c.id}>
                <CardContent className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-lg font-semibold">{c.title}</div>
                    <p className="text-sm text-muted-foreground">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedCourse(c);
                          setActiveMenu("modules");
                        }}
                      >
                        Lihat Materi
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditCourse(c)}
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() => confirmDeleteCourse(c)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {c.price}
                    </div>
                    <div className="mt-6 text-xs">
                      {c.lessons?.length || 0} lessons
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CoursesPanel = () => {
    if (loadingCourses) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin h-8 w-8 text-primary mr-3" />
          <span>Loading courses...</span>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Courses</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={async () => {
                const response = await fetch("/api/courses");
                if (response.ok) {
                  const data = await response.json();
                  setCourses(data.courses || data);
                }
              }}
            >
              <Loader className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button onClick={openAddCourse}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Kursus
            </Button>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">Belum ada kursus. Tambahkan kursus baru!</p>
            <Button onClick={openAddCourse}>
              <Plus className="mr-2 h-4 w-4" /> Buat Kursus Pertama
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <Card key={c.id}>
                <CardContent className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-lg font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.description}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {c.lessons?.length || 0} lesson(s)
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium">{c.price}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedCourse(c);
                          setActiveMenu("modules");
                        }}
                      >
                        Open
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditCourse(c)}
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() => confirmDeleteCourse(c)}
                        className="p-2 text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };
  // ✅ PANEL BARU: Lesson Content Viewer (untuk HTML/Text lessons)
  const LessonContentPanel = () => {
    const lesson =
      selectedLesson ||
      selectedCourse?.lessons?.find(
        (l) => l.type === "html" || l.type === "text",
      );

    if (!lesson) {
      return (
        <div className="py-12 text-center text-muted-foreground">
          <p>Tidak ada konten lesson yang dipilih.</p>
          <Button onClick={() => setActiveMenu("modules")} className="mt-4">
            Kembali ke Materi
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Badge variant="outline">{lesson.type.toUpperCase()}</Badge>
              {lesson.duration && <span>• {lesson.duration}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                markLessonComplete("u1", selectedCourse!.id, lesson.id)
              }
            >
              Mark Complete
            </Button>
            <Button variant="outline" onClick={() => setActiveMenu("modules")}>
              Kembali ke Materi
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none p-6">
            {/* Render HTML content dengan gambar */}
            {lesson.content ? (
              <div
                className="lesson-content space-y-4"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            ) : (
              <p className="text-muted-foreground italic">
                Tidak ada konten untuk lesson ini.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // ✅ PANEL BARU: Article Management
  const ArticleManagementPanel = () => {
    if (loadingArticles) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin h-8 w-8 text-primary mr-3" />
          <span>Loading articles...</span>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Manajemen Artikel
          </h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={async () => {
                setLoadingArticles(true);
                const response = await fetch("/api/articles");
                if (response.ok) {
                  const data = await response.json();
                  setArticles(data.articles || []);
                }
                setLoadingArticles(false);
              }}
            >
              <Loader className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button onClick={openAddArticle}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Artikel
            </Button>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">Belum ada artikel. Buat artikel pertama!</p>
            <Button onClick={openAddArticle}>
              <Plus className="mr-2 h-4 w-4" /> Buat Artikel Pertama
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {articles.map((article) => (
              <Card
                key={article.id}
                className={!article.published ? "opacity-75" : ""}
              >
                <CardContent className="flex justify-between items-start gap-4 p-4">
                  <div className="flex gap-4 flex-1">
                    {article.thumbnail ? (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">
                          {article.title}
                        </h3>
                        {!article.published && (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.content
                          .replace(/<[^>]*>/g, "")
                          .substring(0, 150)}
                        ...
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {article.author.name || article.author.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.createdAt).toLocaleDateString(
                            "id-ID",
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.viewCount} views
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditArticle(article)}
                      >
                        <Edit className="mr-1 h-3 w-3" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedArticle(article);
                          setActiveMenu("articles");
                        }}
                      >
                        <Eye className="mr-1 h-3 w-3" /> Preview
                      </Button>
                      <button
                        onClick={() => confirmDeleteArticle(article)}
                        className="p-2 text-red-600 hover:text-red-800 transition"
                        title="Hapus Artikel"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ================= VIDEO TRADING PANEL =================
  const VideoTradingPanel = () => {
    if (loadingVideos) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin h-8 w-8 text-primary mr-3" />
          <span>Loading videos...</span>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Play className="h-5 w-5" />
            Video Trading
          </h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={async () => {
                setLoadingVideos(true);
                const response = await fetch("/api/trading-videos");
                if (response.ok) {
                  const data = await response.json();
                  setVideos(data.videos || []);
                }
                setLoadingVideos(false);
              }}
            >
              <Loader className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button onClick={openAddVideo}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Video
            </Button>
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">Belum ada video trading. Buat video pertama!</p>
            <Button onClick={openAddVideo}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Video Pertama
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <Card
                key={video.id}
                className={!video.published ? "opacity-75" : ""}
              >
                <CardContent className="p-0">
                  {/* Thumbnail / Video Preview */}
                  <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden group">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <Play className="h-12 w-12 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedVideo(video);
                          setActiveMenu("videos");
                        }}
                      >
                        <Play className="mr-1 h-4 w-4" /> Tonton
                      </Button>
                    </div>
                    {!video.published && (
                      <Badge
                        className="absolute top-2 left-2"
                        variant="secondary"
                      >
                        Draft
                      </Badge>
                    )}
                    <Badge
                      className="absolute top-2 right-2"
                      variant={
                        video.videoType === "YOUTUBE" ? "default" : "secondary"
                      }
                    >
                      {video.videoType === "YOUTUBE" ? "YouTube" : "Upload"}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {video.description || "Tidak ada deskripsi"}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {video.author.name || video.author.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.viewCount} views
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => openEditVideo(video)}
                      >
                        <Edit className="mr-1 h-3 w-3" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedVideo(video);
                          setActiveMenu("videos");
                        }}
                      >
                        <Eye className="mr-1 h-3 w-3" /> Preview
                      </Button>
                      <button
                        onClick={() => confirmDeleteVideo(video)}
                        className="p-2 text-red-600 hover:text-red-800 transition hover:bg-red-50 rounded-md"
                        title="Hapus Video"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ModulesPanel = () => {
    if (!selectedCourse) {
      return (
        <div className="py-12 text-center text-muted-foreground">
          <p className="mb-4">
            Pilih kursus terlebih dahulu (dari menu Courses atau Dashboard)
          </p>
          <Button onClick={() => setActiveMenu("courses")}>Pilih Kursus</Button>
        </div>
      );
    }

    const lessons = selectedCourse.lessons || [];

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              Materi: {selectedCourse.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedCourse.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => openAddLesson(selectedCourse.id)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Lesson
            </Button>
            <Button variant="outline" onClick={() => setActiveMenu("courses")}>
              Kembali ke Courses
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {lessons.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Belum ada lesson. Tambahkan lesson pertama!</p>
            </div>
          ) : (
            lessons.map((ls) => (
              <Card key={ls.id}>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{ls.title}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {ls.type === "html" ? "Article" : ls.type} • {ls.duration}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditLesson(ls)}
                    >
                      <Edit className="mr-1 h-3 w-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedLesson(ls);
                        // ✅ PERBAIKAN: Routing berdasarkan tipe lesson
                        if (ls.type === "video") {
                          setActiveMenu("videos");
                        } else if (ls.type === "pdf") {
                          setActiveMenu("pdfs");
                        } else if (ls.type === "html" || ls.type === "text") {
                          setActiveMenu("lesson-content"); // Panel baru untuk HTML/Text
                        }
                      }}
                    >
                      Open
                    </Button>
                    <button
                      onClick={() => confirmDeleteLesson(ls)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                      title="Hapus Lesson"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  };

  const VideoPanel = () => {
    const videoLesson =
      selectedLesson ||
      selectedCourse?.lessons?.find((l) => l.type === "video");

    if (!videoLesson) {
      return (
        <div className="py-12 text-center text-muted-foreground">
          <p>Tidak ada video untuk kursus ini.</p>
          <Button onClick={() => setActiveMenu("modules")} className="mt-4">
            Kembali ke Materi
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Video Player</h2>
          <div className="text-sm text-muted-foreground">
            {selectedCourse?.title ?? "No course selected"}
          </div>
        </div>

        <Card>
          <CardContent>
            <div className="mb-3 font-medium">{videoLesson.title}</div>
            <div className="w-full bg-black/80 aspect-video rounded-md overflow-hidden">
              <video controls className="w-full h-full object-cover">
                <source
                  src={videoLesson.contentUrl || "/placeholder.mp4"}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Button
                onClick={() =>
                  markLessonComplete("u1", selectedCourse!.id, videoLesson.id)
                }
              >
                Mark Complete
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveMenu("modules")}
              >
                Kembali ke Materi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const PdfPanel = () => {
    const pdfLesson =
      selectedLesson || selectedCourse?.lessons?.find((l) => l.type === "pdf");

    if (!pdfLesson) {
      return (
        <div className="py-12 text-center text-muted-foreground">
          <p>Tidak ada PDF untuk kursus ini.</p>
          <Button onClick={() => setActiveMenu("modules")} className="mt-4">
            Kembali ke Materi
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">PDF Viewer</h2>
          <Button variant="outline" onClick={() => setActiveMenu("modules")}>
            Kembali ke Materi
          </Button>
        </div>
        <Card>
          <CardContent>
            <div className="mb-3 font-medium">{pdfLesson.title}</div>
            <iframe
              src={pdfLesson.contentUrl || "/pdfs/sample.pdf"}
              className="w-full h-[600px] border rounded-md"
              title="PDF Viewer"
            />
            <div className="mt-3 flex items-center gap-3">
              <Button
                onClick={() =>
                  markLessonComplete("u1", selectedCourse!.id, pdfLesson.id)
                }
              >
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // ✅ PANEL BARU: Article View (untuk preview artikel)
  // GANTI ArticlePanel yang lama dengan ini:
  const ArticlePanel = () => {
    // FIX: Jika tidak ada selectedArticle, redirect ke article-management
    if (!selectedArticle) {
      // Auto-redirect ke article management jika tidak ada artikel yang dipilih
      useEffect(() => {
        setActiveMenu("article-management");
      }, []);

      return (
        <div className="py-12 text-center text-muted-foreground">
          <p>Memuat artikel...</p>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{selectedArticle.title}</h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {selectedArticle.author.name || selectedArticle.author.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(selectedArticle.createdAt).toLocaleDateString(
                  "id-ID",
                )}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {selectedArticle.viewCount} views
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedArticle(null); // FIX: Clear selected article
              setActiveMenu("article-management");
            }}
          >
            Kembali
          </Button>
        </div>

        <Card>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            {selectedArticle.thumbnail && (
              <img
                src={selectedArticle.thumbnail}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div
              className="lesson-content space-y-4"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          </CardContent>
        </Card>
      </div>
    );
  };
  const QuizPanel = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Quiz Manager</h2>
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Buat dan kelola quiz untuk setiap lesson. (Fungsionalitas akan
              dikembangkan)
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const ProgressPanel = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Progress Murid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {progressList.map((p) => {
            const course = courses.find((c) => c.id === p.courseId);
            const totalLessons = course?.lessons?.length || 0;
            const completedLessons = p.completedLessons.length;
            const completionRate =
              totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0;
            return (
              <Card key={p.courseId}>
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">
                        {course?.title ?? p.courseId}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {completedLessons}/{totalLessons} lessons selesai
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {completionRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Score: {p.score ?? 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const ForumPanel = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Forum Diskusi</h2>
        <Card>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="font-medium">
                  Thread: Mengenal Support & Resistance
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Diskusi terbuka — mentor akan menanggapi 24 jam.
                </p>
              </div>
              <div>
                <Badge>5 replies</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const CertificatesPanel = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sertifikat</h2>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">
                Sertifikat Penyelesaian - Forex Foundations
              </div>
              <div className="text-xs text-muted-foreground">
                Diberikan setelah menyelesaikan 80% materi dan lulus quiz
              </div>
            </div>
            <div>
              <Button>Generate</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProfilePanel = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profil</h2>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Nama</div>
              <div className="font-medium">{user?.name || "Siswa Demo"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">
                {user?.email || "demo@forex.com"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Role</div>
              <div className="font-medium capitalize">
                {userRole?.toLowerCase() || "pelanggan"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  /* ---------- main render ---------- */
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  if (!mounted || !user) return null;

  const handleLogout = () => {
    try {
      localStorage.removeItem("cart");
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    } catch (e) {
      console.error("Logout cleanup error:", e);
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={true}
        onCollapseChange={() => {}}
        ordersCount={0}
        customersCount={0}
        servicesCount={0}
        outletsCount={0}
        inventoryCount={0}
        lowStockCount={0}
        onLogout={handleLogout}
        onNavigate={(menu) => {
          // ✅ RESET SELECTED COURSE/ARTICLE SAAT PINDAH MENU
          if (
            menu !== "modules" &&
            menu !== "videos" &&
            menu !== "pdfs" &&
            menu !== "articles" &&
            menu !== "lesson-content"
          ) {
            setSelectedCourse(null);
            setSelectedLesson(null);
            setSelectedArticle(null);
          }
          setActiveMenu(menu as any);
        }}
        user={user}
      />

      <div className={cn("transition-all duration-300 md:ml-64")}>
        <Header openMobileSidebar={() => {}} />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold capitalize">
              {activeMenu === "article-management"
                ? "Manajemen Artikel"
                : activeMenu === "articles"
                  ? "Artikel"
                  : activeMenu}
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setActiveMenu("dashboard")}
              >
                Dashboard
              </Button>
              <Button onClick={() => setActiveMenu("courses")}>Courses</Button>
              <Button
                variant={
                  activeMenu === "article-management" ? "default" : "secondary"
                }
                onClick={() => setActiveMenu("article-management")}
              >
                <Newspaper className="mr-2 h-4 w-4" /> Artikel
              </Button>
              {selectedCourse && activeMenu !== "modules" && (
                <Button
                  variant="secondary"
                  onClick={() => setActiveMenu("modules")}
                >
                  Kembali ke {selectedCourse.title}
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            {activeMenu === "dashboard" && <DashboardPanel />}
            {activeMenu === "courses" && <CoursesPanel />}
            {activeMenu === "modules" && <ModulesPanel />}
            {activeMenu === "videos" && <VideoPanel />}
            {activeMenu === "pdfs" && <PdfPanel />}
            {activeMenu === "articles" && <ArticlePanel />}
            {activeMenu === "article-management" && <ArticleManagementPanel />}
            {activeMenu === "video-trading" && <VideoTradingPanel />}
            {activeMenu === "lesson-content" && <LessonContentPanel />}
            {activeMenu === "quizzes" && <QuizPanel />}
            {activeMenu === "progress" && <ProgressPanel />}
            {activeMenu === "forum" && <ForumPanel />}
            {activeMenu === "certificates" && <CertificatesPanel />}
            {activeMenu === "profile" && <ProfilePanel />}
          </div>
        </main>
      </div>

      {/* Course Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                {editMode ? "Edit Course" : "Tambah Course Baru"}
              </h3>
              <form
                onSubmit={handleSubmit(handleSaveCourse)}
                className="flex flex-col gap-4"
              >
                <div>
                  <Label htmlFor="title">Judul Course</Label>
                  <Input
                    id="title"
                    {...register("title", { required: true })}
                    placeholder="Masukkan judul course"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Deskripsi singkat course"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Harga</Label>
                  <Input
                    id="price"
                    {...register("price")}
                    placeholder="Free atau $49"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setModalOpen(false);
                      reset();
                    }}
                  >
                    Batal
                  </Button>
                  <Button type="submit">
                    {editMode ? "Perbarui Course" : "Buat Course"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lesson Modal */}
      <AnimatePresence>
        {lessonModalOpen && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                {editingLesson ? "Edit Lesson" : "Tambah Lesson Baru"} untuk{" "}
                {selectedCourse.title}
              </h3>
              <form
                onSubmit={handleSubmitLesson(handleSaveLesson)}
                className="flex flex-col gap-4"
              >
                <div>
                  <Label htmlFor="lesson-title">Judul Lesson</Label>
                  <Input
                    id="lesson-title"
                    {...registerLesson("title", { required: true })}
                    placeholder="Masukkan judul lesson"
                  />
                </div>
                <div>
                  <Label htmlFor="lesson-type">Tipe Konten</Label>
                  <Select
                    defaultValue="html"
                    onValueChange={(value) => {
                      setLessonValue("type", value);
                      if (value === "video" || value === "pdf") {
                        setLessonValue("content", "");
                      } else {
                        setLessonValue("contentUrl", "");
                      }
                    }}
                    {...registerLesson("type")}
                  >
                    <SelectTrigger id="lesson-type">
                      <SelectValue placeholder="Pilih tipe konten" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="text">Teks Sederhana</SelectItem>
                      <SelectItem value="html">
                        Artikel dengan Format Kaya
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional fields based on type */}
                {registerLesson("type").value === "video" ||
                registerLesson("type").value === "pdf" ? (
                  <div>
                    <Label htmlFor="content-url">URL Konten</Label>
                    <Input
                      id="content-url"
                      {...registerLesson("contentUrl")}
                      placeholder="URL video atau PDF"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Contoh: /videos/breakout.mp4, /pdfs/guide.pdf
                    </p>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept =
                            registerLesson("type").value === "video"
                              ? "video/*"
                              : "application/pdf";
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement)
                              .files?.[0];
                            if (file) {
                              try {
                                const formData = new FormData();
                                formData.append("file", file);
                                const res = await fetch("/api/upload", {
                                  method: "POST",
                                  body: formData,
                                });
                                const data = await res.json();
                                setLessonValue("contentUrl", data.url);
                              } catch (error) {
                                console.error("Upload error:", error);
                                alert("Gagal mengupload file. Coba lagi.");
                              }
                            }
                          };
                          input.click();
                        }}
                      >
                        <File className="mr-2 h-4 w-4" /> Upload File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="content">Konten</Label>
                    {/* ✅ RICH TEXT EDITOR DENGAN SCROLL */}
                    <div className="max-h-[400px] overflow-hidden rounded-md border">
                      <RichTextEditor
  ref={contentEditorRef}
  value={editingLesson?.content || ""}
  onChange={(value) => setLessonValue("content", value)}
  placeholder="Tulis konten pembelajaran di sini..."
/>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Gunakan toolbar untuk format kaya (gambar, tabel, heading,
                      dll)
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="duration">Durasi Perkiraan</Label>
                  <Input
                    id="duration"
                    {...registerLesson("duration")}
                    placeholder="Contoh: 15m, 45m, 2h"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setLessonModalOpen(false);
                      resetLesson();
                    }}
                  >
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingLesson ? "Perbarui Lesson" : "Tambah Lesson"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ ARTICLE MODAL - BARU */}
      <AnimatePresence>
        {articleModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-4xl shadow-2xl max-h-[95vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                {editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h3>
              <form
                onSubmit={handleSubmitArticle(handleSaveArticle)}
                className="flex flex-col gap-4"
              >
                {/* Judul */}
                <div>
                  <Label htmlFor="article-title">Judul Artikel</Label>
                  <Input
                    id="article-title"
                    {...registerArticle("title", { required: true })}
                    placeholder="Masukkan judul artikel yang menarik"
                  />
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <Label>Thumbnail Artikel</Label>
                  <div className="flex items-center gap-4">
                    {registerArticle("thumbnail").value && (
                      <img
                        src={registerArticle("thumbnail").value}
                        alt="Thumbnail"
                        className="w-32 h-24 object-cover rounded-lg border"
                      />
                    )}
                    <div className="flex-1">
                      <Input
                        {...registerArticle("thumbnail")}
                        placeholder="URL thumbnail atau upload gambar"
                        readOnly
                      />
                      <div className="mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={uploadingThumbnail}
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = async (e) => {
                              const file = (e.target as HTMLInputElement)
                                .files?.[0];
                              if (file) {
                                await handleThumbnailUpload(file);
                              }
                            };
                            input.click();
                          }}
                        >
                          {uploadingThumbnail ? (
                            <>
                              <Loader className="mr-2 h-4 w-4 animate-spin" />
                              Mengupload...
                            </>
                          ) : (
                            <>
                              <Image className="mr-2 h-4 w-4" />
                              Upload Thumbnail
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Published */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    {...registerArticle("published")}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="published" className="mb-0 cursor-pointer">
                    Publish artikel (tampilkan ke publik)
                  </Label>
                </div>

                {/* Konten Artikel dengan Rich Text Editor */}
                <div>
                  <Label>Konten Artikel</Label>
                  <div className="border rounded-md max-h-[500px] overflow-hidden">
                  <RichTextEditor
  ref={articleContentRef}
  value={editingArticle?.content || ""}
  onChange={(value) => {
    // Value sudah di-handle oleh editor internal
  }}
  placeholder="Tulis konten artikel lengkap di sini..."
/>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tips: Gunakan heading, list, dan gambar untuk membuat
                    artikel lebih menarik
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setArticleModalOpen(false);
                      resetArticle();
                      setEditingArticle(null);
                    }}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={uploadingThumbnail}>
                    {editingArticle ? "Perbarui Artikel" : "Buat Artikel"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ✅ TRADING VIDEO MODAL - BARU */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[95vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Play className="h-5 w-5" />
                {editingVideo ? "Edit Video Trading" : "Tambah Video Trading"}
              </h3>
              <form
                onSubmit={handleSubmitVideo(handleSaveVideo)}
                className="flex flex-col gap-4"
              >
                {/* Judul */}
                <div>
                  <Label htmlFor="video-title">Judul Video</Label>
                  <Input
                    id="video-title"
                    {...registerVideo("title", { required: true })}
                    placeholder="Masukkan judul video yang menarik"
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <Label htmlFor="video-description">Deskripsi</Label>
                  <Textarea
                    id="video-description"
                    {...registerVideo("description")}
                    placeholder="Deskripsi singkat tentang video ini..."
                    rows={3}
                  />
                </div>

                {/* Tipe Video */}
                <div>
                  <Label htmlFor="video-type">Sumber Video</Label>
                  <Select
                    defaultValue="YOUTUBE"
                    onValueChange={(value) => {
                      setVideoValue("videoType", value);
                      if (value === "YOUTUBE") {
                        setVideoValue("videoUrl", "");
                      }
                    }}
                    {...registerVideo("videoType")}
                  >
                    <SelectTrigger id="video-type">
                      <SelectValue placeholder="Pilih sumber video" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YOUTUBE">YouTube URL</SelectItem>
                      <SelectItem value="UPLOAD">Upload File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* URL Video atau Upload */}
                {watchVideo("videoType") === "YOUTUBE" ? (
                  <div>
                    <Label htmlFor="video-url">URL YouTube</Label>
                    <Input
                      id="video-url"
                      {...registerVideo("videoUrl", { required: true })}
                      placeholder="https://youtube.com/watch?v=... atau https://youtu.be/..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Support: youtube.com/watch?v=..., youtu.be/...,
                      youtube.com/shorts/...
                    </p>
                  </div>
                ) : (
                  <div>
                    <Label>Upload Video</Label>
                    <div className="flex items-center gap-4">
                      {registerVideo("videoUrl").value && (
                        <video
                          src={registerVideo("videoUrl").value}
                          className="w-32 h-24 object-cover rounded-lg"
                          controls
                        />
                      )}
                      <div className="flex-1">
                        <Input
                          {...registerVideo("videoUrl")}
                          placeholder="URL video hasil upload"
                          readOnly
                        />
                        <div className="mt-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={uploadingVideo}
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.accept = "video/*";
                              input.onchange = async (e) => {
                                const file = (e.target as HTMLInputElement)
                                  .files?.[0];
                                if (file) {
                                  await handleVideoUpload(file);
                                }
                              };
                              input.click();
                            }}
                          >
                            {uploadingVideo ? (
                              <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Mengupload...
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Upload Video
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Thumbnail (Optional) */}
                <div>
                  <Label>Thumbnail (Opsional)</Label>
                  <div className="flex items-center gap-4">
                    {registerVideo("thumbnail").value && (
                      <img
                        src={registerVideo("thumbnail").value}
                        alt="Thumbnail"
                        className="w-32 h-24 object-cover rounded-lg border"
                      />
                    )}
                    <div className="flex-1">
                      <Input
                        {...registerVideo("thumbnail")}
                        placeholder="URL thumbnail custom (auto-generate untuk YouTube)"
                      />
                    </div>
                  </div>
                  {watchVideo("videoType") === "YOUTUBE" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Kosongkan untuk menggunakan thumbnail YouTube otomatis
                    </p>
                  )}
                </div>

                {/* Status Published */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="video-published"
                    {...registerVideo("published")}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor="video-published"
                    className="mb-0 cursor-pointer"
                  >
                    Publish video (tampilkan ke publik)
                  </Label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setVideoModalOpen(false);
                      resetVideo();
                      setEditingVideo(null);
                    }}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={uploadingVideo}>
                    {editingVideo ? "Perbarui Video" : "Tambah Video"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Confirm Delete Video Dialog - BARU */}
      <AlertDialog open={videoConfirmOpen} onOpenChange={setVideoConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Hapus Video Trading?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {videoDeleteTarget && (
                <>
                  Anda akan menghapus video "
                  <span className="font-medium">{videoDeleteTarget.title}</span>
                  ". Tindakan ini tidak dapat dibatalkan.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setVideoConfirmOpen(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={doDeleteVideo}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus Video
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Delete Course Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Hapus Kursus?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>
                  Anda akan menghapus kursus "
                  <span className="font-medium">{deleteTarget.title}</span>
                  ". Semua lesson di dalamnya akan ikut terhapus secara
                  permanen.
                </>
              )}
              <br />
              <br />
              <span className="text-destructive font-medium">
                Tindakan ini tidak dapat dibatalkan.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={doDeleteCourse}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus Permanen
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Delete Lesson Dialog */}
      <AlertDialog open={lessonConfirmOpen} onOpenChange={setLessonConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Hapus Lesson?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {lessonDeleteTarget && (
                <>
                  Anda akan menghapus lesson "
                  <span className="font-medium">
                    {lessonDeleteTarget.title}
                  </span>
                  " dari kursus ini. Tindakan ini tidak dapat dibatalkan.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setLessonConfirmOpen(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={doDeleteLesson}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus Lesson
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ Confirm Delete Article Dialog - BARU */}
      <AlertDialog
        open={articleConfirmOpen}
        onOpenChange={setArticleConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Hapus Artikel?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {articleDeleteTarget && (
                <>
                  Anda akan menghapus artikel "
                  <span className="font-medium">
                    {articleDeleteTarget.title}
                  </span>
                  ". Tindakan ini tidak dapat dibatalkan.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setArticleConfirmOpen(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={doDeleteArticle}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus Artikel
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}