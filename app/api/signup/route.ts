import { NextResponse } from "next/server";
import { prisma } from "@/server/db"; // gunakan singleton
import bcrypt from "bcrypt";

export const runtime = "nodejs"; // Prisma hanya jalan di Node runtime

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    // Cek user existing
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah digunakan." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PELANGGAN",
      },
    });

    return NextResponse.json(
      { message: "Signup berhasil", user },
      { status: 201 }
    );
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
