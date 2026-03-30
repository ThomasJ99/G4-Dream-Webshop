"use server";
import { cookies } from "next/headers";
import { createCart } from "../db/carts-db";

export const getCartAction = async () => {
  console.log("hej");

  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cartId");

  console.log(cartCookie);
  if (!cartCookie) {
    const cart = await createCart();
    cookieStore.set("cartId", cart.id);
    console.log(cart);
  }

  //   cookieStore.set("cartId", "1", {
  //     httpOnly: true,
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 30, // 30 days
  //   });
};
