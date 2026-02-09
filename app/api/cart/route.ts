// // app/api/cart/route.ts

// import { NextResponse } from "next/server";
// import prisma from "@/server/db";
// import jwt from "jsonwebtoken";

// // ----------------------------------------------------------------------
// // GET USER FROM COOKIE
// // ----------------------------------------------------------------------
// function getUserFromRequest(req: Request) {
//   try {
//     const cookie = req.headers.get("cookie");
//     if (!cookie) return null;

//     const token = cookie
//       .split(";")
//       .find((c) => c.trim().startsWith("token="))
//       ?.split("=")[1];

//     if (!token) return null;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//     };

//     return decoded.userId;
//   } catch (e) {
//     return null;
//   }
// }

// // ----------------------------------------------------------------------
// // GET CART
// // ----------------------------------------------------------------------
// export async function GET(req: Request) {
//   const userId = getUserFromRequest(req);
//   if (!userId) return NextResponse.json({ cart: [] });

//   const cart = await prisma.cart.findUnique({
//     where: { userId },
//     include: {
//       items: {
//         include: { product: true },
//       },
//     },
//   });

//   return NextResponse.json(cart ?? { items: [] });
// }

// // ----------------------------------------------------------------------
// // POST → Add / Update Product in Cart
// // ----------------------------------------------------------------------
// export async function POST(req: Request) {
//   const userId = getUserFromRequest(req);
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { productId, quantity } = await req.json();

//   let cart = await prisma.cart.findUnique({ where: { userId } });

//   // create cart if not exist
//   if (!cart) {
//     cart = await prisma.cart.create({
//       data: { userId },
//     });
//   }

//   // check cart item
//   const item = await prisma.cartItem.findFirst({
//     where: { cartId: cart.id, productId },
//   });

//   if (item) {
//     // update qty
//     await prisma.cartItem.update({
//       where: { id: item.id },
//       data: { quantity: item.quantity + quantity },
//     });
//   } else {
//     // add new item
//     await prisma.cartItem.create({
//       data: {
//         cartId: cart.id,
//         productId,
//         quantity,
//       },
//     });
//   }

//   return NextResponse.json({ success: true });
// }

// // ----------------------------------------------------------------------
// // PUT → Sync LocalStorage Cart to Database After Login
// // ----------------------------------------------------------------------
// export async function PUT(req: Request) {
//   const userId = getUserFromRequest(req);
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { items } = await req.json(); // [{productId, quantity}]

//   let cart = await prisma.cart.findUnique({ where: { userId } });

//   if (!cart) {
//     cart = await prisma.cart.create({
//       data: { userId },
//     });
//   }

//   // clear all first (sync clean)
//   await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

//   // recreate items
//   for (const item of items) {
//     await prisma.cartItem.create({
//       data: {
//         cartId: cart.id,
//         productId: item.productId,
//         quantity: item.quantity,
//       },
//     });
//   }

//   return NextResponse.json({ success: true });
// }

// // ----------------------------------------------------------------------
// // DELETE → Remove item or clear all
// // ----------------------------------------------------------------------
// export async function DELETE(req: Request) {
//   const userId = getUserFromRequest(req);
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { productId } = await req.json();

//   let cart = await prisma.cart.findUnique({ where: { userId } });
//   if (!cart) return NextResponse.json({ success: true });

//   if (productId) {
//     await prisma.cartItem.deleteMany({
//       where: { cartId: cart.id, productId },
//     });
//   } else {
//     await prisma.cartItem.deleteMany({
//       where: { cartId: cart.id },
//     });
//   }

//   return NextResponse.json({ success: true });
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

// GET - Mendapatkan cart user yang sedang login
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    const items = cart.items.map((item) => ({
      id: item.product.id,
      name: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      isBundle: false,
      courseIds: [],
      courseNames: [],
    }));

    return NextResponse.json({
      items,
      count: items.length,
      totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}

// POST - Menambah item ke cart
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const {
      productId,
      quantity = 1,
      price,
      name,
      isBundle = false,
      courseIds = [],
      courseNames = [],
    } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    // Cek atau buat product dengan harga yang benar
    let product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      product = await prisma.product.create({
        data: {
          id: productId,
          title: name || productId,
          price: price || 0,
        },
      });
    } else if (price && product.price !== price) {
      // Update harga jika berbeda
      await prisma.product.update({
        where: { id: productId },
        data: { price: price },
      });
    }

    // Dapatkan atau buat cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
    }

    // Cek apakah item sudah ada di cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity,
        },
      });
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: { updatedAt: new Date() },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const items = updatedCart!.items.map((item) => ({
      id: item.product.id,
      name: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      isBundle: false,
      courseIds: [],
      courseNames: [],
    }));

    return NextResponse.json({
      success: true,
      message: "Item berhasil ditambahkan ke keranjang",
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 },
    );
  }
}

// PUT - Mengupdate cart (sync dari localStorage)
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid cart items" },
        { status: 400 },
      );
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    for (const item of items) {
      let product = await prisma.product.findUnique({
        where: { id: item.id },
      });

      if (!product) {
        await prisma.product.create({
          data: {
            id: item.id,
            title: item.name,
            price: item.price,
          },
        });
      } else if (product.price !== item.price) {
        await prisma.product.update({
          where: { id: product.id },
          data: { price: item.price },
        });
      }

      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.id,
          quantity: item.quantity,
        },
      });
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "Cart berhasil disinkronisasi",
    });
  } catch (error) {
    console.error("Error syncing cart:", error);
    return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 });
  }
}

// DELETE - Menghapus item dari cart atau mengosongkan cart
export async function DELETE(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart tidak ditemukan" },
        { status: 404 },
      );
    }

    if (productId) {
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Item berhasil dihapus dari keranjang",
      });
    } else {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return NextResponse.json({
        success: true,
        message: "Keranjang berhasil dikosongkan",
      });
    }
  } catch (error) {
    console.error("Error deleting from cart:", error);
    return NextResponse.json(
      { error: "Failed to delete from cart" },
      { status: 500 },
    );
  }
}
