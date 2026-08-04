// File: app/lesson/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LessonPage({ params }: { params: { id: string, locale: string } }) {
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // Ambil lesson dari API
        const response = await fetch(`/api/lessons?id=${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setLesson(data.lesson);

          // Ambil course dari API
          const courseResponse = await fetch(
            `/api/courses?id=${data.lesson.courseId}`,
          );
          if (courseResponse.ok) {
            const courseData = await courseResponse.json();
            setCourse(courseData.course);
          }
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    };

    fetchLesson();
  }, [params.id]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading lesson...</p>
      </div>
    );
  }

  const locale = params.locale || "id";
  const actualTitle = locale === "en" ? lesson.title_en || lesson.title : lesson.title;
  const actualContent = locale === "en" ? lesson.content_en || lesson.content : lesson.content;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050508] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{actualTitle}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline" onClick={() => router.back()}>
              Kembali
            </Button>
          </div>
        </div>

        {lesson.type === "video" ? (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="w-full bg-black/80 aspect-video rounded-md overflow-hidden">
                <video controls className="w-full h-full object-cover">
                  <source
                    src={lesson.contentUrl || "/placeholder.mp4"}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">{actualContent}</p>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" onClick={() => router.back()}>
                    Kembali
                  </Button>
                  <Button
                    className="bg-[#156d95] hover:bg-[#0d476e]"
                    onClick={() => router.push(`/lesson/${nextLessonId}`)}
                  >
                    Lanjutkan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: actualContent }} />
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Kembali
                </Button>
                <Button
                  className="bg-[#156d95] hover:bg-[#0d476e]"
                  onClick={() => router.push(`/lesson/${nextLessonId}`)}
                >
                  Lanjutkan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
