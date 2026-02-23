/* components/ui/dashboard-widget */

const API_URL = "http://localhost:4000";

import { Package2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

// Calculate availability status based on stock quantity
// stock = 0 → "Out of Stock"
// stock < 20 → "Low Stock"
// stock ≥ 20 → "In Stock"
const getAvailabilityStatus = (stock: number) => {
  if (stock === 0) return 'Out of Stock';
  if (stock < 20) return 'Low Stock';
  return 'In Stock';
};

export default async function InventoryWidget() {
  // Fetch all products from the API
  const response = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  });

  const data = await response.json();

  // Extract products array from the wrapper object
  const products = Array.isArray(data) ? data : data.products;

  // Calculate statistics based on stock quantity using getAvailabilityStatus
  const stats = [
    {
      label: 'Total products',
      // Count total number of products by getting array length
      value: products.length,
      icon: Package2,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'In stock',
      // Filter products where stock is 20 or more and count them
      value: products.filter((p: any) => getAvailabilityStatus(p.stock) === 'In Stock').length,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'Low stock',
      // Filter products where stock is between 1-19 and count them
      value: products.filter((p: any) => getAvailabilityStatus(p.stock) === 'Low Stock').length,
      icon: AlertTriangle,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      label: 'Out of stock',
      // Filter products where stock equals 0 and count them
      value: products.filter((p: any) => getAvailabilityStatus(p.stock) === 'Out of Stock').length,
      icon: XCircle,
      color: 'text-danger',
      bg: 'bg-danger/10',
    },
  ];

  // Render statistics as cards in a 4-column grid
  return (
    <section>
      <div className="grid grid-cols-4 gap-4">
        {/* Loop through each statistic and create a card */}
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <article
            key={label}
            className="bg-bg rounded-xl p-5 shadow-sm border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                {/* Display label */}
                <h2 className="text-xs font-medium text-text-muted">{label}</h2>
                {/* Display calculated value */}
                <h2 className="text-2xl font-bold text-text-strong mt-1">
                  {value}
                </h2>
              </div>
              {/* Display icon with background color */}
              <div className={`${bg} ${color} p-3 rounded-xl`}>
                <Icon size={25} aria-hidden="true" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}