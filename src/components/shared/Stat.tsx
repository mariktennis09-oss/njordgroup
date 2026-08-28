import { formatNumber } from "@/lib/format";

export function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-h1 text-njord-900">
        {formatNumber(value)}
        {suffix}
      </span>
      <span className="text-sm text-ink-500">{label}</span>
    </div>
  );
}
