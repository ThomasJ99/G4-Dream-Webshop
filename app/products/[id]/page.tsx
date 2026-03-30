import Image from "next/image";
import { notFound } from "next/navigation";
import AddFavorite from "@/components/ui/add-favorite";
import { getProductById } from "@/lib/db/products-db";
import type { Product } from "@/lib/types";

export default async function ProductPage({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;
  const data = await getProductById(id);
  //TODO: make this work
  // if (!data) {
  //   notFound();
  // }

  const ProductDetail = ({ product }: { product: Product }) => {
    const productTags = product?.tags?.join(", ");

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* image */}
        <div className="aspect-[1/1] relative rounded-lg overflow-hidden bg-secondary">
          <Image
            className="object-contain object-center"
            src={product.images[0]}
            fill
            alt=""
          />
        </div>

        <section className="flex flex-col gap-8">
          {/* summary */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {product.categoryId}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium">
              {product.title}
            </h1>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-medium mt-4">{product.price} kr</p>
              <AddFavorite productID={product.id} />
            </div>
          </div>

          {/* description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* add to cart */}
          <button
            type="button"
            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 w-full"
          >
            Add to Cart
          </button>

          {/* details and shipping */}
          <div className="pt-8 border-t border-border space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Details</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Premium quality materials</li>
                <li>Ethically manufactured</li>
                <li>Designed in Stockholm</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Shipping</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{product.availabilityStatus}</li>
                <li>{product.shippingInformation}</li>
                <li>{product.warrantyInformation}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <main className="p-8">
      <a
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        href="/products"
      >
        Back to Products
      </a>

      <ProductDetail product={data} />
    </main>
  );
}
