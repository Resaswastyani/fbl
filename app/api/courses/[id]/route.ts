import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

// GET - Mendapatkan detail course berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    const user = await getUserFromCookie();
    let isEnrolled = false;
    let enrollment = null;
    let completedLessonIds: string[] = [];

    if (user) {
      enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: id,
          },
        },
        include: {
          lessonCompletions: true,
        },
      });

      if (enrollment) {
        isEnrolled = true;
        completedLessonIds = enrollment.lessonCompletions.map(
          (lc) => lc.lessonId,
        );
      }
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            title: true,
            title_en: true,
            type: true,
            content: true,
            content_en: true,
            contentUrl: true,
            duration: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const isFree =
      !course.price || course.price === 0 || course.price === "Free";

    return NextResponse.json({
      course,
      isEnrolled,
      isFree,
      canAccess: isFree || isEnrolled,
      completedLessonIds,
    });
  } catch (error) {
    console.error("GET COURSE DETAIL ERROR:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch course detail",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    );
  }
}

// PUT - Update progress
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { progress, lessonId } = body;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: id,
        },
      },
      include: {
        lessonCompletions: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: "You are not enrolled in this course" },
        { status: 403 },
      );
    }

    if (lessonId) {
      const existingCompletion = enrollment.lessonCompletions.find(
        (lc) => lc.lessonId === lessonId,
      );

      if (!existingCompletion) {
        await prisma.lessonCompletion.create({
          data: {
            enrollmentId: enrollment.id,
            lessonId: lessonId,
          },
        });
      }
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: { lessons: true },
    });

    const totalLessons = course?.lessons.length || 0;
    const currentCompletions = await prisma.lessonCompletion.count({
      where: { enrollmentId: enrollment.id },
    });

    const newProgress =
      totalLessons > 0
        ? Math.round((currentCompletions / totalLessons) * 100)
        : 0;

    const updatedEnrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: id,
        },
      },
      data: {
        progress: progress !== undefined ? progress : newProgress,
        lastAccessedAt: new Date(),
      },
      include: {
        lessonCompletions: true,
      },
    });

    return NextResponse.json({
      success: true,
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    console.error("UPDATE PROGRESS ERROR:", error);
    return NextResponse.json(
      {
        error: "Failed to update progress",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    );
  }
}
