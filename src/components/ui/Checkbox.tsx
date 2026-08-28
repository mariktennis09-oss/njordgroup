import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  error?: string;
  tone?: "light" | "dark";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, tone = "light", className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 rounded-xs border border-ink-300 accent-njord-600",
              "focus:outline-none focus:ring-2 focus:ring-aqua-500",
              error && "border-danger",
              className,
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn("text-sm leading-snug", tone === "dark" ? "text-white/70" : "text-ink-700")}
          >
            {label}
          </label>
        </div>
        {error && (
          <span
            id={errorId}
            className={cn("text-xs pl-7", tone === "dark" ? "text-danger-soft" : "text-danger")}
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
