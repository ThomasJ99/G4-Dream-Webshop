// Optional props for each type of information to be displayed
interface ProductBadgeProps {
  // Out of stock
  availabilityStatus?: string;
  // Thinking around 15% or higher, maybe even higher
  discountPercentage?: number;
  // Show low stock
  stock?: number;
  // Popular products
  rating?: number;
}

export default function ProductBadge({
  availabilityStatus,
  discountPercentage,
  stock,
  rating,
}: ProductBadgeProps) {
  // FÖR FRAMTIDA MIG: TÄNK PÅ PRIORITERING AV ALLA DESSA BADGES,
  // VISSA VILL MAN NOG SKA HA HÖGRE PRIORITET ÄN ANDRA

  // If discound is 15 or above and it isnt undefined
  if (availabilityStatus === "Out of Stock") {
    return (
      <span className="bg-zinc-800 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        Sold out
      </span>
    );
  }

  if (stock !== undefined && stock <= 5)
    return (
      <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        Only {stock} left
      </span>
    );

  if (discountPercentage !== undefined && discountPercentage >= 15) {
    return (
      <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        Hot
      </span>
    );
  }

  if (rating !== undefined && rating >= 4.5) {
    return (
      <span className="bg-blue-400 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        Popular
      </span>
    );
  }
}
