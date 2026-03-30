import type { Product, ProductsResponse } from "@/lib/types";
import { API_URL } from "../config";

//#region GET
export async function getProducts(params?: string): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/api/products/?${params}`, {
    method: "GET",
  });

  if (!response.ok) {
    console.log("Failed to fetch products.");
    return { products: [] };
  }

  const data = await response.json();
  return data;
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch product");
  }
}

//#endregion

//#region UPDATE

//#endregion
