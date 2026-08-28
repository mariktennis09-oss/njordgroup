import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <nav
      aria-label="Хлебные крошки"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm", isDark ? "text-njord-100" : "text-ink-500")}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className={isDark ? "hover:text-white" : "hover:text-njord-600"}>
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? (isDark ? "text-white" : "text-ink-900") : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
          </span>
        );
      })}
    </nav>
  );
}
