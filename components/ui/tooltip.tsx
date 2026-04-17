// components/ui/tooltip.tsx
type TooltipProps = {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  arrow?: boolean; // ← New optional prop
  className?: string;
  children: React.ReactNode;
};

const positionClasses = {
  top: "bottom-8 -left-7 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-6 top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-t-8 border-x-8 border-x-transparent",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 border-b-8 border-x-8 border-x-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-gray-800 border-l-[9px] border-y-[9px] border-y-transparent",
  right:
    "left-full top-1/2 -translate-y-1/2 border-r-gray-800 border-r-[10px] border-y-[9px] border-y-transparent",
};

const boxRadiusClasses = {
  top: "rounded-md",
  bottom: "rounded-md",
  left: "rounded-md",
  right: "rounded-md",
};

export default function Tooltip({
  text,
  position = "top",
  delay = 300,
  arrow = false, // ← Default is NO arrow
  className = "",
  children,
}: TooltipProps) {
  return (
    <div className={`relative group flex ${className}`}>
      {children}

      <div
        className={`absolute ${positionClasses[position]} z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none`}
        style={{
          transitionDelay: `${delay}ms`,
        }}
      >
        <span
          className={`relative block px-3 py-1.5 text-xs text-white bg-gray-800 whitespace-nowrap shadow-lg ${boxRadiusClasses[position]}`}
        >
          {text}

          {/* Optional Arrow */}
          {arrow && (
            <span
              className={`absolute w-0 h-0 ${arrowClasses[position]} -z-10`}
            />
          )}
        </span>
      </div>
    </div>
  );
}
