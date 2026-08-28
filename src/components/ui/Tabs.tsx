"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

export function Tabs({
  items,
  defaultValue,
  className,
}: {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value);
  const baseId = useId();

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + items.length) % items.length;
    const next = items[nextIndex];
    setActive(next.value);
    document.getElementById(`${baseId}-tab-${next.value}`)?.focus();
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label="Способ работы с грузом" className="flex gap-1 rounded-sm bg-ink-50 p-1">
        {items.map((item, index) => (
          <button
            key={item.value}
            id={`${baseId}-tab-${item.value}`}
            role="tab"
            type="button"
            aria-selected={active === item.value}
            aria-controls={`${baseId}-panel-${item.value}`}
            tabIndex={active === item.value ? 0 : -1}
            onClick={() => setActive(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "flex-1 rounded-sm px-2 py-2.5 text-center text-sm font-semibold transition-colors duration-200 sm:px-4",
              active === item.value
                ? "bg-white text-njord-900 shadow-card"
                : "text-ink-500 hover:text-ink-900",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.value}
          id={`${baseId}-panel-${item.value}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.value}`}
          hidden={active !== item.value}
          className="pt-6"
        >
          {active === item.value && item.content}
        </div>
      ))}
    </div>
  );
}
