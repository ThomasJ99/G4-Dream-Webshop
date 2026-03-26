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
    <Button className="w-fit" onClick={handleClick}>
      <Star fill="white" />
    </Button>
  );
}
