import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";

type Tone = "white" | "muted" | "dark" | "brand";

const tones: Record<Tone, string> = {
  white: "bg-white",
  muted: "bg-njord-50",
  dark: "bg-njord-900 text-white",
  brand: "bg-njord-600 text-white",
};

export function Section({
  children,
  tone = "white",
  className,
  containerClassName,
  as: As = "section",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
}) {
  return (
    <As className={cn("py-16 md:py-24 lg:py-32", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </As>
  );
}
