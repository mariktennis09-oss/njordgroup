import { cn } from "@/lib/utils";

export function SectionHeading({
  overline,
  title,
  lead,
  align = "left",
  tone = "default",
  className,
}: {
  overline?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "default" | "on-dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {overline && (
        <p className={cn("text-overline mb-3", tone === "on-dark" ? "text-aqua-300" : "text-njord-600")}>
          {overline}
        </p>
      )}
      <h2 className={cn("text-h2", tone === "on-dark" && "text-white")}>{title}</h2>
      {lead && (
        <p className={cn("text-lead mt-4", tone === "on-dark" ? "text-njord-100" : "text-ink-700")}>{lead}</p>
      )}
    </div>
  );
}
