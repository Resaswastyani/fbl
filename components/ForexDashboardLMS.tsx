"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { Trash2, Plus, Play, FileText, Award, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// UI primitives (sesuaikan jika berbeda)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import Sidebar from "@/components/dashboard/SideBar"; // gunakan sidebar yang ada — atau ganti implementasi
import Header from "@/components/dashboard/Header"; // gunakan header yg ada

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
  type: "video" | "pdf" | "article";
  contentUrl?: string;
  duration?: string;
  quiz?: Quiz;
};

type Quiz = {
  id: string;
  questions: { id: string; q: string; choices: string[]; answerIndex: number }[];
};

type UserProgress = {
  userId: string;
  courseId: string;
  completedLessons: string[]; // lesson ids
  score?: number;
};

/* -------------- Mock Data -------------- */
const MOCK_COURSES: Course[] = [
  {
    id: "c-forex-basics",
    title: "Forex Foundations",
    description: "Dasar-dasar forex: pasangan mata uang, pip, leverage, margin, dan psikologi trading.",
    price: "Free",
    published: true,
    lessons: [
      { id: "l1", title: "Pengenalan Forex", type: "article", contentUrl: "/content/intro.html", duration: "8m" },
      { id: "l2", title: "Pair & Pip", type: "video", contentUrl: "/videos/pair-pip.mp4", duration: "12m" },
      { id: "l3", title: "Manajemen Risiko", type: "pdf", contentUrl: "/pdfs/risk-management.pdf", duration: "10m" },
    ],
  },
  {
    id: "c-strategy",
    title: "Strategi Breakout & Pullback",
    description: "Strategi trading teknikal praktis untuk entry dan exit.",
    price: "$49",
    published: true,
    lessons: [
      { id: "l4", title: "Breakout Setup", type: "video", contentUrl: "/videos/breakout.mp4", duration: "18m" },
      { id: "l5", title: "Pullback Rules", type: "article", contentUrl: "/content/pullback.html", duration: "9m" },
    ],
  },
];

