import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getFeaturedProducts, getProducts } from "@/lib/db/products-db";
import { ProductCard } from "./product-card";

export default async function FeaturedGrid() {
  // TODO: REMOVE THIS LINE OF CODE LATER, GOOD TO TEST SKELETONS
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  const featuredProducts = (await getFeaturedProducts()).products;

  const randomFeaturedProducts = [];

  const productIndexes = [];
  let j = 0;
  //create numbers array to keep track of which indexes are picked
  for (const item in featuredProducts) {
    productIndexes.push(j);
    j++;
  }

  //loop through and make sure there are no duplicates
  for (let i = 0; i < 4; i++) {
    const randomNum = Math.random();
    const length = productIndexes.length;

    const selectIndex = Math.floor(length * randomNum);
    console.log(productIndexes[selectIndex]);
    const selectProductIndex = featuredProducts[productIndexes[selectIndex]];

    //remove picked number from the "tracking" array to avoid duplicates type thing
    productIndexes.splice(selectIndex, 1);
    //console.log(productIndexes);

    randomFeaturedProducts.push(selectProductIndex);
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">
            Featured Products
          </h2>

          <Link
            href={"/products"}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-400 transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomFeaturedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
