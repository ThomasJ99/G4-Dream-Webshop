import { API_URL } from "@/lib/config";

export default async function ProductDetail({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;

  const data = await fetch(`${API_URL}/products/${id}`).then((res) =>
    res.json(),
  );

  console.log(Object.keys(data));

  if (!Object.keys(data).length) {
    return <h1>product not found lol</h1>;
  }

  return (
    <div>
      <h1>id: {data.id}</h1>
      <p>category: {data.categoryId}</p>
      <p>title: {data.title}</p>
    </div>
  );
}
