export async function getFavorites() {
  const response = await fetch(`/api/favorites`, {
    method: "GET",
  });

  if (!response.ok) {
    console.error("Failed to fetch favorites.");
    return [];
  }

  return response.json();
}
