// import { NextResponse } from "next/server";

// export async function POST() {
//   const res = NextResponse.json({ success: true });

//   res.cookies.set("session", "", {
//     maxAge: 0,
//     path: "/",
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//   });

//   return res;
// }

// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get("redirect") || "/";

  const res = NextResponse.json({ success: true, redirect });

  res.cookies.set("session", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}

// Support GET untuk logout langsung via link
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get("redirect") || "/";

  const res = NextResponse.redirect(new URL(redirect, req.url));

  res.cookies.set("session", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
