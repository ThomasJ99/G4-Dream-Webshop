import Image from "next/image";
import { API_URL } from "@/lib/config";

export default async function ProductDetail({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;

  const data = await fetch(`${API_URL}/products/${id}`).then((res) =>
    res.json(),
  );

  if (!Object.keys(data).length) {
    return <h1>product not found</h1>;
  }

  // this might not be used since we have non-clothing products
  const SizeSelectElement = () => {
    const productSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const sizeButtonElements = productSizes.map((size) => {
      return (
        <button
          type="button"
          key={size}
          className="px-4 py-2 text-sm border rounded-md transition-colors border-input hover:border-foreground"
        >
          {size}
        </button>
      );
    });

    return (
      <div>
        <p className="text-sm font-semibold mb-3 block">
          Size
          <span className="text-muted-foreground font-normal ml-2">
            - Select a size
          </span>
        </p>
        <div>{sizeButtonElements}</div>
      </div>
    );
  };

  const ImageElement = () => {
    return (
      <div className="aspect-[1/1] relative rounded-lg overflow-hidden bg-secondary">
        <Image
          className="object-contain object-center"
          src={data.images[0]}
          fill
          alt=""
        />
      </div>
    );
  };

  const DataElement = () => {
    const productTags = data.tags.join(", ");
    return (
      <div className="flex flex-col">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            {productTags}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-4">
            {data.title}
          </h1>
          <p className="text-2xl font-medium">{data.price} kr</p>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8">
          {data.description}
        </p>
        <div className="space-y-6">
          <SizeSelectElement />
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 w-full"
          >
            Add to Cart
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-border space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Details</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Premium quality materials</li>
              <li>Ethically manufactured</li>
              <li>Designed in Stockholm</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Free shipping on orders over 999 SEK. Standard delivery 3-5
              business days.
            </p>
          </div>
        </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ImageElement />
        <DataElement />
      </div>
    </main>
  );
}
