import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserFromCookie } from "@/lib/get-user";

// POST - Membuat order baru (setelah pembayaran berhasil)
export async function POST(request: NextRequest) {
  console.log("========== ORDER API CALLED ==========");

  try {
    // 1. Cek authentication
    const user = await getUserFromCookie();
    console.log(
      "User from cookie:",
      user ? { id: user.id, email: user.email } : "null",
    );

    if (!user) {
      console.error("ERROR: User not authenticated");
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    // 2. Parse body
    let body;
    try {
      body = await request.json();
      console.log("Request body:", JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error("ERROR: Failed to parse JSON body:", parseError);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const {
      items,
      totalAmount,
      transactionId,
      paymentMethod = "midtrans",
      status = "PAID",
    } = body;

    // 3. Validasi data
    console.log("Validating data...");

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("ERROR: Invalid items", items);
      return NextResponse.json(
        { error: "Invalid order items - must be non-empty array" },
        { status: 400 },
      );
    }

    if (totalAmount === undefined || totalAmount === null) {
      console.error("ERROR: totalAmount is missing");
      return NextResponse.json(
        { error: "totalAmount is required" },
        { status: 400 },
      );
    }

    if (typeof totalAmount !== "number" || totalAmount < 0) {
      console.error("ERROR: Invalid totalAmount:", totalAmount);
      return NextResponse.json(
        { error: "totalAmount must be a positive number" },
        { status: 400 },
      );
    }

    // 4. Log setiap item
    console.log("Processing items:");
    items.forEach((item: any, index: number) => {
      console.log(`  Item ${index}:`, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        isBundle: item.isBundle,
        courseIds: item.courseIds,
      });
    });

    // 5. Buat order dengan transaction
    console.log("Starting database transaction...");

    const order = await prisma.$transaction(
      async (tx) => {
        // 5a. Buat atau update produk untuk setiap item
        console.log("Step 1: Creating/updating products...");

        for (const item of items) {
          if (!item.id) {
            throw new Error(`Item ${item.name || "unknown"} missing id`);
          }

          const existingProduct = await tx.product.findUnique({
            where: { id: item.id },
          });

          if (!existingProduct) {
            console.log(`  Creating new product: ${item.id}`);

            // Validasi data produk
            const productPrice =
              typeof item.price === "number"
                ? item.price
                : typeof item.price === "string"
                  ? parseFloat(item.price)
                  : 0;

            if (isNaN(productPrice)) {
              throw new Error(
                `Invalid price for item ${item.id}: ${item.price}`,
              );
            }

            await tx.product.create({
              data: {
                id: item.id,
                title: item.name || item.id,
                price: productPrice,
                thumbnail: null,
              },
            });
            console.log(`  Product created: ${item.id}`);
          } else {
            console.log(`  Product already exists: ${item.id}`);

            // Update harga jika berbeda
            const newPrice =
              typeof item.price === "number"
                ? item.price
                : parseFloat(item.price);
            if (!isNaN(newPrice) && existingProduct.price !== newPrice) {
              await tx.product.update({
                where: { id: item.id },
                data: { price: newPrice },
              });
              console.log(`  Product price updated: ${item.id} -> ${newPrice}`);
            }
          }
        }

        // 5b. Buat order
        console.log("Step 2: Creating order...");

        const orderData: any = {
          userId: user.id,
          totalAmount: Number(totalAmount),
          status: status,
          paymentMethod: paymentMethod,
        };

        // Hanya tambahkan transactionId jika ada
        if (transactionId) {
          orderData.transactionId = transactionId;
        }

        console.log("Order data:", orderData);

        const newOrder = await tx.order.create({
          data: {
            ...orderData,
            items: {
              create: items.map((item: any, index: number) => {
                const itemPrice =
                  typeof item.price === "number"
                    ? item.price
                    : typeof item.price === "string"
                      ? parseFloat(item.price)
                      : 0;

                if (isNaN(itemPrice)) {
                  throw new Error(
                    `Invalid price at item ${index}: ${item.price}`,
                  );
                }

                return {
                  productId: item.id,
                  price: itemPrice,
                  quantity: item.quantity || 1,
                };
              }),
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

        console.log("Order created:", newOrder.id);

        // 5c. Buat Enrollment untuk setiap course
        console.log("Step 3: Creating enrollments...");

        for (const item of items) {
          if (
            item.isBundle &&
            item.courseIds &&
            Array.isArray(item.courseIds)
          ) {
            // Bundle: enroll ke semua course
            console.log(
              `  Processing bundle with ${item.courseIds.length} courses`,
            );

            for (const courseId of item.courseIds) {
              console.log(`    Enrolling to course: ${courseId}`);

              await tx.enrollment.upsert({
                where: {
                  userId_courseId: {
                    userId: user.id,
                    courseId: courseId,
                  },
                },
                update: {
                  status: "ACTIVE",
                  lastAccessedAt: new Date(),
                },
                create: {
                  userId: user.id,
                  courseId: courseId,
                  status: "ACTIVE",
                  progress: 0,
                },
              });
            }
          } else {
            // Single course
            console.log(`  Enrolling to single course: ${item.id}`);

            await tx.enrollment.upsert({
              where: {
                userId_courseId: {
                  userId: user.id,
                  courseId: item.id,
                },
              },
              update: {
                status: "ACTIVE",
                lastAccessedAt: new Date(),
              },
              create: {
                userId: user.id,
                courseId: item.id,
                status: "ACTIVE",
                progress: 0,
              },
            });
          }
        }

        // 5d. Hapus cart
        console.log("Step 4: Clearing cart...");

        const cart = await tx.cart.findUnique({
          where: { userId: user.id },
        });

        if (cart) {
          const deletedItems = await tx.cartItem.deleteMany({
            where: { cartId: cart.id },
          });
          console.log(`  Deleted ${deletedItems.count} cart items`);

          await tx.cart.delete({
            where: { id: cart.id },
          });
          console.log("  Cart deleted");
        } else {
          console.log("  No cart found");
        }

        return newOrder;
      },
      {
        // Transaction options
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      },
    );

    console.log("========== ORDER SUCCESS ==========");
    console.log("Order ID:", order.id);
    console.log("Total items:", order.items.length);
    console.log("Total amount:", order.totalAmount);

    return NextResponse.json({
      success: true,
      message: "Order berhasil dibuat",
      order: {
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        itemsCount: order.items.length,
      },
    });
  } catch (error: any) {
    console.error("========== ORDER ERROR ==========");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error meta:", error.meta);
    console.error("Full error:", error);

    // Handle specific Prisma errors
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error: "Duplicate entry - Order可能已经存在",
          details: error.meta?.target,
        },
        { status: 409 },
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error: "Foreign key constraint failed",
          details: error.meta?.field_name,
        },
        { status: 400 },
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: "Failed to create order",
        message: error.message,
        code: error.code,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}

// GET - Mendapatkan semua orders user
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Anda harus login" },
        { status: 401 },
      );
    }

    const url = new URL(request.url);
    const statusFilter = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const where: any = { userId: user.id };
    if (statusFilter) {
      where.status = statusFilter;
    }

    const total = await prisma.order.count({ where });

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
