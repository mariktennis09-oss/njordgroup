"use client";

import { useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  label: string;
  options: ComboboxOption[];
  placeholder?: string;
  error?: string;
  name?: string;
  defaultValue?: string;
  widgetSize?: "widget" | "form";
  onChange?: (value: string) => void;
}

export function Combobox({
  label,
  options,
  placeholder = "Начните вводить название",
  error,
  name,
  defaultValue,
  widgetSize = "form",
  onChange,
}: ComboboxProps) {
  const generatedId = useId();
  const initialOption = options.find((o) => o.value === defaultValue);
  const [query, setQuery] = useState(initialOption?.label ?? "");
  const [selected, setSelected] = useState(defaultValue ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(q));
  }, [options, query]);

  function commit(option: ComboboxOption) {
    setSelected(option.value);
    setQuery(option.label);
    setIsOpen(false);
    setActiveIndex(-1);
    onChange?.(option.value);
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (containerRef.current?.contains(event.relatedTarget as Node)) return;
    setIsOpen(false);
    const matched = options.find((o) => o.label === query);
    if (!matched) {
      setQuery(selected ? (options.find((o) => o.value === selected)?.label ?? "") : "");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      if (isOpen && activeIndex >= 0 && filtered[activeIndex]) {
        event.preventDefault();
        commit(filtered[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const listboxId = `${generatedId}-listbox`;

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5" onBlur={handleBlur}>
      <label htmlFor={generatedId} className="text-sm font-medium text-ink-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={generatedId}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected("");
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-invalid={Boolean(error)}
          className={cn(
            "w-full rounded-sm border border-ink-300 bg-white px-4 pr-10 text-ink-900 placeholder:text-ink-500",
            "hover:border-njord-400 focus:border-njord-600 focus:outline-none focus:ring-2 focus:ring-aqua-500",
            "transition-colors duration-150",
            widgetSize === "widget" ? "h-14" : "h-12",
            error && "border-danger focus:border-danger",
          )}
        />
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
        />
        {isOpen && filtered.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute z-20 mt-1.5 max-h-64 w-full overflow-auto rounded-sm border border-ink-100 bg-white py-1 shadow-card"
          >
            {filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={option.value === selected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(option);
                }}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-sm text-ink-900",
                  index === activeIndex ? "bg-njord-50 text-njord-900" : "hover:bg-ink-50",
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {name && <input type="hidden" name={name} value={selected} />}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
