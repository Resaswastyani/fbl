import { prisma } from "./prisma";
import { getUserFromCookie } from "./get-user";

/**
 * Mendapatkan cart user yang sedang login
 */
export async function getUserCart() {
  const user = await getUserFromCookie();
  if (!user) return null;

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

  return cart;
}

/**
 * Menambah item ke cart
 */
export async function addToCart(productId: string, quantity: number = 1) {
  const user = await getUserFromCookie();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Dapatkan atau buat cart
  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
    });
  }

  // Cek apakah item sudah ada
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingItem) {
    // Update quantity
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    // Buat item baru
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  // Update timestamp
  await prisma.cart.update({
    where: { id: cart.id },
    data: { updatedAt: new Date() },
  });

  return await getUserCart();
}

/**
 * Menghapus item dari cart
 */
export async function removeFromCart(productId: string) {
  const user = await getUserFromCookie();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  return await getUserCart();
}

/**
 * Mengosongkan cart
 */
export async function clearCart() {
  const user = await getUserFromCookie();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return await getUserCart();
}

/**
 * Menghitung total harga cart
 */
export async function calculateCartTotal() {
  const cart = await getUserCart();
  if (!cart) return 0;

  return cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

/**
 * Menghitung jumlah item di cart
 */
export async function getCartItemCount() {
  const cart = await getUserCart();
  if (!cart) return 0;

  return cart.items.reduce((count, item) => count + item.quantity, 0);
}
