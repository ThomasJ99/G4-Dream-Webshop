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

  // Return null here because they can be undefined
  return null
}

export function hasBadge(props: ProductBadgeProps): boolean {
  return (
    props.availabilityStatus === "Out of Stock" ||
    (props.stock !== undefined && props.stock <= 5) ||
    (props.discountPercentage !== undefined &&
      props.discountPercentage >= 15) ||
    (props.rating !== undefined && props.rating >= 4.5)
  );
}