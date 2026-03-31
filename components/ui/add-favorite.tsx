"use client";
import { Star } from "lucide-react";
import { API_URL } from "@/lib/config";
import { Button } from "./button";

export default function AddFavorite({ productID }: { productID: number }) {
  const handleClick = async () => {
    if (!productID) return console.error("Missing productID");

    const response = await fetch(`${API_URL}/api/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productID }),
    });

    if (!response.ok) {
      console.error("Failed to add favorite");
    } else {
      console.log("Added to favorites:", productID);
    }
  };

  return (
    <Button className="w-fit group" onClick={handleClick}>
      <Star
        className="transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-[360deg]"
        fill="white"
      />
    </Button>
  );
}
