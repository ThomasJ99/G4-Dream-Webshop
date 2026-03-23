import type { ProductsResponse } from "../../lib/types";
import Sidebar from "@/components/ui/admin/sidebar";
import ProductTable from "@/components/ui/admin/product-table";
import Header from "@/components/ui/admin/header";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home(params: PageProps<"/">) {
  return (
    <main className="flex flex-row min-h-screen">
      <div className="text-[20rem]">Hello world!</div>
    </main>
  );
}
