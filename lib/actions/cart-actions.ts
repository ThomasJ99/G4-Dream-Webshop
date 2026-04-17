"use server";
import { refresh, revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { supabase } from "@/supabaseClient";
import { createCart } from "../db/carts-db";

export const getCartAction = async () => {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cartId");
  let cartId = cartCookie?.value;

  if (!cartCookie) {
    const cart = await createCart();
    cookieStore.set("cartId", cart.id);
    cartId = cart.id;
  }
  return cartId;
  //   cookieStore.set("cartId", "1", {
  //     httpOnly: true,
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 30, // 30 days
  //   });
};

export async function addToCart(formData: FormData) {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cartId");
  let cartId = cartCookie?.value;

  if (!cartCookie) {
    const cart = await createCart();
    cookieStore.set("cartId", cart.id);
    cartId = cart.id;
  }

  const product_id = formData.get("product_id") as string;
  //const user_id = 'demo-user'; // byt mot auth senare
  const cart_id = cartId;

  // 1. Kolla om produkten redan finns
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart_id)
    .eq("product_id", product_id)
    .single();

  if (existingItem) {
    // 2. Uppdatera quantity
    await supabase
      .from("cart_items")
      .update({
        quantity: existingItem.quantity + 1,
      })
      .eq("id", existingItem.id);
  }
  // else if(user_id) {await supabase.from("cart_items").insert({
  //     user_id,
  //     product_id,
  //     quantity: 1,
  //   });}
  else {
    // 3. Skapa ny rad
    await supabase.from("cart_items").insert({
      cart_id,
      product_id,
      quantity: 1,
    });
  }

  refresh();
}

export async function updateQuantity(productId: number, newQuantity: number) {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cartId");
  const cartId = cartCookie?.value;

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    // 2. Uppdatera quantity
    await supabase
      .from("cart_items")
      .update({
        quantity: newQuantity,
      })
      .eq("id", existingItem.id);
  }

  refresh();
}

export async function removeCartItem(productId: number) {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cartId");
  const cartId = cartCookie?.value;

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId)
    .eq("product_id", productId);

  refresh();
}
