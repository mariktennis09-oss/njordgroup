"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import { mainNav, serviceNavItems } from "@/content/nav";
import { company } from "@/content/company";
import { Button } from "@/components/ui/Button";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white md:hidden">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <span className="text-sm font-semibold text-ink-900">Меню</span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-sm text-ink-700 hover:bg-ink-50"
          aria-label="Закрыть меню"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-5 py-2">
        <Link
          href="/search"
          onClick={onClose}
          className="flex h-14 items-center border-b border-ink-100 text-sm font-medium text-ink-900"
        >
          Поиск рейсов
        </Link>

        <details className="border-b border-ink-100">
          <summary className="flex h-14 cursor-pointer list-none items-center justify-between text-sm font-medium text-ink-900 marker:content-none">
            Услуги
            <ChevronDown className="h-4 w-4" aria-hidden />
          </summary>
          <div className="flex flex-col pb-2">
            {serviceNavItems.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                onClick={onClose}
                className="flex h-12 items-center pl-3 text-sm text-ink-700"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </details>

        {mainNav.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex h-14 items-center border-b border-ink-100 text-sm font-medium text-ink-900"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-3 border-t border-ink-100 px-5 py-5">
        <a href={company.phonePrimaryHref} className="flex items-center gap-2 text-sm text-ink-900">
          <Phone className="h-4 w-4 text-njord-600" aria-hidden />
          {company.phonePrimary}
        </a>
        <a
          href={company.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-ink-900"
        >
          <MessageCircle className="h-4 w-4 text-njord-600" aria-hidden />
          WhatsApp
        </a>
        <Button href="/contacts" onClick={onClose} className="mt-2 w-full">
          Оставить заявку
        </Button>
      </div>
    </div>
  );
}
