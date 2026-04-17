"use server";
import { refresh, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { URLSearchParams } from "url";
import { supabase } from "@/supabaseClient";
import { deleteProduct, updateProduct } from "../db/products-db";

export type ActionState = {
  message?: string;
  data: unknown;
  errors?: Record<string, string[]>;
  timestamp: number;
} | null;

export async function updateProductAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  const updateParams = new URLSearchParams({
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    price: formData.get("price") as string,
    description: formData.get("description") as string,
    thumbnail: formData.get("thumbnail") as string,
    categoryId: formData.get("categoryId") as string,
    stock: formData.get("stock") as string,
    brand: formData.get("brand") as string,
  });
  console.log(updateParams.toString());
  const res = await updateProduct(id, updateParams.toString());

  // we can do things here to see if we have a success or not later on

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProductActionState(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = formData.get("id") as string;
  console.log("Deleting product with id:", id);

  const res = await deleteProduct(id);

  console.log("Response status:", res.status);

  if (!res.ok) {
    return {
      message: "Failed to delete product",
      data: null,
      timestamp: Date.now(),
    };
  }

  revalidatePath("/admin", "layout");

  console.log("Returning state:", { message: "Product deleted successfully" });
  return {
    message: "Product deleted successfully",
    data: null,
    timestamp: Date.now(),
  };
}

export async function addToFeaturedProductsById(formData: FormData) {
  const productId = formData.get("product_id") as string;

  const productData = {
    product_id: productId,
  };

  const { data, error } = await supabase
    .from("featured_products")
    .insert([productData])
    .select(`*`);

  console.log("data" + data);
  console.log(error);

  refresh();
}
export async function removeFeaturedProductById(formData: FormData) {
  const productId = formData.get("product_id") as string;

  const { error } = await supabase
    .from("featured_products")
    .delete()
    .eq("product_id", productId);

  refresh();
}
