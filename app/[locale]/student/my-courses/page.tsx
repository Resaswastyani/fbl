"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Play,
  ArrowLeft,
  Loader2,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface EnrolledCourse {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: string;
  status: string;
}

export default function MyCoursesPage() {
  const t = useTranslations("StudentMyCourses");
  const router = useRouter();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "in-progress" | "completed"
  >("all");

  useEffect(() => {
    fetchMyCourses();
  }, []);

  useEffect(() => {
    // Filter courses based on search and status
    let filtered = courses;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (course.description &&
            course.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())),
      );
    }

    if (filterStatus === "in-progress") {
      filtered = filtered.filter(
        (course) => course.progress > 0 && course.progress < 100,
      );
    } else if (filterStatus === "completed") {
      filtered = filtered.filter((course) => course.progress === 100);
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, filterStatus]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enrollments", {
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
        setFilteredCourses(data.courses || []);
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching my courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueLearning = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  const formatLastAccessed = (date: string) => {
    if (!date) return t("notAccessed");
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return t("today");
    if (days === 1) return t("yesterday");
    if (days < 7) return `${days} hari yang lalu`;
    return d.toLocaleDateString("id-ID");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#156d95] mx-auto" />
          <p className="mt-4 text-muted-foreground">{t("loadingMyCourses")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/student/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("myCourses")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("activeCourses", { count: courses.length })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t("searchCourses")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
              className={filterStatus === "all" ? "bg-[#156d95]" : ""}
            >{t("all")}</Button>
            <Button
              variant={filterStatus === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("in-progress")}
              className={filterStatus === "in-progress" ? "bg-[#156d95]" : ""}
            >{t("inProgress")}</Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("completed")}
              className={filterStatus === "completed" ? "bg-[#156d95]" : ""}
            >{t("completed")}</Button>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-all cursor-pointer overflow-hidden border-0 shadow-md"
                onClick={() => handleContinueLearning(course.id)}
              >
                {/* Progress Bar Top */}
                <div className="h-1 bg-secondary w-full">
                  <div
                    className="h-full bg-[#156d95] transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <CardContent className="p-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    {course.progress === 100 ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />{t("completed")}</Badge>
                    ) : course.progress > 0 ? (
                      <Badge className="bg-[#156d95]/10 text-[#156d95]">
                        <Clock className="h-3 w-3 mr-1" />{t("inProgress")}</Badge>
                    ) : (
                      <Badge className="bg-secondary text-muted-foreground">{t("notStarted")}</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatLastAccessed(course.lastAccessed)}
                    </span>
                  </div>

                  {/* Course Info */}
                  <h3 className="font-bold text-xl mb-2 line-clamp-2 text-foreground">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {course.description || t("noDescription")}
                  </p>

                  {/* Progress Info */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t("progress")}</span>
                      <span className="font-bold text-[#156d95]">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#156d95] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>
                        {t("lessonProgress", { completed: course.lessonsCompleted, total: course.totalLessons })}
                      </span>
                    </div>
                    {course.progress === 100 && (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >{t("certificate")}</Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full ${
                      course.progress === 100
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-[#156d95] hover:bg-[#0d476e]"
                    } text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContinueLearning(course.id);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {course.progress === 0
                      ? t("startLearning")
                      : course.progress === 100
                        ? t("review")
                        : t("continueLearning")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl shadow-sm border border-border">
            {courses.length === 0 ? (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#156d95]/10 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-[#156d95]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Belum Ada Kursus
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {t("startLearningJourney")}
                </p>
                <Button
                  onClick={() => router.push("/student/courses")}
                  className="bg-[#156d95] hover:bg-[#0d476e]"
                  size="lg"
                >{t("exploreCourses")}</Button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Tidak Ditemukan
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t("noCoursesMatch")}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                >{t("resetFilter")}</Button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
