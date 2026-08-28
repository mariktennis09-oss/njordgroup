import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { company } from "@/content/company";
import { absoluteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: "Пользовательское соглашение сайта Njord Group.",
  alternates: { canonical: "/legal/terms" },
  openGraph: { url: absoluteUrl("/legal/terms") },
};

export default function TermsPage() {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Пользовательское соглашение" }]} />
      <article className="mx-auto mt-8 flex max-w-2xl flex-col gap-6 text-ink-700">
        <h1 className="text-h1 text-ink-900">Пользовательское соглашение</h1>
        <p>
          Используя сайт njordgroup.ru (далее — «Сайт»), вы соглашаетесь с условиями настоящего
          соглашения. Если вы не согласны с условиями, пожалуйста, прекратите использование Сайта.
        </p>

        <h2 className="text-h3 text-ink-900">1. Общие положения</h2>
        <p>
          Сайт принадлежит Njord Group и предназначен для информирования пользователей об услугах
          компании, приёма заявок на перевозку и обратной связи.
        </p>

        <h2 className="text-h3 text-ink-900">2. Использование материалов сайта</h2>
        <p>
          Материалы сайта (тексты, изображения, расчёты стоимости) носят информационный характер и
          не являются публичной офертой в значении статьи 437 Гражданского кодекса РФ. Итоговые
          условия перевозки фиксируются в договоре между сторонами.
        </p>

        <h2 className="text-h3 text-ink-900">3. Формы обратной связи</h2>
        <p>
          Отправляя форму на Сайте, пользователь подтверждает достоверность указанных данных и
          согласие на обработку персональных данных в соответствии с{" "}
          <a href="/legal/privacy" className="text-njord-600 underline underline-offset-2">
            политикой конфиденциальности
          </a>
          .
        </p>

        <h2 className="text-h3 text-ink-900">4. Ответственность</h2>
        <p>
          Оператор не несёт ответственности за временную недоступность Сайта по техническим
          причинам и за содержание сайтов, на которые Сайт может ссылаться.
        </p>

        <h2 className="text-h3 text-ink-900">5. Изменение условий</h2>
        <p>
          Оператор вправе изменять условия настоящего соглашения в одностороннем порядке, публикуя
          новую редакцию на этой странице.
        </p>

        <h2 className="text-h3 text-ink-900">6. Контакты</h2>
        <p>
          По вопросам, связанным с использованием Сайта: {company.email}, {company.phonePrimary}.
        </p>
      </article>
    </Container>
  );
}
