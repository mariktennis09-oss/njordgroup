import { z } from "zod";

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  phone: z.string().regex(phoneRegex, "Введите телефон в формате +7 (___) ___-__-__"),
  email: z.string().trim().email("Некорректный email").optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().optional().or(z.literal("")),
  consent: z.literal(true, "Необходимо согласие на обработку персональных данных"),
  // honeypot: должно оставаться пустым, заполняется ботами
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const quoteFormSchema = z.object({
  originPort: z.string().trim().min(1, "Укажите порт отправления"),
  destinationPort: z.string().trim().min(1, "Укажите порт назначения"),
  cargoType: z.string().trim().min(1, "Укажите тип груза"),
  weightKg: z.coerce.number().positive("Укажите вес груза").optional(),
  phone: z.string().regex(phoneRegex, "Введите телефон в формате +7 (___) ___-__-__"),
  consent: z.literal(true, "Необходимо согласие на обработку персональных данных"),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const trackingFormSchema = z.object({
  trackingNumber: z.string().trim().min(3, "Укажите номер контейнера, B/L или заявки"),
});

export type TrackingFormValues = z.infer<typeof trackingFormSchema>;

const containerTypes = [
  "20DC",
  "40DC",
  "40HC",
  "20RF",
  "40RF",
  "general",
  "oversized",
] as const;

const ownerTypes = ["COC", "SOC"] as const;

export const voyageSearchSchema = z.object({
  departureDate: z.string().trim().min(1, "Укажите дату отгрузки"),
  originPort: z.string().trim().min(1, "Укажите порт отправления"),
  destinationPort: z.string().trim().min(1, "Укажите порт назначения"),
  containerType: z.enum(containerTypes),
  ownerType: z.enum(ownerTypes).optional(),
  weightKg: z.coerce.number().positive().optional(),
  hsCode: z.string().trim().optional().or(z.literal("")),
});

export type VoyageSearchValues = z.infer<typeof voyageSearchSchema>;
