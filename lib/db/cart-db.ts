import { API_URL } from "../config";
import type { CartItem } from "../types";

export async function getCartItemsByUserIdOrCartId(
  id: string,
): Promise<CartItem[]> {
  console.log(id);
  try {
    const response = await fetch(`${API_URL}/api/cart/?_userId=${id}`, {
      method: "GET",
      cache: "force-cache",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.cartItems;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch product");
  }
}
