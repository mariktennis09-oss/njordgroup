export interface FleetSpec {
  label: string;
  value: string;
}

export interface Vessel {
  slug: string;
  name: string;
  type: string;
  imo: string;
  homePort: string;
  image: string;
  summary: string;
  specs: FleetSpec[];
  description: string;
}

export const vessels: Vessel[] = [
  {
    slug: "tiksi",
    name: "Тикси",
    type: "Универсальный сухогруз",
    imo: "8821802",
    homePort: "Архангельск",
    image: "/images/fleet-tiksi.svg",
    summary: "Дедвейт 11 860–12 239 т, грузовая вместимость 14 870 м³",
    specs: [
      { label: "IMO", value: "8821802" },
      { label: "Порт приписки", value: "Архангельск" },
      { label: "Дедвейт", value: "11 860–12 239 т" },
      { label: "Грузовая вместимость", value: "14 870 м³" },
      { label: "Краны", value: "3 × 40 т, вылет до 24 м" },
      { label: "Трюмы", value: "3, со стальными люковыми крышками" },
    ],
    description:
      "Универсальный сухогруз для генеральных и навалочных грузов на линии Азия — Европа — Россия. Три трюма со стальными люковыми крышками и три крана грузоподъёмностью по 40 тонн с вылетом стрелы до 24 метров позволяют работать без береговой техники в портах с ограниченной инфраструктурой.",
  },
  {
    slug: "reo-konstanta",
    name: "РЭО Константа",
    type: "Универсальное судно для леса и генеральных грузов",
    imo: "8711289",
    homePort: "—",
    image: "/images/fleet-reo-konstanta.svg",
    summary: "Дедвейт 7 060–7 365 т, вместимость 10 022–10 475 м³",
    specs: [
      { label: "IMO", value: "8711289" },
      { label: "Дедвейт", value: "7 060–7 365 т" },
      { label: "Грузовая вместимость", value: "10 022–10 475 м³" },
      { label: "Трюмы", value: "4" },
      { label: "Краны", value: "Спарка 40 т" },
      { label: "Высота мачт", value: "36,7 м" },
    ],
    description:
      "Универсальное судно для перевозки леса и генеральных грузов. Четыре трюма и краны спаркой грузоподъёмностью 40 тонн закрывают маршруты, где требуется погрузка длинномерных и штучных грузов без специализированного терминала.",
  },
];
