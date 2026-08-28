import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "success" | "error" | "info";

const icons: Record<Tone, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const styles: Record<Tone, string> = {
  success: "border-success/30 bg-success/10 text-njord-900",
  error: "border-danger/30 bg-danger/10 text-njord-900",
  info: "border-njord-300 bg-njord-50 text-njord-900",
};

const iconStyles: Record<Tone, string> = {
  success: "text-success",
  error: "text-danger",
  info: "text-njord-600",
};

export function Toast({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  const Icon = icons[tone];
  return (
    <div role="status" className={cn("flex items-start gap-3 rounded-sm border px-4 py-3.5 text-sm", styles[tone])}>
      <Icon aria-hidden className={cn("mt-0.5 h-5 w-5 shrink-0", iconStyles[tone])} />
      <span>{children}</span>
    </div>
  );
}
