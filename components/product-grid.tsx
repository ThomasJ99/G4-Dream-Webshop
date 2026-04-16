"use client";

import { useEffect, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "./product-grid-skeleton";

interface ProductGridProps {
  initialProducts: Product[];
  initialCategories: Category[];
  searchParams: string;
}

export default function ProductGrid({
  initialProducts,
  initialCategories,
  searchParams,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/?${searchParams}`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchParams]);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product, index) => {
            const category = categories.find(
              (category) => category.id === product.categoryId,
            );

            return (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
                index={index}
              />
            );
          })}
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
