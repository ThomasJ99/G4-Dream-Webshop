import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

interface ProductCardProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductCardProps) {
  console.log(products[0]);
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
