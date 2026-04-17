"use client";
import confetti from "canvas-confetti";
import { Star } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

export default function AddFavorite({ productID }: { productID: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkFavorite = async () => {
      const response = await fetch(`/api/favorites`);
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
    if (isPending) return;

    setIsPending(true);

    try {
      if (isFavorite) {
        const response = await fetch(`/api/favorites`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productID }),
        });
        if (!response.ok) {
          console.error("Failed to remove favorite");
        } else {
          setIsFavorite(false);
          router.refresh();
        }
      } else {
        const response = await fetch(`/api/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productID }),
        });
        if (!response.ok) {
          console.error("Failed to add favorite");
        } else {
          setIsFavorite(true);
          router.refresh();
          if (pathname.includes("products")) {
            const rect = buttonRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            confetti({
              particleCount: 50,
              spread: 60,
              startVelocity: 14,
              scalar: 1,
              origin: { x, y },
              gravity: 0.5,
              angle: 80,
              ticks: 100,
            });
          }
        }
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="select-none">
      <Button
        ref={buttonRef}
        style={
          isPending
            ? { cursor: "not-allowed", userSelect: "none" }
            : { userSelect: "none" }
        }
        className="w-10 h-10 group hover:cursor-pointer disabled:opacity-100 bg-transparent"
        onClick={handleClick}
        disabled={isPending}
      >
        <Star
          className={`transition-transform w-7! h-7! duration-300 group-hover:scale-120  ${isFavorite && pathname.includes("products/") ? "rotate-[145deg]" : "text-yellow-400"} ${
            isFavorite ? "fill-yellow-400 text-yellow-400" : ""
          } 
          
          `}
        />
      </Button>
    </div>
  );
}
