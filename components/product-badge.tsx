// Optional props for each type of information to be displayed
interface ProductBadgeProps {
  // Out of stock
  availabilityStatus?: string;
  // Thinking around 15% or higher, maybe even higher
  discountPercentage?: number;
  // Show low stock
  stock?: number;
}

export default function ProductBadge({
  availabilityStatus,
  discountPercentage,
  stock,
}: ProductBadgeProps) {

  // If discound is 15 or above and it isnt undefined
  if (discountPercentage !== undefined && discountPercentage >= 15) {
    return <span>🔥 Hot</span>;
  }

  if (availabilityStatus === "Out of Stock") {
    return <span>Sold out</span>;
  }

  if (stock <= 5 && stock !== undefined)
    return <span>Only {stock} left</span>
}
