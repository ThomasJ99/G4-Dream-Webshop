"use client";
import confetti from "canvas-confetti";
import { Star } from "lucide-react";
import { useRef, useState } from "react";
import { API_URL } from "@/lib/config";
import { Button } from "./button";

export default function AddFavorite({ productID }: { productID: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      setIsFavorite(true);

      // 🎯 Get button position
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // 🎉 Bigger burst (3–5x feel)
      confetti({
        particleCount: 30,
        spread: 50, // wider explosion
        startVelocity: 10, // stronger burst
        scalar: 1, // slightly bigger particles
        origin: { x, y },
        gravity: 0.5,
        ticks: 100,
      });
    }
  };

  return (
    <Button
      ref={buttonRef}
      className="w-fit group"
      onClick={handleClick}
      disabled={isFavorite}
    >
      <Star
        className={`transition-all duration-500 group-hover:scale-120 group-hover:rotate-[360deg] ${
          isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-white"
        }`}
      />
    </Button>
  );
}
