"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation";
import { formatPhoneInput } from "@/lib/format";
import { submitLead } from "@/lib/api/lead";
import { cn } from "@/lib/utils";

export type LeadFormVariant = "inline" | "modal" | "sidebar" | "callback";

export function LeadForm({
  variant,
  title,
  className,
  tone = "light",
}: {
  variant: LeadFormVariant;
  title?: string;
  className?: string;
  /** "dark" — для размещения на тёмных секциях (футер): светлые лейблы. */
  tone?: "light" | "dark";
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { name: "", phone: "+7", email: "", company: "", message: "", website: "" },
  });

  async function onSubmit(values: LeadFormValues) {
    const result = await submitLead({ formVariant: variant, ...values });
    if (result.ok) {
      setStatus("success");
      reset({ name: "", phone: "+7", email: "", company: "", message: "", website: "" });
    } else {
      setStatus("error");
    }
  }

  const isCallback = variant === "callback";

  if (status === "success") {
    return (
      <div className={className}>
        <Toast tone="success">Заявка отправлена, менеджер свяжется в течение 15 минут.</Toast>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={className}>
      <div className="flex flex-col gap-4">
        {title && <h3 className="text-h3">{title}</h3>}

        {status === "error" && <Toast tone="error">Не удалось отправить заявку. Попробуйте ещё раз.</Toast>}

        {/* honeypot — скрыто от пользователей, видно ботам */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
          {...register("website")}
        />

        {!isCallback && <Input label="Имя*" error={errors.name?.message} {...register("name")} />}

        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              label="Телефон*"
              inputMode="tel"
              tone={tone}
              placeholder="+7 (___) ___-__-__"
              error={errors.phone?.message}
              value={field.value}
              onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
              onBlur={field.onBlur}
            />
          )}
        />

        {!isCallback && (
          <>
            <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
            <Input label="Компания" error={errors.company?.message} {...register("company")} />
            <Textarea label="Сообщение" error={errors.message?.message} {...register("message")} />
          </>
        )}

        <Checkbox
          error={errors.consent?.message}
          tone={tone}
          {...register("consent")}
          label={
            <>
              Согласен на обработку персональных данных в соответствии с{" "}
              <a
                href="/legal/privacy"
                className={cn(
                  "underline underline-offset-2",
                  tone === "dark" ? "text-aqua-300" : "text-njord-600",
                )}
              >
                политикой конфиденциальности
              </a>
            </>
          }
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          variant={tone === "dark" ? "primary-on-dark" : "primary"}
          className="mt-1"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {isCallback ? "Заказать звонок" : "Отправить заявку"}
        </Button>
      </div>
    </form>
  );
}
