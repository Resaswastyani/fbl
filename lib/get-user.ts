// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "ganti-dulu-secretnya";

// export async function getUserFromCookie() {
//   // WAJIB pakai await karena cookies() dianggap Promise
//   const cookieStore = await cookies();

//   const token = cookieStore.get("session")?.value;
//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as {
//       userId: string;
//       email: string;
//       role: string;
//       iat: number;
//       exp: number;
//     };

//     return decoded;
//   } catch (err) {
//     console.error("JWT decode error:", err);
//     return null;
//   }
// }

// lib/get-user.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/server/db";

const JWT_SECRET =
  process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

export async function getUserFromCookie() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      console.log("No token found in cookies");
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
      iat: number;
      exp: number;
    };

    // Cek expired
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      console.log("Token expired");
      return null;
    }

    // Ambil user dari DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      console.log("User not found in DB");
      return null;
    }

    return user;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}

// Helper untuk mendapatkan user ID saja
export async function getUserIdFromCookie() {
  const user = await getUserFromCookie();
  return user?.id || null;
}
