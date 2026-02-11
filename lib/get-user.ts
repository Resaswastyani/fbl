// // lib/get-user.ts
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { prisma } from "@/server/db";

// const JWT_SECRET =
//   process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

// export async function getUserFromCookie() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("session")?.value;

//     if (!token) {
//       console.log("No token found in cookies");
//       return null;
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as {
//       userId: string;
//       email: string;
//       role: string;
//       iat: number;
//       exp: number;
//     };

//     // Cek expired
//     const now = Math.floor(Date.now() / 1000);
//     if (decoded.exp < now) {
//       console.log("Token expired");
//       return null;
//     }

//     // Ambil user dari DB
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         role: true,
//         createdAt: true,
//       },
//     });

//     if (!user) {
//       console.log("User not found in DB");
//       return null;
//     }

//     return user;
//   } catch (err) {
//     console.error("JWT decode error:", err);
//     return null;
//   }
// }

// // Helper untuk mendapatkan user ID saja
// export async function getUserIdFromCookie() {
//   const user = await getUserFromCookie();
//   return user?.id || null;
// }

// lib/get-user.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/server/db";

const JWT_SECRET =
  process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

export type UserFromCookie = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: Date;
  isGoogleUser?: boolean;
};

export async function getUserFromCookie(): Promise<UserFromCookie | null> {
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
        image: true,
        password: true,
        createdAt: true,
        accounts: {
          select: { provider: true },
        },
      },
    });

    if (!user) {
      console.log("User not found in DB");
      return null;
    }

    const { password, accounts, ...userData } = user;

    return {
      ...userData,
      isGoogleUser: !password && accounts.length > 0,
    };
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}

// Helper untuk mendapatkan user ID saja
export async function getUserIdFromCookie(): Promise<string | null> {
  const user = await getUserFromCookie();
  return user?.id || null;
}

// Helper untuk cek apakah user adalah admin/mentor
export async function requireAuth(allowedRoles?: string[]) {
  const user = await getUserFromCookie();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}
