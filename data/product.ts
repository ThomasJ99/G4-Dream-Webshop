import type { ProductsResponse } from "@/lib/types";

export async function getProducts(
  limit = "5",
  page = "1",
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    _limit: limit.toString(),
    _page: page.toString(),
  });

  try {
    const response = await fetch(`/products/?${params}`).then((res) =>
      res.json(),
    );

    return await response;
  } catch {
    throw new Error("Api is down eh");
  }
}