/* -------------- Main Component -------------- */
export default function ForexDashboardLMS() {
  const { register, handleSubmit, reset } = useForm<any>();
  const { theme, setTheme } = useTheme();
  const safeTheme: "light" | "dark" = theme === "dark" ? "dark" : "light";
  const toggleTheme = () => setTheme(safeTheme === "light" ? "dark" : "light");

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .finally(() => setLoadingUser(false));
  }, []);


  /* UI state */
  const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

  const [courses, setCourses] = useState<Course[]>([]);
  const [activeMenu, setActiveMenu] = useState<
    | "dashboard"
    | "courses"
    | "modules"
    | "videos"
    | "pdfs"
    | "quizzes"
    | "progress"
    | "forum"
    | "certificates"
    | "profile"
  >("dashboard");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [progressList, setProgressList] = useState<UserProgress[]>([]);

  useEffect(() => {
    setMounted(true);
    // init with mock
    setCourses(MOCK_COURSES);
    setProgressList([
      { userId: "u1", courseId: "c-forex-basics", completedLessons: ["l1"], score: 80 },
      { userId: "u1", courseId: "c-strategy", completedLessons: [], score: 0 },
    ]);
  }, []);

  /* ---------- CRUD Handlers (mock) ---------- */
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

  const handleSaveCourse = (data: any) => {
    if (editMode && selectedCourse) {
      setCourses((prev) => prev.map((p) => (p.id === selectedCourse.id ? { ...p, title: data.title, description: data.description, price: data.price } : p)));
    } else {
      const id = `c-${Date.now()}`;
      const newCourse: Course = { id, title: data.title, description: data.description, price: data.price || "Free", lessons: [], published: false };
      setCourses((prev) => [newCourse, ...prev]);
    }
    setModalOpen(false);
  };

  const confirmDeleteCourse = (c: Course) => {
    setDeleteTarget(c);
    setConfirmOpen(true);
  };

  const doDeleteCourse = () => {
    if (!deleteTarget) return;
    setCourses((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setConfirmOpen(false);
  };

  /* ---------- Course/Module helpers ---------- */
  const addLessonToCourse = (courseId: string, lesson: Lesson) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, lessons: [...c.lessons, lesson] } : c)));
  };

  const markLessonComplete = (userId: string, courseId: string, lessonId: string) => {
    setProgressList((prev) => {
      const p = prev.find((x) => x.userId === userId && x.courseId === courseId);
      if (!p) {
        return [...prev, { userId, courseId, completedLessons: [lessonId], score: 0 }];
      } else if (!p.completedLessons.includes(lessonId)) {
        return prev.map((x) => (x === p ? { ...p, completedLessons: [...p.completedLessons, lessonId] } : x));
      }
      return prev;
    });
  };

  /* ---------- Render helpers for each menu ---------- */
  const DashboardPanel = () => {
    const totalCourses = courses.length;
    const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
    const completedLessons = progressList.reduce((acc, p) => acc + p.completedLessons.length, 0);
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <h3 className="text-sm text-muted-foreground">Kursus</h3>
              <div className="text-2xl font-semibold">{totalCourses}</div>
              <div className="text-xs mt-1 text-muted-foreground">Total kursus tersedia</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm text-muted-foreground">Lessons</h3>
              <div className="text-2xl font-semibold">{totalLessons}</div>
              <div className="text-xs mt-1 text-muted-foreground">Total lesson</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm text-muted-foreground">Progress (murid)</h3>
              <div className="text-2xl font-semibold">{completedLessons}</div>
              <div className="text-xs mt-1 text-muted-foreground">Lesson terselesaikan</div>
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
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" onClick={() => { setSelectedCourse(c); setActiveMenu("modules"); }}>Lihat Materi</Button>
                      <Button variant="outline" size="sm" onClick={() => openEditCourse(c)}>Edit</Button>
                      <button onClick={() => confirmDeleteCourse(c)} className="text-red-600"><Trash2 /></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{c.price}</div>
                    <div className="mt-6 text-xs">{c.lessons.length} lessons</div>
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
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Courses</h2>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => { setCourses(MOCK_COURSES); }}>Reset Mock</Button>
            <Button onClick={openAddCourse}><Plus /> Tambah Kursus</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <Card key={c.id}>
              <CardContent className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.description}</div>
                  <div className="mt-2 text-xs text-muted-foreground">{c.lessons.length} lesson(s)</div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm font-medium">{c.price}</div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => { setSelectedCourse(c); setActiveMenu("modules"); }}>Open</Button>
                    <Button variant="outline" size="sm" onClick={() => openEditCourse(c)}>Edit</Button>
                    <button onClick={() => confirmDeleteCourse(c)} className="p-2 text-red-600"><Trash2 /></button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const ModulesPanel = () => {
    if (!selectedCourse) {
      return <div>Pilih kursus terlebih dahulu (dari menu Courses atau Dashboard)</div>;
    }

    const addLesson = () => {
      const id = `l-${Date.now()}`;
      const lesson: Lesson = { id, title: `Lesson baru ${selectedCourse.lessons.length + 1}`, type: "video", contentUrl: "", duration: "5m" };
      addLessonToCourse(selectedCourse.id, lesson);
    };

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Materi: {selectedCourse.title}</h2>
            <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={addLesson}><Plus /> Tambah Lesson</Button>
            <Button onClick={() => setActiveMenu("videos")}><Play /> Play Sample</Button>
          </div>
        </div>

        <div className="space-y-3">
          {selectedCourse.lessons.map((ls) => (
            <Card key={ls.id}>
              <CardContent className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{ls.title}</div>
                  <div className="text-xs text-muted-foreground">{ls.type} • {ls.duration}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { /* edit lesson */ }}>Edit</Button>
                  <Button size="sm" onClick={() => { /* open lesson */ setActiveMenu(ls.type === "video" ? "videos" : ls.type === "pdf" ? "pdfs" : "modules"); }}>
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const VideoPanel = () => {
    // will show first video of selectedCourse or a fallback
    const firstVideo = selectedCourse?.lessons.find((l) => l.type === "video");
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Video Player</h2>
          <div className="text-sm text-muted-foreground">{selectedCourse?.title ?? "No course selected"}</div>
        </div>

        <Card>
          <CardContent>
            {firstVideo ? (
              <div>
                <div className="mb-3 font-medium">{firstVideo.title}</div>
                <div className="w-full bg-black/80 aspect-video rounded-md overflow-hidden">
                  {/* NOTE: use <video> when you have a url; here placeholder */}
                  <video controls className="w-full h-full object-cover">
                    <source src={firstVideo.contentUrl || "/placeholder.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Button onClick={() => markLessonComplete("u1", selectedCourse!.id, firstVideo.id)}>Mark Complete</Button>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-muted-foreground">Tidak ada video untuk kursus ini.</div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const PdfPanel = () => {
    const firstPdf = selectedCourse?.lessons.find((l) => l.type === "pdf");
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">PDF Viewer</h2>
        <Card>
          <CardContent>
            {firstPdf ? (
              <iframe src={firstPdf.contentUrl || "/pdfs/sample.pdf"} className="w-full h-[600px]" />
            ) : (
              <div className="py-10 text-center text-muted-foreground">Tidak ada PDF untuk kursus ini.</div>
            )}
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
            <p className="text-sm text-muted-foreground">Buat dan kelola quiz untuk setiap lesson. (Fungsionalitas mock — hubungkan API anda untuk menyimpan)</p>
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
            return (
              <Card key={p.courseId}>
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{course?.title ?? p.courseId}</div>
                      <div className="text-xs text-muted-foreground">{p.completedLessons.length}/{course?.lessons.length ?? 0} lessons selesai</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{Math.round(((p.completedLessons.length)/(course?.lessons.length || 1))*100)}%</div>
                      <div className="text-xs text-muted-foreground">Score: {p.score ?? 0}</div>
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
                <div className="font-medium">Thread: Mengenal Support & Resistance</div>
                <p className="text-sm text-muted-foreground mt-1">Diskusi terbuka — mentor akan menanggapi 24 jam.</p>
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
              <div className="font-medium">Sertifikat Penyelesaian - Forex Foundations</div>
              <div className="text-xs text-muted-foreground">Diberikan setelah menyelesaikan 80% materi dan lulus quiz</div>
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
              <div className="font-medium">Siswa Demo</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">demo@forex.com</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  /* ---------- main render ---------- */
  if (!mounted) return null;

  const handleLogout = () => {
    // clear local data (contoh)
    try {
      localStorage.removeItem("cart");
    } catch (e) {
      // ignore
    }
    // redirect to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={(m) => setActiveMenu(m as any)}
        sidebarOpen={true}
        onCollapseChange={() => {}}
        ordersCount={0}
        customersCount={0}
        servicesCount={0}
        outletsCount={0}
        inventoryCount={0}
        lowStockCount={0}
        onLogout={handleLogout}

        user={user}
      />

      <div className={cn("transition-all duration-300 md:ml-64")}>
        <Header openMobileSidebar={() => {}} />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold capitalize">{activeMenu}</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setActiveMenu("dashboard")}>Dashboard</Button>
              <Button onClick={() => setActiveMenu("courses")}>Courses</Button>
            </div>
          </div>

          {/* Content */}
          <div>
            {activeMenu === "dashboard" && <DashboardPanel />}
            {activeMenu === "courses" && <CoursesPanel />}
            {activeMenu === "modules" && <ModulesPanel />}
            {activeMenu === "videos" && <VideoPanel />}
            {activeMenu === "pdfs" && <PdfPanel />}
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }} className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-2xl">
              <h3 className="text-lg font-bold mb-4">{editMode ? "Edit Course" : "Tambah Course"}</h3>
              <form onSubmit={handleSubmit(handleSaveCourse)} className="flex flex-col gap-3">
                <Label>Judul</Label>
                <Input {...register("title")} required />
                <Label>Deskripsi</Label>
                <Input {...register("description")} />
                <Label>Harga</Label>
                <Input {...register("price")} />
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
                  <Button type="submit">Simpan</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kursus?</AlertDialogTitle>
            <AlertDialogDescription>Jika dihapus, semua lesson terkait akan hilang.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={() => doDeleteCourse()}>Hapus</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
