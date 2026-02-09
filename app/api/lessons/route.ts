import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

export const runtime = "nodejs";

// Helper: Check if user is ADMIN or MENTOR
async function checkAdminOrMentor() {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return { authorized: false, error: "Unauthorized", status: 401 };
    }

    if (user.role !== "ADMIN" && user.role !== "MENTOR") {
      return {
        authorized: false,
        error: "Forbidden - Hanya admin atau mentor yang bisa mengelola lesson",
        status: 403,
      };
    }

    return { authorized: true, user };
  } catch (error) {
    console.error("Auth check error:", error);
    return { authorized: false, error: "Authentication error", status: 500 };
  }
}

// GET: Get all lessons
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    const lessons = await prisma.lesson.findMany({
      where: { courseId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        title: true,
        type: true,
        content: true,
        contentUrl: true,
        duration: true,
        createdAt: true,
        updatedAt: true,
        courseId: true,
      },
    });

    return NextResponse.json({ lessons }, { status: 200 });
  } catch (error) {
    console.error("GET LESSONS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 },
    );
  }
}

// POST: Create lesson
export async function POST(request: NextRequest) {
  try {
    const auth = await checkAdminOrMentor();
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { title, type, content, contentUrl, duration, courseId } = body;

    if (!title || !type || !courseId) {
      return NextResponse.json(
        { error: "title, type, and courseId are required" },
        { status: 400 },
      );
    }

    const lessonType = type.toUpperCase();
    const validTypes = ["VIDEO", "PDF", "IMAGE", "TEXT", "HTML"];

    if (!validTypes.includes(lessonType)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 },
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const data: {
      title: string;
      type: string;
      courseId: string;
      duration?: string | null;
      content?: string | null;
      contentUrl?: string | null;
    } = {
      title,
      type: lessonType,
      courseId,
      duration: duration || null,
    };

    if (["VIDEO", "PDF", "IMAGE"].includes(lessonType)) {
      if (!contentUrl) {
        return NextResponse.json(
          { error: "contentUrl is required for video, pdf, and image types" },
          { status: 400 },
        );
      }
      data.contentUrl = contentUrl;
      data.content = content || null;
    }

    if (["TEXT", "HTML"].includes(lessonType)) {
      if (!content) {
        return NextResponse.json(
          { error: "content is required for text and html types" },
          { status: 400 },
        );
      }
      data.content = content;
      data.contentUrl = null;
    }

    const lesson = await prisma.lesson.create({
      data,
      include: {
        course: true,
      },
    });

    return NextResponse.json(
      { message: "Lesson created successfully", lesson },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("CREATE LESSON ERROR:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Lesson with this ID already exists" },
        { status: 409 },
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Invalid course ID - Course does not exist" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create lesson",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
        code: error.code,
      },
      { status: 500 },
    );
  }
}

// PUT: Update lesson
export async function PUT(request: NextRequest) {
  try {
    const auth = await checkAdminOrMentor();
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { id, title, type, content, contentUrl, duration } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 },
      );
    }

    const existingLesson = await prisma.lesson.findUnique({
      where: { id },
    });

    if (!existingLesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const lessonType = type ? type.toUpperCase() : existingLesson.type;

    const data: {
      title?: string;
      type?: string;
      duration?: string | null;
      content?: string | null;
      contentUrl?: string | null;
    } = {
      title: title ?? existingLesson.title,
      type: lessonType,
      duration: duration ?? existingLesson.duration,
    };

    if (["VIDEO", "PDF", "IMAGE"].includes(lessonType)) {
      data.contentUrl =
        contentUrl !== undefined ? contentUrl : existingLesson.contentUrl;
      data.content = content !== undefined ? content : existingLesson.content;
    }

    if (["TEXT", "HTML"].includes(lessonType)) {
      data.content = content !== undefined ? content : existingLesson.content;
      data.contentUrl = null;
    }

    const lesson = await prisma.lesson.update({
      where: { id },
      data,
      include: {
        course: true,
      },
    });

    return NextResponse.json(
      { message: "Lesson updated successfully", lesson },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("UPDATE LESSON ERROR:", error);
    return NextResponse.json(
      {
        error: "Failed to update lesson",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}

// DELETE: Delete lesson
export async function DELETE(request: NextRequest) {
  try {
    const auth = await checkAdminOrMentor();
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 },
      );
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    await prisma.lesson.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Lesson deleted successfully", id },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("DELETE LESSON ERROR:", error);
    return NextResponse.json(
      {
        error: "Failed to delete lesson",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
