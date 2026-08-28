import type { NextConfig } from "next";

// Редиректы со старых .php-адресов текущего сайта (проверено на живом
// njordgroup.ru перед миграцией) на новую структуру маршрутов.
// ВАЖНО: если хостинг сменится на статический экспорт (output: 'export'),
// эти редиректы перестанут работать на уровне Next.js — их нужно будет
// продублировать в конфиге веб-сервера (например, .htaccess для Apache).
const legacyRedirects = [
  ["/index.php", "/"],
  ["/service/index.php", "/services"],
  ["/service/multimodal.php", "/services/multimodal"],
  ["/service/customs.php", "/services/customs"],
  ["/service/avia.php", "/services/avia"],
  ["/service/sourcing.php", "/services/sourcing"],
  ["/service/industrial.php", "/services/industrial"],
  ["/service/domestic.php", "/services/domestic"],
  ["/service/storage.php", "/services/storage"],
  ["/fleet.php", "/fleet"],
  ["/about.php", "/about"],
  ["/contacts.php", "/contacts"],
  ["/Privacy_policy_njordgroup_ru.pdf", "/legal/privacy"],
  ["/User_agreement_njordgroup_ru.pdf", "/legal/terms"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
