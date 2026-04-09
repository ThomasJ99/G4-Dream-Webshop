"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { URLSearchParams } from "url";
import { updateProduct } from "../db/products-db";

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
