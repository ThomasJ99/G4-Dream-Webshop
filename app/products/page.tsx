import type { ProductsResponse } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: number;
  image: string;
  name: string;
  slug: string;
}

// Fetch functions
const getAllProducts = async () => {
  const response = await fetch("http://localhost:4000/products");

  if (!response.ok) {
    throw new Error("Unable to get products");
  }

  const data = await response.json();

  return data;
};

const getAllCategories = async () => {
  const response = await fetch("http://localhost:4000/categories");

  if (!response.ok) {
    throw new Error("Unable to get categories");
  }

  const data = await response.json();

  return data;
};

export default async function ProductPage() {
  const data: ProductsResponse = await getAllProducts();
  const categories: Category[] = await getAllCategories();

  const { total, products } = data;

  return (
    <main>
      <h1>All Products</h1>
      <span>{total} products found</span>

      <section>
        <form action="">
          <input type="text" placeholder="Search products..." />
          <select name="category-select" id="category-select">
            <option value="" defaultValue="">
              All categories
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </form>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const firstImage = product.images?.[0];
          const productCategory = categories.find((category) => category.id === product.categoryId);

          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <article>
                {firstImage ? (
                  <Image
                    src={firstImage}
                    alt={product.description}
                    width={300}
                    height={300}
                    loading="eager"
                  />
                ) : null}

                <span>{productCategory?.name}</span>
                <h2>{product.title}</h2>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
