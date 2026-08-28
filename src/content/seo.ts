export const siteConfig = {
  name: "Njord Group",
  title: "Njord Group — международная логистика Азия — Европа — Россия",
  description:
    "Морские перевозки, мультимодальная логистика, таможенное оформление и склады в Китае. Собственный флот, прямые контракты с FESCO, фиксированные ставки.",
  url: "https://njordgroup.ru",
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}
