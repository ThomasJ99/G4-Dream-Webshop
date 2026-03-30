"use client";
import { Star } from "lucide-react";
import { Button } from "./button";

export default function AddFavorite({ productID }: { productID: number }) {
  const handleClick = () => {
    if (!productID) {
      console.error("Missing productID");
      return;
    }
    console.log(productID);
  };
  return (
    <Button className="w-fit group hover:cursor-pointer" onClick={handleClick}>
      <Star
        className="transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-[360deg]"
        fill="white"
      />
    </Button>
  );
}
