import { Tabs } from "@/components/ui/Tabs";
import { QuoteForm } from "@/components/home/QuoteForm";
import { VoyageSearchForm } from "@/components/home/VoyageSearchForm";
import { TrackForm } from "@/components/home/TrackForm";
import { cn } from "@/lib/utils";

export function SearchWidget({ className }: { className?: string }) {
  return (
    <div
      id="search-widget"
      className={cn(
        "rounded-xl border border-ink-100 bg-white p-5 shadow-widget sm:p-7 lg:p-8",
        className,
      )}
    >
      <Tabs
        defaultValue="quote"
        items={[
          { value: "quote", label: "Рассчитать перевозку", content: <QuoteForm /> },
          { value: "search", label: "Поиск рейсов", content: <VoyageSearchForm /> },
          { value: "track", label: "Отследить груз", content: <TrackForm /> },
        ]}
      />
    </div>
  );
}
