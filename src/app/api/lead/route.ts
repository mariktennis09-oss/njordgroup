import { NextResponse } from "next/server";
import { z } from "zod";

const leadPayloadSchema = z.object({
  formVariant: z.enum(["inline", "modal", "sidebar", "callback", "quote"]),
  name: z.string().trim().min(2).max(200).optional(),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

// Простое ограничение частоты отправки в памяти процесса. Достаточно для
// одного инстанса Node; при развёртывании за балансировщиком с несколькими
// инстансами перенести на общее хранилище (Redis) — сейчас это не требуется.
const submissionsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Слишком много запросов" }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = leadPayloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Некорректные данные формы" }, { status: 400 });
  }

  if (parsed.data.website) {
    // Honeypot заполнен ботом — отвечаем успехом, чтобы не выдавать защиту.
    return NextResponse.json({ ok: true });
  }

  // TODO(integration): отправить заявку в CRM/почту/Bitrix. Использовать
  // process.env для ключей и адресов — не хардкодить секреты в коде.
  console.info("[lead]", { ...parsed.data, ip, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
