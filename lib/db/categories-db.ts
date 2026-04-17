import type { Category } from "../types";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`/api/categories`, {
    method: "GET",
  });

  if (!response.ok) {
    console.log("Failed to fetch categories.");
    return [];
  }

  const data = await response.json();
  return data;
}
