/* components/ui/dashboard-widget */

const API_URL = "http://localhost:4000";

import { Package2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default async function InventoryWidget() {
  const response = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  });

  const data = await response.json();

  // Extract products array from the wrapper object
  // From each product, use only availabilityStatus
  const products = Array.isArray(data) ? data : data.products;

  // Calculate statistics based on availabilityStatus
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
      // Filter products where availabilityStatus equals "In Stock" and count them
      value: products.filter((p: any) => p.availabilityStatus === 'In Stock')
        .length,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'Low stock',
      // Filter products where availabilityStatus equals "Low Stock" and count them
      value: products.filter((p: any) => p.availabilityStatus === 'Low Stock')
        .length,
      icon: AlertTriangle,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      label: 'Out of stock',
      // Filter products where availabilityStatus equals "Out of Stock" and count them
      value: products.filter((p: any) => p.availabilityStatus === 'Out of Stock')
        .length,
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
              {/* Display icon */}
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