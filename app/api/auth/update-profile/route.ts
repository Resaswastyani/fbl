// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/server/db";
// import { getUserFromCookie } from "@/lib/get-user";

// export async function PUT(request: NextRequest) {
//   try {
//     const user = await getUserFromCookie();
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();
//     const { name } = body;

//     if (!name || name.trim().length < 2) {
//       return NextResponse.json(
//         { error: "Nama minimal 2 karakter" },
//         { status: 400 },
//       );
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: user.id },
//       data: { name: name.trim() },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         role: true,
//         createdAt: true,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Profil berhasil diperbarui",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Update profile error:", error);
//     return NextResponse.json(
//       { error: "Gagal memperbarui profil" },
//       { status: 500 },
//     );
//   }
// }

// app/api/auth/update-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Nama minimal 2 karakter" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name.trim(),
        ...(image && { image }), // Update image jika ada
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profil berhasil diperbarui",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui profil" },
      { status: 500 },
    );
  }
}
