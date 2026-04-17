import { API_URL } from "../config";

export async function getFavorites() {
  const response = await fetch(`${API_URL}/api/favorites`, {
    method: "GET",
  });

  if (!response.ok) {
    console.error("Failed to fetch favorites.");
    return [];
  }

  return response.json();
}
