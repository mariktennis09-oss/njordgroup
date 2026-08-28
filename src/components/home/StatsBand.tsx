import { Section } from "@/components/shared/Section";
import { Stat } from "@/components/shared/Stat";
import { stats } from "@/content/company";

export function StatsBand() {
  const resolvedStats = stats.filter(
    (stat): stat is typeof stat & { value: number } => stat.value !== null,
  );

  if (resolvedStats.length === 0) return null;

  return (
    <Section tone="muted" className="py-12 lg:py-16">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {resolvedStats.map((stat) => (
          <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </Section>
  );
}
