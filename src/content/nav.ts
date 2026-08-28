import type { LucideIcon } from "lucide-react";
import { Anchor, FileCheck2, Plane, PackageSearch, Container, Truck, Warehouse } from "lucide-react";

export interface ServiceNavItem {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
}

export const serviceNavItems: ServiceNavItem[] = [
  {
    title: "Мультимодальные перевозки",
    slug: "multimodal",
    description: "Море, ж/д, авто и авиа в одном маршруте и одном договоре",
    icon: Anchor,
  },
  {
    title: "Таможенное оформление",
    slug: "customs",
    description: "Документы, расчёт пошлин и быстрый выпуск груза",
    icon: FileCheck2,
  },
  {
    title: "Авиаперевозка",
    slug: "avia",
    description: "Срочная доставка в любую точку мира",
    icon: Plane,
  },
  {
    title: "Поиск и поставка товаров",
    slug: "sourcing",
    description: "Проверенные поставщики, инспекция качества, выкуп",
    icon: PackageSearch,
  },
  {
    title: "Промышленные грузы",
    slug: "industrial",
    description: "Негабарит и тяжеловес со спецразрешениями",
    icon: Container,
  },
  {
    title: "Перевозки по России",
    slug: "domestic",
    description: "Авто и ж/д по РФ с отслеживанием",
    icon: Truck,
  },
  {
    title: "Складские услуги",
    slug: "storage",
    description: "Склады в Китае, Европе и России, консолидация",
    icon: Warehouse,
  },
];

export const mainNav = [
  { title: "Поиск рейсов", href: "/search" },
  { title: "Услуги", href: "/services" },
  { title: "Флот", href: "/fleet" },
  { title: "О компании", href: "/about" },
  { title: "Контакты", href: "/contacts" },
];

export const footerServiceLinks = serviceNavItems.map((item) => ({
  title: item.title,
  href: `/services/${item.slug}`,
}));

export const footerCompanyLinks = [
  { title: "О компании", href: "/about" },
  { title: "Флот", href: "/fleet" },
  { title: "Новости", href: "/news" },
  { title: "Контакты", href: "/contacts" },
];

export const footerServiceQuickLinks = [
  { title: "Поиск рейсов", href: "/search" },
  { title: "Отслеживание", href: "/search?tab=track" },
  { title: "Личный кабинет", href: "https://njord-portal.dev-seaportal.ru", external: true },
];
