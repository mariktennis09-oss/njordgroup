export interface PortOption {
  value: string;
  label: string;
}

export const originPorts: PortOption[] = [
  { value: "shanghai", label: "Шанхай, Китай" },
  { value: "ningbo", label: "Нинбо, Китай" },
  { value: "qingdao", label: "Циндао, Китай" },
  { value: "guangzhou", label: "Гуанчжоу, Китай" },
  { value: "shenzhen", label: "Шэньчжэнь, Китай" },
  { value: "hamburg", label: "Гамбург, Германия" },
  { value: "rotterdam", label: "Роттердам, Нидерланды" },
];

export const destinationPorts: PortOption[] = [
  { value: "spb", label: "Санкт-Петербург, Россия" },
  { value: "kaliningrad", label: "Калининград, Россия" },
  { value: "novorossiysk", label: "Новороссийск, Россия" },
  { value: "vladivostok", label: "Владивосток, Россия" },
];

export const containerTypeOptions = [
  { value: "20DC", label: "20' DC — стандартный" },
  { value: "40DC", label: "40' DC — стандартный" },
  { value: "40HC", label: "40' HC — увеличенный по высоте" },
  { value: "20RF", label: "20' RF — рефрижератор" },
  { value: "40RF", label: "40' RF — рефрижератор" },
  { value: "general", label: "Генеральный груз" },
  { value: "oversized", label: "Негабарит" },
];

export const ownerTypeOptions = [
  { value: "COC", label: "COC — контейнер перевозчика" },
  { value: "SOC", label: "SOC — контейнер отправителя" },
];
