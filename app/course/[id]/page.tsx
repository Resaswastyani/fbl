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
  Clock,
  Image as ImageIcon,
  Code,
  AlignLeft,
} from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  type: "VIDEO" | "PDF" | "IMAGE" | "TEXT" | "HTML";
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
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);

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
      setCompletedLessonIds(data.completedLessonIds || []);

      if (data.course.lessons.length > 0) {
        setSelectedLesson(data.course.lessons[0]);
      }

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
            ((completedLessonIds.length + 1) / (course?.lessons.length || 1)) *
              100,
          ),
        }),
      });

      if (res.ok) {
        setCompletedLessonIds([...completedLessonIds, lessonId]);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Play className="h-4 w-4" />;
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "IMAGE":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      case "TEXT":
        return <AlignLeft className="h-4 w-4" />;
      case "HTML":
        return <Code className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const renderLessonContent = () => {
    if (!selectedLesson) return null;

    switch (selectedLesson.type) {
      case "VIDEO":
        if (selectedLesson.contentUrl) {
          return (
            <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden">
              <video
                src={selectedLesson.contentUrl}
                controls
                className="w-full h-full"
                poster="/images/video-placeholder.jpg"
              >
                Browser Anda tidak mendukung video tag.
              </video>
            </div>
          );
        }
        return (
          <div className="p-8 text-center text-gray-500">
            Video tidak tersedia
          </div>
        );

      case "PDF":
        if (selectedLesson.contentUrl) {
          return (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300">
                <FileText className="h-16 w-16 text-red-500 mb-4" />
                <p className="text-gray-600 mb-4 font-medium">PDF Document</p>
                <a
                  href={selectedLesson.contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#156d95] text-white px-6 py-2 rounded-lg hover:bg-[#0d476e] transition inline-flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Buka / Download PDF
                </a>
              </div>
              <iframe
                src={selectedLesson.contentUrl}
                className="w-full h-96 border rounded-lg"
                title="PDF Viewer"
              />
            </div>
          );
        }
        return (
          <div className="p-8 text-center text-gray-500">
            PDF tidak tersedia
          </div>
        );

      case "IMAGE":
        if (selectedLesson.contentUrl) {
          return (
            <div className="mb-4">
              <img
                src={selectedLesson.contentUrl}
                alt={selectedLesson.title}
                className="w-full rounded-lg shadow-md"
              />
              {selectedLesson.content && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{selectedLesson.content}</p>
                </div>
              )}
            </div>
          );
        }
        return (
          <div className="p-8 text-center text-gray-500">
            Gambar tidak tersedia
          </div>
        );

      case "TEXT":
        return (
          <div className="prose max-w-none mb-4 p-6 bg-gray-50 rounded-lg">
            <p className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base">
              {selectedLesson.content || "Tidak ada konten"}
            </p>
          </div>
        );

      case "HTML":
        return (
          <div
            className="prose max-w-none mb-4 p-6 bg-white border rounded-lg"
            dangerouslySetInnerHTML={{
              __html: selectedLesson.content || "<p>Tidak ada konten</p>",
            }}
          />
        );

      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Tipe konten tidak dikenali: {selectedLesson.type}
          </div>
        );
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
                        <Badge variant="outline" className="capitalize">
                          {selectedLesson.type.toLowerCase()}
                        </Badge>
                      </div>

                      {/* Render konten berdasarkan tipe */}
                      {renderLessonContent()}

                      {selectedLesson.duration && (
                        <p className="text-sm text-gray-500 mb-4 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Durasi: {selectedLesson.duration}
                        </p>
                      )}

                      {isEnrolled && (
                        <Button
                          onClick={() =>
                            handleLessonComplete(selectedLesson.id)
                          }
                          disabled={completedLessonIds.includes(
                            selectedLesson.id,
                          )}
                          className="w-full"
                        >
                          {completedLessonIds.includes(selectedLesson.id) ? (
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
                    const isCompleted = completedLessonIds.includes(lesson.id);
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
                              {lesson.duration} • {lesson.type.toLowerCase()}
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
