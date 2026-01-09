import { NextResponse } from "next/server";
import { Snap } from "midtrans-client"; // <= PERBAIKAN PENTING

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, amount } = body;

    if (!plan || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
    const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
    const IS_PRODUCTION = process.env.MIDTRANS_ENVIRONMENT === "production";

    console.log("ENV CHECK:", {
      server: SERVER_KEY,
      client: CLIENT_KEY,
      env: process.env.MIDTRANS_ENVIRONMENT,
    });

    const snap = new Snap({
      isProduction: IS_PRODUCTION,
      serverKey: SERVER_KEY!,
      clientKey: CLIENT_KEY!,
    });

    const orderId = `ORDER-${Date.now()}`;

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
          name: `${plan} Bundle`,
        },
      ],
      customer_details: {
        first_name: "Guest",
        email: "guest@example.com",
      },
      credit_card: {
        secure: true,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err: any) {
    console.error("MIDTRANS ERROR:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
