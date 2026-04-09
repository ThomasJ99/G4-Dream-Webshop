import { ProductCard } from "@/components/product-card";
import RemoveFavorite from "@/components/ui/delete-favorite";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/lib/config";
import { getFavorites } from "@/lib/db/favorites-db";

async function getProduct(id: number) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
  return response.json();
}

export default async function Favorites() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // await new Promise(() => {}); // This promise never resolves → loading.tsx stays forever

  const favorites = await getFavorites();
  const products = await Promise.all(
    favorites.map((fav: { product_id: number }) => getProduct(fav.product_id)),
  );

  return (
    <main>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-serif text-2xl sm:text-3xl">Favorites</h1>
          </div>
          <span className="text-black/80 mb-8 block">
            {favorites.length} saved products
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <RemoveFavorite productId={product.id} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
