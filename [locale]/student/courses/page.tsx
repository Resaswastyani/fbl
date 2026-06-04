"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  FileText,
  BookOpen,
  CheckCircle,
  Lock,
  ArrowLeft,
  Loader2,
} from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  type: "video" | "pdf" | "text" | "html";
  content?: string;
  contentUrl?: string;
  duration?: string;
};

type Course = {
  id: string;
  title: string;
  description?: string;
  price?: string;
  published?: boolean;
  lessons: Lesson[];
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [canAccess, setCanAccess] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);

      // Fetch course detail
      const res = await fetch(`/api/courses/${courseId}`, {
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 404) {
          setError("Course tidak ditemukan");
        } else {
          setError("Terjadi kesalahan saat memuat course");
        }
        return;
      }

      const data = await res.json();
      setCourse(data.course);
      setIsEnrolled(data.isEnrolled);
      setIsFree(data.isFree);
      setCanAccess(data.canAccess);

      if (data.course.lessons.length > 0) {
        setSelectedLesson(data.course.lessons[0]);
      }

      // Check auth status
      const authRes = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (authRes.ok) {
        const authData = await authRes.json();
        setUser(authData.user);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      // Guest user trying to enroll free course
      // Redirect to login
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ courseId }),
      });

      if (res.ok) {
        setIsEnrolled(true);
        setCanAccess(true);
        alert("Berhasil mendaftar ke course!");
      } else {
        const data = await res.json();
        alert(data.error || "Gagal mendaftar");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Terjadi kesalahan saat mendaftar");
    }
  };

  const handleLessonComplete = async (lessonId: string) => {
    if (!user || !isEnrolled) return;

    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          lessonId,
          progress: Math.round(
            ((completedLessons.length + 1) / (course?.lessons.length || 1)) *
              100,
          ),
        }),
      });

      if (res.ok) {
        setCompletedLessons([...completedLessons, lessonId]);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "text":
      case "html":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#156d95] mx-auto" />
          <p className="mt-4 text-gray-600">Memuat course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">
            {error || "Course tidak ditemukan"}
          </p>
          <Button onClick={() => router.push("/student/courses")}>
            Kembali ke Daftar Kursus
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-500">
                  {course.lessons.length} Lessons
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isFree && (
                <Badge className="bg-blue-100 text-blue-700">Gratis</Badge>
              )}
              {isEnrolled && (
                <Badge className="bg-green-100 text-green-700">Terdaftar</Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {canAccess ? (
              <Card className="mb-6">
                <CardContent className="p-6">
                  {selectedLesson ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">
                          {selectedLesson.title}
                        </h2>
                        <Badge variant="outline">{selectedLesson.type}</Badge>
                      </div>

                      {/* Content based on type */}
                      {selectedLesson.type === "video" &&
                        selectedLesson.contentUrl && (
                          <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                            <video
                              src={selectedLesson.contentUrl}
                              controls
                              className="w-full h-full rounded-lg"
                            />
                          </div>
                        )}

                      {(selectedLesson.type === "text" ||
                        selectedLesson.type === "html") && (
                        <div
                          className="prose max-w-none mb-4"
                          dangerouslySetInnerHTML={{
                            __html:
                              selectedLesson.content || "Tidak ada konten",
                          }}
                        />
                      )}

                      {selectedLesson.type === "pdf" &&
                        selectedLesson.contentUrl && (
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            <a
                              href={selectedLesson.contentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-[#156d95] hover:underline"
                            >
                              <FileText className="h-6 w-6 mr-2" />
                              Buka PDF
                            </a>
                          </div>
                        )}

                      {selectedLesson.duration && (
                        <p className="text-sm text-gray-500 mb-4">
                          Durasi: {selectedLesson.duration} menit
                        </p>
                      )}

                      {isEnrolled && (
                        <Button
                          onClick={() =>
                            handleLessonComplete(selectedLesson.id)
                          }
                          disabled={completedLessons.includes(
                            selectedLesson.id,
                          )}
                          className="w-full"
                        >
                          {completedLessons.includes(selectedLesson.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Sudah Selesai
                            </>
                          ) : (
                            "Tandai Selesai"
                          )}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-12">
                      Pilih lesson untuk memulai belajar
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6">
                <CardContent className="p-12 text-center">
                  <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">Course Terkunci</h2>
                  <p className="text-gray-500 mb-6">
                    {isFree
                      ? "Daftar sekarang untuk mengakses course gratis ini"
                      : "Beli course ini untuk mengakses semua materi"}
                  </p>
                  {isFree ? (
                    <Button
                      onClick={handleEnroll}
                      className="bg-[#156d95] hover:bg-[#0d476e]"
                    >
                      Daftar Sekarang
                    </Button>
                  ) : (
                    <Button
                      onClick={() => router.push("/student/courses")}
                      className="bg-[#156d95] hover:bg-[#0d476e]"
                    >
                      Lihat Harga
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Course Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Deskripsi</h3>
                <p className="text-gray-600">
                  {course.description || "Tidak ada deskripsi"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">Daftar Lesson</h3>
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isLocked = !canAccess;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && setSelectedLesson(lesson)}
                        disabled={isLocked}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
                          selectedLesson?.id === lesson.id
                            ? "bg-[#156d95] text-white"
                            : isLocked
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex-shrink-0 mr-3">
                          {isLocked ? (
                            <Lock className="h-4 w-4" />
                          ) : isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            getLessonIcon(lesson.type)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {index + 1}. {lesson.title}
                          </p>
                          {lesson.duration && (
                            <p
                              className={`text-xs ${
                                selectedLesson?.id === lesson.id
                                  ? "text-white/70"
                                  : "text-gray-500"
                              }`}
                            >
                              {lesson.duration} menit
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
