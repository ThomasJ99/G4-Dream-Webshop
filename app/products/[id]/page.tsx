import Image from "next/image";
import { API_URL } from "@/lib/config";

export default async function ProductDetail({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;

  const data = await fetch(`${API_URL}/products/${id}`).then((res) =>
    res.json(),
  );

  console.log(Object.keys(data));

  console.log(data.tags);

  if (!Object.keys(data).length) {
    return <h1>product not found</h1>;
  }

  return (
    <main>
      <Image
	src={data.thumbnail}
	width={100}
	height={100}
	alt=""
      />

      <h1>id: {data.id}</h1>
      <p>category: {data.categoryId}</p>
      <p>description: {data.description}</p>
      <p>title: {data.title}</p>
      <p>price: {data.price}</p>
    </main>
  );
}
