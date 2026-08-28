import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FaqAccordion({
  items,
  name,
  title = "Частые вопросы",
}: {
  items: AccordionItem[];
  name: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading title={title} />
      <Accordion items={items} name={name} />
    </div>
  );
}
