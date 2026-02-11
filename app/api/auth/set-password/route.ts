// app/api/auth/set-password/route.ts
// Untuk Google user yang ingin menambahkan password manual
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";
import bcrypt from "bcrypt";

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password baru minimal 6 karakter" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user dengan password baru
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message:
        "Password berhasil ditambahkan. Anda sekarang bisa login dengan email dan password.",
    });
  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan password" },
      { status: 500 },
    );
  }
}
