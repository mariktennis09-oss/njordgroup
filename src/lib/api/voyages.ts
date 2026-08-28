import { mockVoyages, type Voyage } from "@/lib/mock/voyages";
import type { VoyageSearchValues } from "@/lib/validation";

export interface VoyageSearchResult {
  voyages: Voyage[];
  isDemoData: boolean;
}

/**
 * TODO(integration): подключить реальный API поиска рейсов портала
 * njord-portal.dev-seaportal.ru, когда команда подтвердит наличие эндпоинта
 * (см. project-memory "Njord: хостинг и API не решены"). До тех пор отдаём
 * демо-данные из lib/mock/voyages.ts — интерфейс функции менять не нужно,
 * достаточно заменить реализацию на fetch к реальному API.
 */
export async function searchVoyages(params: VoyageSearchValues): Promise<VoyageSearchResult> {
  const filtered = mockVoyages.filter((voyage) => {
    const matchesContainer = voyage.containerType === params.containerType;
    return matchesContainer || params.containerType === undefined;
  });

  return {
    voyages: filtered.length > 0 ? filtered : mockVoyages,
    isDemoData: true,
  };
}
