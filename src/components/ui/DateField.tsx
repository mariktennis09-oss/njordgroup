import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface DateFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  widgetSize?: "widget" | "form";
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Нативный input[type=date]: локаль берётся из lang="ru" на <html>,
 * min не позволяет выбрать прошедшую дату. Тяжёлый календарный виджет
 * не нужен — см. раздел "Производительность" в спецификации.
 */
export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label, error, id, widgetSize = "form", className, min, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink-700">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type="date"
          min={min ?? todayIso()}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "rounded-sm border border-ink-300 bg-white px-4 text-ink-900",
            "hover:border-njord-400 focus:border-njord-600 focus:outline-none focus:ring-2 focus:ring-aqua-500",
            "transition-colors duration-150",
            widgetSize === "widget" ? "h-14" : "h-12",
            error && "border-danger focus:border-danger",
            className,
          )}
          {...props}
        />
        {error && (
          <span id={errorId} className="text-xs text-danger">
            {error}
          </span>
        )}
      </div>
    );
  },
);

DateField.displayName = "DateField";
