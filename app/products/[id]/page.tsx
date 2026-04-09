import { ChevronLeft } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddFavorite from "@/components/ui/add-favorite";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/cart-actions";
import { getProductById } from "@/lib/db/products-db";
import { formatPrice } from "@/utils/utils";
import { getReviewsByProductId } from "@/lib/db/reviews-db";
import { li } from "framer-motion/client";

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;

  let product = {};
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  const reviews = await getReviewsByProductId(id);

  const imgURL =
    product.images?.[0] || "https://placehold.co/1000x1000/png?text=No image available";
  const prettyPrice = formatPrice(product.price);

  return (
    <main className="my-8">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <Link
          href={"/products"}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* image */}
        <div className="relative bg-secondary">
          <Image className="object-cover" src={imgURL} alt="" width={1000} height={1000} />
        </div>

        <section className="flex flex-col gap-8">
          {/* summary */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {product.category.name}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium">{product.title}</h1>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-medium mt-4">{prettyPrice}</p>
              <AddFavorite productID={product.id} />
            </div>
          </div>

          {/* description */}
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* add to cart */}
          <Form action={addToCart}>
            <input type="hidden" name="product_id" value={product.id}></input>
            <Button type="submit" size={"lg"} className="cursor-pointer w-full">
              Add to Cart
            </Button>
          </Form>

          {/* details and shipping */}
          <section className="flex gap-32">
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

            <div className="pt-8 border-t border-border space-y-4">
              <h3 className="text-sm font-semibold">Reviews:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {reviews.map((review) => (
                  <li>
                    <i className="font-semibold">{review.reviewer_name}: </i>
                    {review.comment}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
