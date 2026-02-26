"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProduct, updateProductById } from "@/lib/db";
import type { ProductFormData } from "@/lib/types";
import { API_URL } from "@/lib/config";


export type ActionState = {
  message?: string;
  data: unknown;
  errors?: Record<string, string[]>;
  timestamp: number;
} | null;


export async function addProductActionState(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;


  const newProduct: ProductFormData = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  if (!/^https?:\/\/.+/.test(newProduct.thumbnail)) {
    const state: ActionState = {
      data: newProduct,
      errors: { thumbnail: ["Please enter a valid image URL starting with http or https"] },
      timestamp: Date.now(),
    };
    return state;
  }

  if (newProduct.price < 10 || newProduct.price > 100_000) {
    return {
      data: newProduct,
      errors: { price: ["Price must be between 10 and 100,000"] },
      timestamp: Date.now(),
    };
  }

  //   if (title.length < 3 || title.length > 20) {
  //   return {
  //     message: "Title must be between 3 and 20 characters",
  //     data: newProduct,
  //     timestamp: Date.now(),
  //   };
  // }

  const res = await addProduct(newProduct);
  if (!res.ok) {
    return {
      message: "Something went wrong... ",
      // data: formData,
      data: newProduct,
      timestamp: Date.now(),
    };
  }

  revalidatePath("/");
  redirect("/?status=success");
}

export async function updateProduct(formData: FormData) {
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

  const res = await updateProductById(id, newProduct);

  const data = await res.json();
  // we can do things here to see if we have a success or not later on
  console.log(data);

  revalidatePath("/");
  redirect("/?status=updated");
}


/* Delete product */

export async function deleteProductActionState(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = formData.get("id") as string;
  console.log("Deleting product with id:", id);

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  console.log("Response status:", res.status);

  if (!res.ok) {
    return {
      message: "Failed to delete product",
      data: null,
      timestamp: Date.now(),
    };
  }

  revalidatePath("/", "layout");

  console.log("Returning state:", { message: "Product deleted successfully" });
  return {
    message: "Product deleted successfully",
    data: null,
    timestamp: Date.now(),
  };
}