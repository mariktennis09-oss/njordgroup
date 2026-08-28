import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink-700">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "rounded-sm border border-ink-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-500",
            "hover:border-njord-400 focus:border-njord-600 focus:outline-none focus:ring-2 focus:ring-aqua-500",
            "transition-colors duration-150 resize-y",
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

Textarea.displayName = "Textarea";
