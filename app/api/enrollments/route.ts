// app/api/enrollments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

// GET - Mendapatkan semua kursus yang dienroll oleh user
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    // Ambil enrollment dengan data course dan lesson completions
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
      include: {
        course: {
          include: {
            lessons: true,
          },
        },
        lessonCompletions: true,
      },
      orderBy: {
        lastAccessedAt: "desc",
      },
    });

    // Format response
    const courses = enrollments.map((enrollment) => {
      const totalLessons = enrollment.course.lessons.length;
      const completedLessons = enrollment.lessonCompletions.length;
      const progress =
        totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

      return {
        id: enrollment.course.id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        progress,
        lessonsCompleted: completedLessons,
        totalLessons,
        lastAccessed:
          enrollment.lastAccessedAt?.toISOString() ||
          enrollment.createdAt.toISOString(),
      };
    });

    // Hitung sertifikat (contoh: course dengan progress 100%)
    const certificateCount = courses.filter((c) => c.progress === 100).length;

    return NextResponse.json({
      courses,
      certificateCount,
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch enrollments",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    );
  }
}

// POST - Enroll ke course (untuk course free)
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    // Cek course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Cek apakah course free
    const isFree =
      !course.price || course.price === 0 || course.price === "Free";
    if (!isFree) {
      return NextResponse.json(
        { error: "Course ini berbayar. Silakan beli terlebih dahulu." },
        { status: 400 },
      );
    }

    // Cek apakah sudah enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Anda sudah terdaftar di course ini" },
        { status: 400 },
      );
    }

    // Buat enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
        status: "ACTIVE",
        progress: 0,
      },
    });

    // Buat product jika belum ada
    const existingProduct = await prisma.product.findUnique({
      where: { id: courseId },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          id: courseId,
          title: course.title,
          price: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendaftar ke course",
      enrollment,
    });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json(
      {
        error: "Failed to enroll",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    );
  }
}
