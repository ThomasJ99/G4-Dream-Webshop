import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { SearchParams } from "next/dist/server/request/search-params";

interface ProductCardProps {
  products: Product[];
  categories: Category[];
}

export default function ProductGrid({ products, categories }: ProductCardProps) {
  console.log(products[0]);
  return (
    <div>
      {products.length > 0 ? (
        // TODO: SHOULD ADD SOME PX ON SMALLER SCREENS - look at homepage for px values
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product, index) => {
            const category = categories.find((category) => category.id === product.categoryId);

            return (
              <ProductCard key={product.id} product={product} category={category} index={index} />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
