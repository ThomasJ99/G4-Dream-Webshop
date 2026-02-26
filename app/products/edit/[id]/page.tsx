import { API_URL } from "@/lib/config";
import EditForm from "@/components/ui/edit-form";
import type { Category, Product } from "@/lib/types";

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product: Product = await fetch(
    `${API_URL}/products/${id}`
  ).then((res) => res.json());



  return (
    <main className="bg-[var(--color-bg-muted)] flex justify-center px-6 py-16">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Edit Product
        </h1>
          
          <EditForm product={product} />
    
         
      </div>
    </main>
  );
}


