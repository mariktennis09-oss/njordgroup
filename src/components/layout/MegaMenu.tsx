"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { serviceNavItems } from "@/content/nav";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openWithDelay() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  }

  function closeWithDelay() {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") setIsOpen(false);
  }

  const [left, right] = [serviceNavItems.slice(0, 4), serviceNavItems.slice(4)];

  return (
    <div
      className="relative"
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(event) => {
          // detail === 0 значит активация с клавиатуры (Enter/Space) — там нет
          // предшествующего onMouseEnter, поэтому переключаем открыт/закрыт.
          // Реальный клик мышью почти всегда приходит поверх уже открытого по
          // hover меню — просто держим его открытым, а не закрываем случайно.
          if (event.detail === 0) {
            setIsOpen((v) => !v);
          } else {
            setIsOpen(true);
          }
        }}
        className="flex items-center gap-1 py-2 text-sm font-medium text-ink-700 hover:text-njord-600"
      >
        Услуги
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-30 w-[min(880px,90vw)] -translate-x-1/2 pt-3">
          <div className="grid grid-cols-[1fr_320px] overflow-hidden rounded-lg border border-ink-100 bg-white shadow-widget">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 p-6">
              {[left, right].map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col">
                  {col.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className="flex items-start gap-3 rounded-md p-3 hover:bg-njord-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-njord-50 text-njord-600">
                        <item.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink-900">{item.title}</span>
                        <span className="block text-xs text-ink-500">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="relative flex flex-col justify-end bg-njord-900 p-6">
              <Image
                src="/images/megamenu-vessel.svg"
                alt=""
                fill
                aria-hidden
                className="object-cover opacity-40"
              />
              <div className="relative">
                <p className="text-sm text-njord-100">Собственный флот на маршрутах Азия — Европа — Россия</p>
                <Link
                  href="/services"
                  className="mt-3 inline-block text-sm font-semibold text-white hover:text-aqua-300"
                  onClick={() => setIsOpen(false)}
                >
                  Все услуги →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
