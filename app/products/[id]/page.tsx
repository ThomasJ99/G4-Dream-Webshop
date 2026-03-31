import { ChevronLeft } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddFavorite from "@/components/ui/add-favorite";
import { addToCart } from "@/lib/actions/cart-actions";
import { getProductById } from "@/lib/db/products-db";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/utils/utils";

export default async function ProductPage({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;
  let data = {};

  try {
    data = await getProductById(id);
  } catch {
    notFound();
  }

  const ProductDetail = ({ product }: { product: Product }) => {
    const imgURL = product.images?.[0] || "https://placehold.co/1000x1000/png";
    const prettyPrice = formatPrice(product.price);

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* image */}
        <div className="relative bg-secondary">
          <Image
            className="object-cover"
            src={imgURL}
            alt=""
            width={1000}
            height={1000}
          />
        </div>

        <section className="flex flex-col gap-8">
          {/* summary */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {product.category.name}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium">
              {product.title}
            </h1>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-medium mt-4">{prettyPrice}</p>
              <AddFavorite productID={product.id} />
            </div>
          </div>

          {/* description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* add to cart */}
          <Form action={addToCart}>
            <input type="hidden" name="product_id" value={product.id}></input>
            <button
              type="submit"
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 w-full"
            >
              Add to Cart
            </button>
          </Form>

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
    <main className="">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={"/products"}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </header>

      <ProductDetail product={data} />
    </main>
  );
}
