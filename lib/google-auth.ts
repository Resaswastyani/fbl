// lib/google-auth.ts
import { prisma } from "@/server/db";

interface GoogleUserInfo {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  verified_email: boolean;
}

export async function getGoogleUserInfo(
  accessToken: string,
): Promise<GoogleUserInfo> {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Google user info");
  }

  return response.json();
}

export async function findOrCreateGoogleUser(googleUser: GoogleUserInfo) {
  // Cek apakah user sudah ada dengan Google account
  let account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: googleUser.id,
      },
    },
    include: {
      user: true,
    },
  });

  if (account) {
    // Update user info jika ada perubahan
    const updatedUser = await prisma.user.update({
      where: { id: account.user.id },
      data: {
        name: googleUser.name || account.user.name,
        image: googleUser.picture || account.user.image,
        emailVerified: googleUser.verified_email
          ? new Date()
          : account.user.emailVerified,
      },
    });
    return updatedUser;
  }

  // Cek apakah email sudah terdaftar dengan metode lain (email/password)
  const existingUser = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  if (existingUser) {
    // Link Google account ke user existing
    await prisma.account.create({
      data: {
        userId: existingUser.id,
        type: "oauth",
        provider: "google",
        providerAccountId: googleUser.id,
      },
    });

    // Update user info
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name: googleUser.name || existingUser.name,
        image: googleUser.picture || existingUser.image,
        emailVerified: googleUser.verified_email
          ? new Date()
          : existingUser.emailVerified,
      },
    });
    return updatedUser;
  }

  // Buat user baru
  const newUser = await prisma.user.create({
    data: {
      email: googleUser.email,
      name: googleUser.name,
      image: googleUser.picture,
      emailVerified: googleUser.verified_email ? new Date() : null,
      role: "PELANGGAN",
      accounts: {
        create: {
          type: "oauth",
          provider: "google",
          providerAccountId: googleUser.id,
        },
      },
    },
  });

  return newUser;
}
