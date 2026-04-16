import FilterProducts from "@/components/filter-products";
import ProductGrid from "@/components/product-grid";
import ProductGridPagination from "@/components/product-grid-pagination";
import { getCategories } from "@/lib/db/categories-db";
import { getProducts } from "@/lib/db/products-db";
import type { Category } from "@/lib/types";
import { getSearchParamsAsString } from "@/utils/getSearchParams";

export const metadata = {
  title: "Products | DreamShop",
  description:
    "Browse the full product catalogue. Filter by category and pagination, all driven through the URL.",
  keywords: ["products", "catalogue", "pagination", "filter", "e-commerce"],
};

export default async function ProductPage(params: PageProps<"/">) {
  // "params: PageProps<'/'>" contains searchParams, able to fetch async without 'use client'
  const {
    _q = "",
    _categoryId = "",
    _page = "1",
    _limit = "8",
  } = await params.searchParams;

  const currentLimit = getSearchParamsAsString(_limit) as string;
  const currentPage = getSearchParamsAsString(_page) as string;
  const currentCategoryId = getSearchParamsAsString(_categoryId) as string;
  const currentQuery = getSearchParamsAsString(_q) as string;

  // Create new URL searchParams string
  const searchParams = new URLSearchParams({
    _limit: currentLimit.toString(),
    _page: currentPage.toString(),
    _categoryId: currentCategoryId.toString(),
    _q: currentQuery.toString(),
  });

  // getProducts accepts URL string for fetch
  const { total, products } = await getProducts(searchParams.toString());

  const categories: Category[] = await getCategories();

  // Calculate pages
  const totalProducts = total ?? 0;
  const leftover = totalProducts % 8;
  let totalPages = (totalProducts - leftover) / 8;

  if (leftover > 0) {
    totalPages += 1;
  }

  if (totalPages < 1) {
    totalPages = 1;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-serif mt-16">All Products</h1>
      <span className="text-black/60 mb-8 block mt-2">
        {total} products found
      </span>

      <FilterProducts categories={categories} />

      <ProductGrid
        initialProducts={products}
        initialCategories={categories}
        searchParams={searchParams.toString()}
      />

      <ProductGridPagination totalPages={totalPages} />
    </main>
  );
}
