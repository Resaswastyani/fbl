// app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { getGoogleUserInfo, findOrCreateGoogleUser } from "@/lib/google-auth";

const JWT_SECRET =
  process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state"); // Untuk menyimpan cart data

    if (error) {
      console.error("Google OAuth error:", error);
      return NextResponse.redirect(
        new URL("/login?error=google_auth_failed", request.url),
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/login?error=no_code", request.url),
      );
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", errorData);
      return NextResponse.redirect(
        new URL("/login?error=token_exchange_failed", request.url),
      );
    }

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(access_token);

    // Find or create user in database
    const user = await findOrCreateGoogleUser(googleUser);

    // Create JWT token
    const jwtToken = sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Cek apakah user baru atau sudah ada
    const isNewUser =
      user.createdAt &&
      new Date().getTime() - new Date(user.createdAt).getTime() < 60000; // 1 menit

    // Redirect berdasarkan role
    let redirectUrl = "/student/dashboard";
    if (user.role !== "PELANGGAN") {
      redirectUrl = "/dashboard";
    }

    // Tambahkan parameter untuk trigger sync cart
    if (isNewUser) {
      redirectUrl += "?new_user=true&sync_cart=true";
    } else {
      redirectUrl += "?sync_cart=true";
    }

    // Set cookie and redirect
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));

    response.cookies.set({
      name: "session",
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Google callback error:", error);
    return NextResponse.redirect(
      new URL("/login?error=server_error", request.url),
    );
  }
}
