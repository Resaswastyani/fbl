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

      const currentUser = await getUserFromCookie();
      if (currentUser?.id !== article.authorId) {
        await prisma.article.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
        });
      }

      return NextResponse.json({ article });
    }

    if (slug) {
      const article = await prisma.findFirst({
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

    const currentUser = await getUserFromCookie();
    let whereClause: any = {};

    if (!currentUser) {
      whereClause = { published: true };
    } else if (currentUser.role !== "ADMIN" && currentUser.role !== "MENTOR") {
      whereClause = {
        OR: [{ published: true }, { authorId: currentUser.id }],
      };
    }

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
    const user = await getUserFromCookie();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    if (user.role !== "ADMIN" && user.role !== "MENTOR") {
      return NextResponse.json(
        {
          error:
            "Forbidden - Hanya Admin dan Mentor yang dapat membuat artikel",
        },
        { status: 403 },
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { title, title_en, content, content_en, thumbnail, published } = body;

    // Validasi required fields
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Judul artikel wajib diisi" },
        { status: 400 },
      );
    }

    if (title.length > 255) {
      return NextResponse.json(
        { error: "Judul terlalu panjang (maksimal 255 karakter)" },
        { status: 400 },
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Konten artikel wajib diisi" },
        { status: 400 },
      );
    }

    // ✅ HAPUS VALIDASI PANJANG THUMBNAIL - URL sekarang pendek
    // Thumbnail bisa null, URL disk (/uploads/...), atau base64 untuk konten lama
    let thumbnailUrl = thumbnail || null;

    // Jika thumbnail adalah base64 yang terlalu panjang, reject
    if (
      thumbnailUrl &&
      thumbnailUrl.startsWith("data:image") &&
      thumbnailUrl.length > 500
    ) {
      return NextResponse.json(
        {
          error: "Thumbnail terlalu besar",
          message:
            "Gunakan fitur upload untuk thumbnail, jangan paste base64 langsung",
        },
        { status: 400 },
      );
    }

    // ID auto-generate oleh Prisma CUID
    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        title_en: title_en ? title_en.trim() : null,
        content: content.trim(),
        content_en: content_en ? content_en.trim() : null,
        thumbnail: thumbnailUrl,
        published: published === true,
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
      {
        error: "Gagal membuat artikel",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// PUT - Update article
export async function PUT(req: NextRequest) {
  try {
    const user = await getUserFromCookie();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { id, title, title_en, content, content_en, thumbnail, published } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID artikel wajib diisi" },
        { status: 400 },
      );
    }

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }

    if (existingArticle.authorId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Anda hanya dapat mengedit artikel sendiri" },
        { status: 403 },
      );
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return NextResponse.json(
          { error: "Judul artikel tidak boleh kosong" },
          { status: 400 },
        );
      }
      if (title.length > 255) {
        return NextResponse.json(
          { error: "Judul terlalu panjang (maksimal 255 karakter)" },
          { status: 400 },
        );
      }
    }

    if (content !== undefined && !content.trim()) {
      return NextResponse.json(
        { error: "Konten artikel tidak boleh kosong" },
        { status: 400 },
      );
    }

    // ✅ Validasi thumbnail untuk update
    let thumbnailUrl = thumbnail;
    if (thumbnail !== undefined && thumbnail !== null) {
      if (thumbnail.startsWith("data:image") && thumbnail.length > 500) {
        return NextResponse.json(
          {
            error: "Thumbnail terlalu besar",
            message: "Gunakan fitur upload untuk thumbnail",
          },
          { status: 400 },
        );
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : undefined,
        title_en: title_en !== undefined ? (title_en ? title_en.trim() : null) : undefined,
        content: content !== undefined ? content.trim() : undefined,
        content_en: content_en !== undefined ? (content_en ? content_en.trim() : null) : undefined,
        thumbnail: thumbnailUrl !== undefined ? thumbnailUrl : undefined,
        published: published !== undefined ? published === true : undefined,
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
      {
        error: "Gagal memperbarui artikel",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete article
export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromCookie();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID artikel wajib diisi" },
        { status: 400 },
      );
    }

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }

    if (existingArticle.authorId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Anda hanya dapat menghapus artikel sendiri" },
        { status: 403 },
      );
    }

    // ✅ Opsional: Hapus file thumbnail dari disk jika ada
    if (
      existingArticle.thumbnail &&
      existingArticle.thumbnail.startsWith("/uploads/")
    ) {
      try {
        const fs = await import("fs/promises");
        const path = join(process.cwd(), "public", existingArticle.thumbnail);
        await fs.unlink(path);
      } catch (e) {
        console.error("Failed to delete thumbnail file:", e);
        // Continue anyway, jangan block delete article
      }
    }

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
