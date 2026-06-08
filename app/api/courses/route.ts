import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

export const runtime = "nodejs";

// Helper: Check if user has permission
async function checkPermission(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "MENTOR")) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Permission check error:", error);
    return false;
  }
}

// GET: Get all courses or single course
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Get single course with lessons
      const course = await prisma.course.findUnique({
        where: { id },
        include: { lessons: true },
      });

      if (!course) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ course }, { status: 200 });
    } else {
      // Get all courses with lessons
      const courses = await prisma.course.findMany({
        include: {
          lessons: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ courses }, { status: 200 });
    }
  } catch (error) {
    console.error("GET COURSES ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}

// POST: Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, title_en, description, description_en, price, published } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Create course - CORRECTED: No duplicate brace
    const course = await prisma.course.create({
      data: {
        title,
        title_en: title_en || null,
        description: description || null,
        description_en: description_en || null,
        price: price || null,
        published: published !== undefined ? published : false,
      },
    });

    return NextResponse.json(
      { message: "Course created successfully", course },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}

// PUT: Update course
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, title_en, description, description_en, price, published } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Update course - CORRECTED: No duplicate brace
    const course = await prisma.course.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingCourse.title,
        title_en: title_en !== undefined ? title_en || null : existingCourse.title_en,
        description:
          description !== undefined
            ? description || null
            : existingCourse.description,
        description_en:
          description_en !== undefined
            ? description_en || null
            : existingCourse.description_en,
        price: price !== undefined ? price || null : existingCourse.price,
        published:
          published !== undefined ? published : existingCourse.published,
      },
    });

    return NextResponse.json(
      { message: "Course updated successfully", course },
      { status: 200 },
    );
  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 },
    );
  }
}

// DELETE: Delete course
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Delete course
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Course deleted successfully", id },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 },
    );
  }
}
