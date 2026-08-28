import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "njord" | "aqua" | "signal" | "neutral";

// Цвет несёт подложка, а текст держится тёмным: aqua-600 и signal-600 на
// собственных светлых тинтах дают контраст ниже 4.5:1 и как текст непригодны.
const tones: Record<Tone, string> = {
  njord: "bg-njord-50 text-njord-700",
  aqua: "bg-aqua-300/25 text-njord-900",
  signal: "bg-signal-500/15 text-ink-900",
  neutral: "bg-ink-100 text-ink-700",
};

export function Badge({ children, tone = "njord", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
