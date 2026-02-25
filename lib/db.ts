import { API_URL } from "@/lib/config";
import type { ProductFormData, ProductsResponse } from "@/lib/types";
import "server-only";

export async function getInventoryProducts() {
  const response = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.products || [];
}

export async function addProduct(newProduct: ProductFormData) {
  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  
  // const data = await res.json();
  // console.log("Added product:", data); 
  
  return res;
}
