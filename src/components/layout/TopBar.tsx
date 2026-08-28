import { Phone, MessageCircle, Mail } from "lucide-react";
import { company } from "@/content/company";

export function TopBar() {
  return (
    <div className="hidden h-10 items-center bg-njord-950 text-white/80 md:flex">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-8 text-[13px] lg:px-12">
        <span>Международная логистика Азия — Европа — Россия</span>
        <div className="flex items-center gap-5">
          <a href={company.phonePrimaryHref} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {company.phonePrimary}
          </a>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            WhatsApp
          </a>
          <a href={company.emailHref} className="flex items-center gap-1.5 hover:text-white">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {company.email}
          </a>
          <a
            href={company.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:text-aqua-300"
          >
            Личный кабинет →
          </a>
        </div>
      </div>
    </div>
  );
}
