// app/api/cart/route.ts

import { NextResponse } from "next/server";
import prisma from "@/server/db";
import jwt from "jsonwebtoken";

// ----------------------------------------------------------------------
// GET USER FROM COOKIE
// ----------------------------------------------------------------------
function getUserFromRequest(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) return null;

    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    return decoded.userId;
  } catch (e) {
    return null;
  }
}

// ----------------------------------------------------------------------
// GET CART
// ----------------------------------------------------------------------
export async function GET(req: Request) {
  const userId = getUserFromRequest(req);
  if (!userId) return NextResponse.json({ cart: [] });

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return NextResponse.json(cart ?? { items: [] });
}

// ----------------------------------------------------------------------
// POST → Add / Update Product in Cart
// ----------------------------------------------------------------------
export async function POST(req: Request) {
  const userId = getUserFromRequest(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId, quantity } = await req.json();

  let cart = await prisma.cart.findUnique({ where: { userId } });

  // create cart if not exist
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  // check cart item
  const item = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (item) {
    // update qty
    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity: item.quantity + quantity },
    });
  } else {
    // add new item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  return NextResponse.json({ success: true });
}

// ----------------------------------------------------------------------
// PUT → Sync LocalStorage Cart to Database After Login
// ----------------------------------------------------------------------
export async function PUT(req: Request) {
  const userId = getUserFromRequest(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json(); // [{productId, quantity}]

  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  // clear all first (sync clean)
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  // recreate items
  for (const item of items) {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
      },
    });
  }

  return NextResponse.json({ success: true });
}

// ----------------------------------------------------------------------
// DELETE → Remove item or clear all
// ----------------------------------------------------------------------
export async function DELETE(req: Request) {
  const userId = getUserFromRequest(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return NextResponse.json({ success: true });

  if (productId) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
  } else {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }

  return NextResponse.json({ success: true });
}
