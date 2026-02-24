import { API_URL } from "@/lib/config";
import type { ProductFormData, ProductsResponse } from "@/lib/types";
import "server-only";

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
