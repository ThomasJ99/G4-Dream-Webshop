// components/dashboard-widget

import { Package2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const stats = [
  {
    label: "Total products",
    value: 248,
    icon: Package2,
    color: "text-primary",
    bg: "bg-primary/8",
  },
  {
    label: "In stock",
    value: 189,
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/8",
  },
  {
    label: "Low stock",
    value: 34,
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/8",
  },
  {
    label: "Out of stock",
    value: 25,
    icon: XCircle,
    color: "text-danger",
    bg: "bg-danger/8",
  },
];

export default function InventoryWidget() {
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
                <h2 className="text-2xl font-bold text-text-strong mt-0">{value}</h2>
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
}
