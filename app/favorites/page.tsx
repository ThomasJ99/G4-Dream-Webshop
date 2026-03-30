import { X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import RemoveFavorite from "@/components/ui/delete-favorite";

async function getFavorites() {
  const response = await fetch("http://localhost:3000/api/favorites", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
}

async function getProduct(id: number) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
  return response.json();
}

export default async function Favorites() {
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
