export interface TradeRoute {
  from: string;
  to: string;
  transport: string;
  transitTime: string;
}

export const routes: TradeRoute[] = [
  {
    from: "Китай",
    to: "Россия",
    transport: "море + ж/д",
    transitTime: "25–35 суток",
  },
  {
    from: "Юго-Восточная Азия",
    to: "Северо-Запад РФ",
    transport: "море",
    transitTime: "30–40 суток",
  },
  {
    from: "Европа",
    to: "Калининград / Санкт-Петербург",
    transport: "море + авто",
    transitTime: "5–10 суток",
  },
  {
    from: "Порты РФ",
    to: "внутренние регионы",
    transport: "авто / ж/д",
    transitTime: "1–7 суток",
  },
];
