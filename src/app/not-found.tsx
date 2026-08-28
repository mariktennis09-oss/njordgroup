import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-overline text-njord-600">404</p>
      <h1 className="text-h1">Страница не найдена</h1>
      <p className="max-w-md text-ink-700">
        Возможно, страница была перемещена или адрес указан неверно. Проверьте раздел ниже.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/">На главную</Button>
        <Button href="/services" variant="secondary">
          Услуги
        </Button>
        <Button href="/contacts" variant="secondary">
          Контакты
        </Button>
      </div>
    </Container>
  );
}
