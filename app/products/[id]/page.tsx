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

  const ProductElement = () => {
    const productTags = data.tags.join(", ");

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-secondary">
          <Image
            className="object-cover"
            src={data.images[0]}
            width={500}
            height={500}
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <div>
	    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{productTags}</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-4">
              {data.title}
            </h1>
	    <p className="text-2xl font-medium">{data.price} kr</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <a
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        href="/products"
      >
        Back to Products
      </a>
      <ProductElement />
    </main>
  );
}
