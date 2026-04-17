import { cookies } from "next/headers";
import { API_URL } from "../config";
import type { CartItem } from "../types";

export async function getCartItemsByIdParams(
  params: string,
): Promise<CartItem[]> {
  try {
    const response = await fetch(`${API_URL}/api/cart_items/?${params}`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Cart items not found");
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.cartItems;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch cart items");
  }
}

export async function getCart() {
  try {
    const response = await fetch(`${API_URL}/api/carts`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function createCart() {
  try {
    const response = await fetch(`${API_URL}/api/carts`, {
      method: "POST",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
