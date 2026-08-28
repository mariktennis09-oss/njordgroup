import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  tone = "light",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-7",
        tone === "light" ? "border-ink-100 bg-white" : "border-njord-800 bg-njord-900 text-white",
        interactive &&
          "transition-all duration-200 hover:border-njord-300 hover:shadow-card hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
