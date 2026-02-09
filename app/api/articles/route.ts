// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

// GET - List all articles atau single article
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    // Jika ada ID, ambil single article
    if (id) {
      const article = await prisma.article.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!article) {
        return NextResponse.json(
          { error: "Artikel tidak ditemukan" },
          { status: 404 },
        );
      }

      // Increment view count (hanya jika bukan author yang melihat)
      const currentUser = await getUserFromCookie();
      if (currentUser?.id !== article.authorId) {
        await prisma.article.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
        });
      }

      return NextResponse.json({ article });
    }

    // Jika ada slug, cari berdasarkan judul
    if (slug) {
      const article = await prisma.article.findFirst({
        where: {
          published: true,
          title: {
            contains: slug.replace(/-/g, " "),
            mode: "insensitive",
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!article) {
        return NextResponse.json(
          { error: "Artikel tidak ditemukan" },
          { status: 404 },
        );
      }

      return NextResponse.json({ article });
    }

    // List all articles
    // Jika user login, tampilkan semua (published & draft miliknya)
    // Jika tidak login, hanya tampilkan published
    const currentUser = await getUserFromCookie();

    let whereClause: any = {};

    if (!currentUser) {
      // Public: hanya published
      whereClause = { published: true };
    } else if (currentUser.role !== "ADMIN" && currentUser.role !== "MENTOR") {
      // Pelanggan: published + draft milik sendiri (jika ada)
      whereClause = {
        OR: [{ published: true }, { authorId: currentUser.id }],
      };
    }
    // Admin & Mentor: lihat semua (tidak perlu where clause)

    const articles = await prisma.article.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Gagal mengambil artikel" },
      { status: 500 },
    );
  }
}

// POST - Create new article
export async function POST(req: NextRequest) {
  try {
    // Cek autentikasi
    const user = await getUserFromCookie();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    // Cek role - hanya ADMIN dan MENTOR yang bisa membuat artikel
    if (user.role !== "ADMIN" && user.role !== "MENTOR") {
      return NextResponse.json(
        {
          error:
            "Forbidden - Hanya Admin dan Mentor yang dapat membuat artikel",
        },
        { status: 403 },
      );
    }

    // Parse body
    const body = await req.json();
    const { title, content, thumbnail, published } = body;

    // Validasi required fields
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Judul artikel wajib diisi" },
        { status: 400 },
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Konten artikel wajib diisi" },
        { status: 400 },
      );
    }

    // Buat artikel baru
    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        thumbnail: thumbnail || null,
        published: published ?? false,
        authorId: user.id,
        viewCount: 0,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Artikel berhasil dibuat",
        article,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Gagal membuat artikel" },
      { status: 500 },
    );
  }
}

// PUT - Update article
export async function PUT(req: NextRequest) {
  try {
    // Cek autentikasi
    const user = await getUserFromCookie();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    // Parse body
    const body = await req.json();
    const { id, title, content, thumbnail, published } = body;

    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { error: "ID artikel wajib diisi" },
        { status: 400 },
      );
    }

    // Cek apakah artikel exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }

    // Cek permission: hanya author sendiri atau ADMIN yang bisa update
    if (existingArticle.authorId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Anda hanya dapat mengedit artikel sendiri" },
        { status: 403 },
      );
    }

    // Validasi field jika diisi
    if (title !== undefined && !title.trim()) {
      return NextResponse.json(
        { error: "Judul artikel tidak boleh kosong" },
        { status: 400 },
      );
    }

    if (content !== undefined && !content.trim()) {
      return NextResponse.json(
        { error: "Konten artikel tidak boleh kosong" },
        { status: 400 },
      );
    }

    // Update artikel
    const article = await prisma.article.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : undefined,
        content: content !== undefined ? content.trim() : undefined,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        published: published !== undefined ? published : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Artikel berhasil diperbarui",
      article,
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui artikel" },
      { status: 500 },
    );
  }
}

// DELETE - Delete article
export async function DELETE(req: NextRequest) {
  try {
    // Cek autentikasi
    const user = await getUserFromCookie();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    // Ambil ID dari query params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID artikel wajib diisi" },
        { status: 400 },
      );
    }

    // Cek apakah artikel exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }

    // Cek permission: hanya author sendiri atau ADMIN yang bisa delete
    if (existingArticle.authorId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Anda hanya dapat menghapus artikel sendiri" },
        { status: 403 },
      );
    }

    // Hapus artikel
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Artikel berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Gagal menghapus artikel" },
      { status: 500 },
    );
  }
}
