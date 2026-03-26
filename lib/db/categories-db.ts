import { API_URL } from "../config";
import type { Category } from "../types";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`, {
    method: "GET",
  });

  if (!response.ok) {
    console.log("Failed to fetch categories.");
    return [];
  }

  const data = await response.json();
  return data;
}
