import Header from "@/components/ui/admin/header";
import ProductTable from "@/components/ui/admin/product-table";
import Sidebar from "@/components/ui/admin/sidebar";
import InventoryWidget from "../../components/ui/admin/dashboard-widget";
import SearchWidget from "../../components/ui/admin/search-widget";
import { getCategories } from "@/lib/db/categories-db";

export default async function Admin(params: PageProps<"/">) {
  const categories = await getCategories();

  return (
    <main className="flex flex-row min-h-screen">
      <Sidebar />

      <section className="flex flex-col w-full gap-4 bg-gray-100">
        <Header />
        <div className="pr-4 pl-4 pb-4 flex flex-col gap-4">
          <InventoryWidget />
          <SearchWidget categories={categories} />
          <ProductTable searchParams={params.searchParams} />
        </div>
      </section>

      {/* <h1>Products</h1>
      <div>{products.map((product) => <h2 key={product.id}>{product.title} - {product.category?.name}</h2>)}</div> */}
    </main>
  );
}
