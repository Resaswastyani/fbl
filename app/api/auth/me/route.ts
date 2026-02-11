// import { NextRequest, NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";
// import { prisma } from "@/server/db";

// const JWT_SECRET =
//   process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get("session")?.value;

//     if (!token) {
//       return new NextResponse(JSON.stringify({ user: null }), {
//         status: 401,
//         headers: {
//           "Content-Type": "application/json",
//           "Cache-Control":
//             "no-store, no-cache, must-revalidate, proxy-revalidate",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//       });
//     }

//     const decoded: any = verify(token, JWT_SECRET);

//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//       select: { id: true, name: true, email: true, role: true },
//     });

//     if (!user) {
//       return new NextResponse(JSON.stringify({ user: null }), {
//         status: 401,
//         headers: {
//           "Content-Type": "application/json",
//           "Cache-Control":
//             "no-store, no-cache, must-revalidate, proxy-revalidate",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//       });
//     }

//     return new NextResponse(JSON.stringify({ user }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate, proxy-revalidate",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//     });
//   } catch (error) {
//     console.error("Decode token error:", error);
//     return new NextResponse(JSON.stringify({ user: null }), {
//       status: 401,
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate, proxy-revalidate",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//     });
//   }
// }

// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { prisma } from "@/server/db";

const JWT_SECRET =
  process.env.JWT_SECRET || "ganti-dengan-rahasia-yang-panjang-dan-acak";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value;

    if (!token) {
      return new NextResponse(JSON.stringify({ user: null }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }

    const decoded: any = verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        password: true, // Include untuk cek apakah Google user
        createdAt: true,
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ user: null }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }

    // Transform response: hapus password, tambah flag isGoogleUser
    const { password, accounts, ...userWithoutPassword } = user;

    const responseUser = {
      ...userWithoutPassword,
      isGoogleUser: !password && accounts.length > 0,
      providers: accounts.map((a) => a.provider),
    };

    return new NextResponse(JSON.stringify({ user: responseUser }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Decode token error:", error);
    return new NextResponse(JSON.stringify({ user: null }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
}
