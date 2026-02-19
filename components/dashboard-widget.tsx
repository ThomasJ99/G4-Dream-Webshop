// components/dashboard-widget

import { Package2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const stats = [
  {
    label: "Total products",
    value: 248,
    icon: Package2,
    color: "text-purple-500",
    bg: "bg-blue-50",
  },
  {
    label: "In stock",
    value: 189,
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    label: "Low stock",
    value: 34,
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    label: "Out of stock",
    value: 25,
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

export default function InventoryWidget() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-white rounded-1xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-gray-600">{label}</span>
              <p className="text-2xl font-bold text-gray-900 mt-0">{value}</p>
            </div>
            <div className={`${bg} ${color} p-3 rounded-xl`}>
              <Icon size={25} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
