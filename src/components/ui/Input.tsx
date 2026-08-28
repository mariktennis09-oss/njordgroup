import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  widgetSize?: "widget" | "form";
  tone?: "light" | "dark";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, widgetSize = "form", tone = "light", className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn("text-sm font-medium", tone === "dark" ? "text-white/80" : "text-ink-700")}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            "rounded-sm border border-ink-300 bg-white px-4 text-ink-900 placeholder:text-ink-500",
            "hover:border-njord-400 focus:border-njord-600 focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:ring-offset-0",
            "transition-colors duration-150",
            widgetSize === "widget" ? "h-14" : "h-12",
            error && "border-danger focus:border-danger",
            className,
          )}
          {...props}
        />
        {hint && !error && (
          <span id={hintId} className={cn("text-xs", tone === "dark" ? "text-white/60" : "text-ink-500")}>
            {hint}
          </span>
        )}
        {error && (
          <span id={errorId} className={cn("text-xs", tone === "dark" ? "text-danger-soft" : "text-danger")}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
