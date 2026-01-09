import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ganti-dulu-secretnya";

export async function getUserFromCookie() {
  // WAJIB pakai await karena cookies() dianggap Promise
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
      iat: number;
      exp: number;
    };

    return decoded;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}
