import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    // Get total courses
    const totalCourses = await prisma.course.count();

    // Get total lessons
    const totalLessons = await prisma.lesson.count();

    // Get total users
    const totalUsers = await prisma.user.count();

    // Get recent courses
    const recentCourses = await prisma.course.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        lessons: true,
      },
    });

    // Get course completion stats
    const userProgress = await prisma.userProgress.findMany({
      include: {
        course: true,
      },
    });

    const completionStats = userProgress.map((progress) => {
      const totalLessons = progress.course.lessons.length;
      const completedLessons = Array.isArray(progress.completedLessons)
        ? progress.completedLessons.length
        : 0;

      return {
        courseId: progress.courseId,
        courseTitle: progress.course.title,
        completedLessons,
        totalLessons,
        completionRate:
          totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0,
        score: progress.score || 0,
      };
    });

    return NextResponse.json(
      {
        totalCourses,
        totalLessons,
        totalUsers,
        recentCourses,
        completionStats,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DASHBOARD STATS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
