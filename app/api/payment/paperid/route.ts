import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, amount, userEmail, userName } = body;

    // ---------------------------------------------------
    // 0. Validate Body
    // ---------------------------------------------------
    if (!plan || !amount || !userEmail || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------
    // 1. API Credentials (.env)
    // ---------------------------------------------------
    const API_KEY = process.env.PAPERID_API_KEY;
    const BASE_URL = "https://api.paper.id/api/v1";

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Missing PAPERID_API_KEY in environment variables" },
        { status: 500 }
      );
    }

    // ---------------------------------------------------
    // 2. Prepare Payload
    // ---------------------------------------------------
    const payload = {
      invoice: {
        invoice_number: `INV-${Date.now()}`,
        currency: "IDR",
        customer_email: userEmail,
        customer_name: userName,
        items: [
          {
            name: plan,
            qty: 1,
            price: amount,
          },
        ],
      },
    };

    // ---------------------------------------------------
    // 3. Send Request to Paper.id
    // ---------------------------------------------------
    const paperResponse = await fetch(`${BASE_URL}/invoice/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const result = await paperResponse.json();

    // ---------------------------------------------------
    // 4. Handle Paper.id API Errors
    // ---------------------------------------------------
    if (!paperResponse.ok) {
      return NextResponse.json(
        {
          error:
            result?.message ||
            result?.errors?.[0] ||
            "Paper.id API error",
          raw: result,
        },
        { status: 400 }
      );
    }

    if (!result?.data?.payment_url) {
      return NextResponse.json(
        { error: "Payment URL not returned by Paper.id", raw: result },
        { status: 500 }
      );
    }

    // ---------------------------------------------------
    // 5. Success Response
    // ---------------------------------------------------
    return NextResponse.json({
      success: true,
      invoice_id: result.data.invoice_id,
      payment_url: result.data.payment_url,
      raw: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        detail: err?.message,
      },
      { status: 500 }
    );
  }
}
