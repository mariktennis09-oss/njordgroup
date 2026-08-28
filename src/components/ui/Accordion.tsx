import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items, name }: { items: AccordionItem[]; name: string }) {
  return (
    <div className="divide-y divide-ink-100 rounded-lg border border-ink-100">
      {items.map((item, index) => (
        <details key={index} name={name} className="group px-5 py-1 open:pb-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink-900 marker:content-none">
            {item.question}
            <ChevronDown
              aria-hidden
              className="h-5 w-5 shrink-0 text-njord-600 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="text-sm leading-relaxed text-ink-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
