import type { ProductsResponse } from "../../lib/types";
import Sidebar from "@/components/ui/sidebar";
import ProductTable from "@/components/ui/product-table";
import Header from "@/components/ui/header";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home(params: PageProps<"/">) {
  return (
    <main className="flex flex-row min-h-screen">
      <div className="text-[20rem]">Hello world!</div>
    </main>
  );
}
