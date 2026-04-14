import { Toaster } from "react-hot-toast";
import { ToastListener } from "@/components/toast-listener";
import Header from "@/components/ui/admin/header";
import ProductTable from "@/components/ui/admin/product-table";
import Sidebar from "@/components/ui/admin/sidebar";
import InventoryWidget from "../../components/ui/admin/dashboard-widget";
import SearchWidget from "../../components/ui/admin/search-widget";
import { getCategories } from "@/lib/db/categories-db";
import { getFeaturedProducts, getProducts } from "@/lib/db/products-db";

export default async function Admin(params: PageProps<"/">) {
  const { page = "1", limit = "5", q = "", _categoryId = "" } = await params.searchParams;
  const searchParams = new URLSearchParams({
    _limit: limit.toString(),
    _page: page.toString(),
    _q: q.toString(),
    _categoryId: _categoryId.toString(),
  });

  const categories = await getCategories();
  const allProductResponse = await getProducts(searchParams.toString());
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="flex flex-row min-h-screen">
      <Toaster position="top-center" />
      <ToastListener />
      <Sidebar />

      <section className="flex flex-col w-full gap-4 bg-gray-100">
        <Header />
        <div className="pr-4 pl-4 pb-4 flex flex-col gap-4">
          <InventoryWidget />
          <SearchWidget categories={categories} />
          <ProductTable
            searchParams={params.searchParams}
            productResponse={allProductResponse}
            tableType="all"
          />
          <h2 className={`mt-4 text-2xl leading-tight`}>Featured Products</h2>
          <ProductTable
            searchParams={params.searchParams}
            productResponse={featuredProducts}
            tableType="featured"
          />
        </div>
      </section>

      {/* <h1>Products</h1>
      <div>{products.map((product) => <h2 key={product.id}>{product.title} - {product.category?.name}</h2>)}</div> */}
    </main>
  );
}
