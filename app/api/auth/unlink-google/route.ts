// app/api/auth/unlink-google/route.ts
// Untuk menghapus koneksi Google (harus punya password dulu)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

export async function DELETE(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cek apakah user punya password (tidak boleh unlink Google jika tidak ada password)
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    });

    if (!currentUser?.password) {
      return NextResponse.json(
        {
          error:
            "Anda harus menambahkan password terlebih dahulu sebelum menghapus koneksi Google.",
        },
        { status: 400 },
      );
    }

    // Hapus Google account
    await prisma.account.deleteMany({
      where: {
        userId: user.id,
        provider: "google",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Koneksi Google berhasil dihapus.",
    });
  } catch (error) {
    console.error("Unlink Google error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus koneksi Google" },
      { status: 500 },
    );
  }
}
