export const company = {
  name: "Njord Group",
  legalTagline: "Международная логистика Азия — Европа — Россия",
  phonePrimary: "+7 (4012) 27-90-91",
  phonePrimaryHref: "tel:+74012279091",
  whatsapp: "+7 (4012) 52-51-21",
  whatsappHref: "https://wa.me/74012525121",
  email: "sales@njordgroup.ru",
  emailHref: "mailto:sales@njordgroup.ru",
  portalUrl: "https://njord-portal.dev-seaportal.ru",
};

export interface OfficeInfo {
  city: string;
  isHeadquarters: boolean;
  address: string;
  phone: string;
  phoneHref: string;
  extra?: { label: string; value: string; href: string };
}

export const offices: OfficeInfo[] = [
  {
    city: "Калининград",
    isHeadquarters: true,
    address: "ул. Портовая, 2Б",
    phone: "+7 (4012) 27-90-91",
    phoneHref: "tel:+74012279091",
    extra: { label: "WhatsApp", value: "+7 (4012) 52-51-21", href: "https://wa.me/74012525121" },
  },
  {
    city: "Санкт-Петербург",
    isHeadquarters: false,
    address: "терминал ПКТ (Угольная гавань)",
    phone: "+7 (812) 992-51-21",
    phoneHref: "tel:+78129925121",
  },
];

export interface StatItem {
  label: string;
  value: number | null;
  suffix?: string;
}

// TODO(client): реальные цифры не предоставлены — на текущем сайте счётчики
// показывают нули. Пока значение null, секция StatsBand не рендерится.
// Как заполнить: см. README.md → "Как обновить данные компании".
export const stats: StatItem[] = [
  { label: "лет в управлении флотом", value: null },
  { label: "рейсов в месяц", value: null },
  { label: "клиентов", value: null, suffix: "+" },
  { label: "тонн перевезено", value: null, suffix: "+" },
];

export const microFacts = ["Собственный флот", "Прямые контракты с FESCO", "Поддержка 24/7"];
