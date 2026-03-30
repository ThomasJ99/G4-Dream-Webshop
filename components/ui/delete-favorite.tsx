"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function RemoveFavorite({ productId }: { productId: number }) {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevents Link navigation from ProductCard triggering

    const response = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId }),
    });

    if (response.ok) {
      router.refresh(); // re-fetches the page data to reflect removal
    } else {
      console.error("Failed to remove favorite");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute bottom-1 right-0 hover:cursor-pointer"
    >
      <X className="h-4 w-4 text-gray-600" />
    </button>
  );
}
