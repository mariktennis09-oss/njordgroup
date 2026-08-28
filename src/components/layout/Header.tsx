"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Logo } from "@/components/layout/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { LeadForm } from "@/components/shared/LeadForm";
import { mainNav } from "@/content/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar />
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-ink-100 bg-white transition-[height] duration-200",
          isScrolled ? "h-16 shadow-card" : "h-[76px]",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Njord Group — на главную">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
            <Link href="/search" className="text-sm font-medium text-ink-700 hover:text-njord-600">
              Поиск рейсов
            </Link>
            <MegaMenu />
            {mainNav.slice(2).map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-ink-700 hover:text-njord-600">
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden md:inline-flex" onClick={() => setIsQuoteOpen(true)}>
              Рассчитать перевозку
            </Button>
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-sm text-ink-700 hover:bg-ink-50 lg:hidden"
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      <Dialog open={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} title="Рассчитать перевозку">
        <LeadForm variant="modal" />
      </Dialog>
    </>
  );
}
