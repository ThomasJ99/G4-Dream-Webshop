import "server-only";
import { getInventoryProducts } from '@/lib/db';
import { Package2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { Product } from '@/lib/types';

// Pick only the stock property from interface Product
type ProductForInventoryWidget = Pick<Product, 'stock'>;

// Determine stock status based on quantity
// - 0 or undefined = "Out of Stock"
// - 1-19 = "Low Stock"
// - 20+ = "In Stock"
const getAvailabilityStatus = (stock: number | null | undefined) => {
  const s = stock ?? 0;
  if (s === 0) return 'Out of Stock';
  if (s < 20) return 'Low Stock';
  return 'In Stock';
};

// Load products from local JSON database to calculate inventory stats
export default async function InventoryWidget() {
  try {
    const products: ProductForInventoryWidget[] = await getInventoryProducts();

    const stats = [
      {
        label: 'Total products',
        value: products.length,
        icon: Package2,
        color: 'text-primary',
        bg: 'bg-primary/10',
      },
      {
        label: 'In stock',
        value: products.filter((p) => getAvailabilityStatus(p.stock) === 'In Stock').length,
        icon: CheckCircle2,
        color: 'text-success',
        bg: 'bg-success/10',
      },
      {
        label: 'Low stock',
        value: products.filter((p) => getAvailabilityStatus(p.stock) === 'Low Stock').length,
        icon: AlertTriangle,
        color: 'text-warning',
        bg: 'bg-warning/10',
      },
      {
        label: 'Out of stock',
        value: products.filter((p) => getAvailabilityStatus(p.stock) === 'Out of Stock').length,
        icon: XCircle,
        color: 'text-danger',
        bg: 'bg-danger/10',
      },
    ];

    return (
      <section>
        <div className="grid grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <article
              key={label}
              className="bg-bg rounded-xl p-5 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-medium text-text-muted">{label}</h2>
                  <h2 className="text-2xl font-bold text-text-strong mt-1">
                    {value}
                  </h2>
                </div>
                <div className={`${bg} ${color} p-3 rounded-xl`}>
                  <Icon size={25} aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section>
        <div className="bg-bg rounded-xl p-5 shadow-sm border border-danger">
          <p className="text-danger font-medium">
            Failed to fetch inventory data. Please try again later.
          </p>
        </div>
      </section>
    );
  }
}