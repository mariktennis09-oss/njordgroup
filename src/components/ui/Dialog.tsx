"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Обёртка над нативным <dialog>: Esc, фокус-трэп и backdrop даёт браузер,
 * не нужна сторонняя библиотека модалок.
 */
export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto w-[min(560px,92vw)] rounded-lg border border-ink-100 p-0 shadow-widget backdrop:bg-ink-900/50",
        className,
      )}
      aria-labelledby="dialog-title"
    >
      <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
        <h2 id="dialog-title" className="text-h3">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="rounded-sm p-1.5 text-ink-500 hover:bg-ink-50 hover:text-ink-900"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="px-6 py-6">{children}</div>
    </dialog>
  );
}
