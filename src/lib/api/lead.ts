/**
 * Единая точка отправки заявок. При смене хостинга (см. project-memory
 * "Njord: хостинг и API не решены") достаточно поменять
 * NEXT_PUBLIC_LEAD_ENDPOINT — формы менять не нужно.
 */
const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "/api/lead";

export interface LeadSubmitPayload {
  formVariant: "inline" | "modal" | "sidebar" | "callback" | "quote";
  [key: string]: unknown;
}

export interface LeadSubmitResult {
  ok: boolean;
  error?: string;
}

export async function submitLead(payload: LeadSubmitPayload): Promise<LeadSubmitResult> {
  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Не удалось отправить заявку. Проверьте соединение." };
  }
}
