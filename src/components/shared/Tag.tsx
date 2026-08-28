import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-ink-300 px-2.5 py-1 text-xs font-medium text-ink-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
