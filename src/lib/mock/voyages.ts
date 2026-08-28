export interface Voyage {
  id: string;
  vesselName: string;
  originPort: string;
  destinationPort: string;
  departureDate: string; // ISO
  arrivalDate: string; // ISO
  transitDays: number;
  containerType: string;
  rateUsd: number;
}

// Демо-данные для витрины поиска рейсов. Реальный источник данных —
// см. lib/api/voyages.ts (TODO: подключить API портала njord-portal).
export const mockVoyages: Voyage[] = [
  {
    id: "v-1001",
    vesselName: "Тикси",
    originPort: "Шанхай",
    destinationPort: "Санкт-Петербург",
    departureDate: "2026-09-03",
    arrivalDate: "2026-10-02",
    transitDays: 29,
    containerType: "40HC",
    rateUsd: 2450,
  },
  {
    id: "v-1002",
    vesselName: "РЭО Константа",
    originPort: "Нинбо",
    destinationPort: "Калининград",
    departureDate: "2026-09-06",
    arrivalDate: "2026-10-12",
    transitDays: 36,
    containerType: "40DC",
    rateUsd: 2200,
  },
  {
    id: "v-1003",
    vesselName: "Тикси",
    originPort: "Циндао",
    destinationPort: "Санкт-Петербург",
    departureDate: "2026-09-10",
    arrivalDate: "2026-10-08",
    transitDays: 28,
    containerType: "20DC",
    rateUsd: 1850,
  },
  {
    id: "v-1004",
    vesselName: "РЭО Константа",
    originPort: "Гуанчжоу",
    destinationPort: "Калининград",
    departureDate: "2026-09-15",
    arrivalDate: "2026-10-24",
    transitDays: 39,
    containerType: "40HC",
    rateUsd: 2600,
  },
];
