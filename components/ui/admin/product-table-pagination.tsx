"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProductTablePagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 5;
  const currentQuery = searchParams.get("q") || "";

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    params.set("limit", currentLimit.toString());
    params.set("q", currentQuery.toString());
    return `${pathname}?${params.toString()}`;
  };
  //&rarr;
  return (
    <div className="flex justify-end gap-4">

      <Link scroll={false} className={`${currentPage > 1 ? 'text-purple-800' : 'text-gray-400'} p-1 text-center rounded-lg`}  href={createPageURL(1)}>
        <ChevronsLeft/>
      </Link>
      <Link scroll={false} className={`${currentPage > 1 ? 'text-purple-800' : 'text-gray-400'} p-1 text-center rounded-lg`}  href={createPageURL(Math.max(1, currentPage - 1))}>
        <ChevronLeft/>
      </Link>

      <Link scroll={false} className="bg-purple-800 text-white p-1 min-w-10 text-center rounded-lg" href={createPageURL(currentPage)}>
        {currentPage} 
      </Link>

      {currentPage < totalPages && (
      <>
      <span className="flex items-end text-purple-800 text-2xl">...</span>
      <Link className="bg-white text-purple-800 border border-purple-800 p-1 min-w-10 text-center rounded-lg" href={createPageURL(totalPages)}>
        {totalPages}
      </Link>
      </>
      )}
    
      <Link scroll={false} className={`${currentPage >= totalPages ? 'text-gray-400' : 'text-purple-800'} p-1 text-center rounded-lg`} href={createPageURL(Math.min(totalPages, currentPage + 1))}>
        <ChevronRight/>
      </Link>
      <Link scroll={false} className={`${currentPage >= totalPages ? 'text-gray-400' : 'text-purple-800'} p-1 text-center rounded-lg`} href={createPageURL(totalPages)}>
        <ChevronsRight/>
      </Link>
      
    </div>
  );
}
