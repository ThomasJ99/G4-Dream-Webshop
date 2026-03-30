"use client";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export default function AddFavorite({ productID }: { productID: number }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!productID) {
      console.error("Missing productID");
      return;
    }

    console.log(productID);
  };
  return (
    <Button className="w-fit" onClick={() => setClicked((c) => !c)}>
      <Star
        className={`transition-transform duration-500 ${clicked ? "scale-110 rotate-[360deg]" : ""}`}
        fill={clicked ? "gold" : "white"}
        stroke={clicked ? "gold" : "white"}
      />
    </Button>
  );
}
