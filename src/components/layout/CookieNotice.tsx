"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "njord-cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore — приватный режим или блокировка storage */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-100 bg-white shadow-widget">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-5 py-4 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-sm text-ink-700">
          Сайт использует файлы cookie для аналитики и корректной работы форм. Продолжая пользоваться
          сайтом, вы соглашаетесь с{" "}
          <Link href="/legal/privacy" className="text-njord-600 underline underline-offset-2">
            политикой обработки персональных данных
          </Link>
          .
        </p>
        <Button size="md" onClick={accept} className="w-full sm:w-auto shrink-0">
          Понятно
        </Button>
      </div>
    </div>
  );
}
