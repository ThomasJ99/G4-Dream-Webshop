import { API_URL } from "../config";
import type { Review } from "../types";

export async function getReviewsByProductId(id: string): Promise<Review[]> {
  try {
    const response = await fetch(`${API_URL}/api/reviews/?productId=${id}`, {
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
    return data.reviews;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch product");
  }
}
