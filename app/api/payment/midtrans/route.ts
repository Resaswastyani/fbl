// import { NextResponse } from "next/server";
// import { Snap } from "midtrans-client"; // <= PERBAIKAN PENTING

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { plan, amount } = body;

//     if (!plan || !amount) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 },
//       );
//     }

//     const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
//     const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
//     const IS_PRODUCTION = process.env.MIDTRANS_ENVIRONMENT === "production";

//     console.log("ENV CHECK:", {
//       server: SERVER_KEY,
//       client: CLIENT_KEY,
//       env: process.env.MIDTRANS_ENVIRONMENT,
//     });

//     const snap = new Snap({
//       isProduction: IS_PRODUCTION,
//       serverKey: SERVER_KEY!,
//       clientKey: CLIENT_KEY!,
//     });

//     const orderId = `ORDER-${Date.now()}`;

//     const parameter = {
//       transaction_details: {
//         order_id: orderId,
//         gross_amount: Number(amount),
//       },
//       item_details: [
//         {
//           id: plan,
//           price: Number(amount),
//           quantity: 1,
//           name: `${plan} Bundle`,
//         },
//       ],
//       customer_details: {
//         first_name: "Guest",
//         email: "guest@example.com",
//       },
//       credit_card: {
//         secure: true,
//       },
//     };

//     const transaction = await snap.createTransaction(parameter);

//     return NextResponse.json({
//       success: true,
//       token: transaction.token,
//       redirect_url: transaction.redirect_url,
//     });
//   } catch (err: any) {
//     console.error("MIDTRANS ERROR:", err);
//     return NextResponse.json(
//       { error: "Server error", details: err.message },
//       { status: 500 },
//     );
//   }
// }

// app/api/payment/midtrans/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Snap } from "midtrans-client";
import { getUserFromCookie } from "@/lib/get-user";

export async function POST(req: NextRequest) {
  try {
    // Cek authentication
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { plan, amount, isBundle, courseIds, courseNames } = body;

    if (!plan || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
    const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const IS_PRODUCTION = process.env.MIDTRANS_ENVIRONMENT === "production";

    if (!SERVER_KEY || !CLIENT_KEY) {
      console.error("Midtrans credentials missing");
      return NextResponse.json(
        { error: "Payment configuration error" },
        { status: 500 },
      );
    }

    const snap = new Snap({
      isProduction: IS_PRODUCTION,
      serverKey: SERVER_KEY,
      clientKey: CLIENT_KEY,
    });

    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(amount),
      },
      item_details: [
        {
          id: plan,
          price: Number(amount),
          quantity: 1,
          name: isBundle ? "Ultimate Trading Bundle" : courseNames?.[0] || plan,
        },
      ],
      customer_details: {
        first_name: user.name || "Customer",
        email: user.email || "customer@example.com",
        phone: "+6281234567890",
      },
      credit_card: {
        secure: true,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/student/dashboard?purchase=true`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId,
    });
  } catch (err: any) {
    console.error("MIDTRANS ERROR:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 },
    );
  }
}
