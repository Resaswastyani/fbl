// app/api/auth/check-email/route.ts
// Untuk cek apakah email sudah terdaftar (berguna di frontend)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        accounts: {
          select: { provider: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ exists: false });
    }

    const isGoogleUser = user.accounts.some((a) => a.provider === "google");
    const hasPassword = await prisma.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    });

    return NextResponse.json({
      exists: true,
      isGoogleUser: isGoogleUser && !hasPassword?.password,
      providers: user.accounts.map((a) => a.provider),
    });
  } catch (error) {
    console.error("Check email error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
