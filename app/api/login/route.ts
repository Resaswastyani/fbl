// // app/api/auth/login/route.ts   ← PASTIKAN PATH INI BENAR!

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/server/db";  // ← sesuaikan dengan lokasi db.ts kamu
// import bcrypt from "bcrypt";         // gunakan bcryptjs (lebih aman di Next.js)
// import { sign } from "jsonwebtoken";   // gunakan jsonwebtoken (bukan jwt)

// // Pastikan ada di .env
// const JWT_SECRET = process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { email, password } = body;

//     // Validasi input
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email dan password wajib diisi" },
//         { status: 400 }
//       );
//     }

//     // Cari user (email case-insensitive)
//     const user = await prisma.user.findUnique({
//       where: { email: email.toLowerCase() },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         role: true,
//         password: true, // wajib di-select kalau mau compare
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Email atau password salah" },
//         { status: 401 }
//       );
//     }

//     // Cek password
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return NextResponse.json(
//         { error: "Email atau password salah" },
//         { status: 401 }
//       );
//     }

//     // Buat JWT token
//     const token = sign(
//       {
//         userId: user.id,
//         email: user.email,
//         role: user.role,
//       },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // Response sukses + set cookie httpOnly
//     const response = NextResponse.json(
//       {
//         success: true,
//         message: "Login berhasil",
//         user: {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         },
//       },
//       { status: 200 }
//     );

//     // Set cookie session (httpOnly, secure di production)
//     response.cookies.set({
//       name: "session",
//       value: token,
//       httpOnly: true,
//       secure: false, // process.env.NODE_ENV === "production" ? true :
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7, // 7 hari
//       sameSite: "lax",
//     });

//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "Terjadi kesalahan server" },
//       { status: 500 }
//     );
//   }
// }

// // Optional: tambah GET kalau mau cek status login
// export async function GET() {
//   return NextResponse.json({ message: "Login API aktif" });
// }
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

// PENTING: Harus sama dengan JWT_SECRET di get-user.ts
const JWT_SECRET =
  process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    // Cari user (email case-insensitive)
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 },
      );
    }

    // Cek password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 },
      );
    }

    // Buat JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Response sukses + set cookie httpOnly
    const response = NextResponse.json(
      {
        success: true,
        message: "Login berhasil",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 },
    );

    // Set cookie session (httpOnly, secure di production)
    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// Optional: tambah GET kalau mau cek status login
export async function GET() {
  return NextResponse.json({ message: "Login API aktif" });
}
