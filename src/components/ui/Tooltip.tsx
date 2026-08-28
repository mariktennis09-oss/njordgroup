"use client";

import { useId, useState } from "react";
import { Info } from "lucide-react";

export function Tooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-describedby={id}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="flex h-4 w-4 items-center justify-center rounded-full text-ink-500 hover:text-njord-600"
      >
        <Info className="h-4 w-4" aria-hidden />
        <span className="sr-only">Пояснение</span>
      </button>
      {visible && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-sm bg-ink-900 px-3 py-2 text-xs text-white shadow-card"
        >
          {text}
        </span>
      )}
    </span>
  );
}
