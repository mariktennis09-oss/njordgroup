import { cn } from "@/lib/utils";

export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  const textColor = variant === "dark" ? "var(--color-njord-900)" : "var(--color-white)";
  const accentColor = variant === "dark" ? "var(--color-njord-600)" : "var(--color-aqua-300)";

  return (
    <svg
      viewBox="0 0 190 40"
      className={cn("h-8 w-auto", className)}
      role="img"
      aria-label="Njord Group"
    >
      <path
        d="M4 26c4-6 8-6 12 0s8 6 12 0 8-6 12 0"
        fill="none"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="0"
        y="16"
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        fontWeight="800"
        fontSize="15"
        letterSpacing="0.5"
        fill={textColor}
      >
        NJORD
      </text>
      <text
        x="64"
        y="16"
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        fontWeight="500"
        fontSize="15"
        letterSpacing="0.5"
        fill={accentColor}
      >
        GROUP
      </text>
    </svg>
  );
}
