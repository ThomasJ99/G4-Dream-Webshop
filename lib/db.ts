import { API_URL } from "@/lib/config";
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