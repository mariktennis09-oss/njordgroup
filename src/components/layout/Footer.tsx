import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/shared/Container";
import { LeadForm } from "@/components/shared/LeadForm";
import { footerServiceLinks, footerCompanyLinks, footerServiceQuickLinks } from "@/content/nav";
import { company, offices } from "@/content/company";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-njord-950 text-white/80">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 md:grid-cols-3 lg:grid-cols-5 lg:py-20">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <Logo variant="light" />
          <p className="text-sm text-white/60">
            Морские, мультимодальные и таможенные решения для грузов между Азией, Европой и Россией.
          </p>
          <div className="mt-2 border-t border-white/10 pt-5">
            <h3 className="text-sm font-semibold text-white">Заказать звонок</h3>
            <p className="mt-1 text-sm text-white/60">Перезвоним в рабочее время.</p>
            <LeadForm variant="callback" tone="dark" className="mt-4" />
          </div>
        </div>

        <FooterColumn title="Услуги" links={footerServiceLinks} />
        <FooterColumn title="Компания" links={footerCompanyLinks} />
        <FooterColumn
          title="Сервисы"
          links={footerServiceQuickLinks.map((link) => ({ title: link.title, href: link.href }))}
        />

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white">Контакты</h3>
          {offices.map((office) => (
            <div key={office.city} className="text-sm text-white/70">
              <p className="font-medium text-white/90">{office.city}</p>
              <a href={office.phoneHref} className="mt-1 flex items-center gap-2 hover:text-white">
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {office.phone}
              </a>
            </div>
          ))}
          <a href={company.emailHref} className="flex items-center gap-2 text-sm hover:text-white">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {company.email}
          </a>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            WhatsApp
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <span>© {year} Njord Group</span>
          <div className="flex gap-5">
            <Link href="/legal/privacy" className="hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/legal/terms" className="hover:text-white">
              Пользовательское соглашение
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white">
          {link.title}
        </Link>
      ))}
    </div>
  );
}
