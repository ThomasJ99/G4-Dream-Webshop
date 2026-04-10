"use client";
import confetti from "canvas-confetti";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/config";
import { Button } from "./button";

export default function AddFavorite({ productID }: { productID: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkFavorite = async () => {
      const response = await fetch(`${API_URL}/api/favorites`);
      if (!response.ok) return;
      const favorites = await response.json();
      const exists = favorites.some(
        (fav: { product_id: number }) => fav.product_id === productID,
      );
      setIsFavorite(exists);
    };
    checkFavorite();
  }, [productID]);

  const handleClick = async () => {
    if (!productID) return console.error("Missing productID");

    if (isFavorite) {
      const response = await fetch(`${API_URL}/api/favorites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productID }),
      });
      if (!response.ok) {
        console.error("Failed to remove favorite");
      } else {
        setIsFavorite(false);
      }
    } else {
      const response = await fetch(`${API_URL}/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productID }),
      });
      if (!response.ok) {
        console.error("Failed to add favorite");
      } else {
        setIsFavorite(true);
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 30,
          spread: 50,
          startVelocity: 10,
          scalar: 1,
          origin: { x, y },
          gravity: 0.5,
          ticks: 100,
        });
      }
    }
  };

  return (
    <Button ref={buttonRef} className="w-fit group" onClick={handleClick}>
      <Star
        className={`transition-all duration-500 group-hover:scale-120 group-hover:rotate-[360deg] ${
          isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-white"
        }`}
      />
    </Button>
  );
}
