import type { ProductFormData } from "@/lib/types";
import "server-only";

//#region GET

export async function getInventoryProducts() {
  const response = await fetch(`/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.products || [];
}

//#endregion

//#region POST

export async function addProduct(newProduct: ProductFormData) {
  const res = await fetch(`/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  // const data = await res.json();
  // console.log("Added product:", data);

  return res;
}

export async function updateProductById(id: string, product: ProductFormData) {
  const res = await fetch(`/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return res;
}

//#endregion
