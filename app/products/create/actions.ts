"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/config";

export async function addProduct(formData: FormData) {
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

  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  const data = await res.json();
  console.log(data);

  revalidatePath("/");
  redirect("/");
}

// classical approach with getting id from the formData
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

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  const data = await res.json();
  // we can do things here to see if we have a success or not later on
  console.log(data);

  revalidatePath("/");
  redirect("/");
}

// Same as the other update product function, but here we pass the id with bind from the calling component
export async function updateProductBind(id: string, formData: FormData) {
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

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  const data = await res.json();
  console.log(data);

  revalidatePath("/");
  redirect("/");
}

// Here we need to process the formData to get the id
export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  revalidatePath("");
  console.log(data);
}

// In this server action we get the id directly and pass that along to the API
export async function deleteProductBind(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  revalidatePath("");
  console.log(data);
}