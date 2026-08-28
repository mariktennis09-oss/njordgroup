import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { YandexMetrika } from "@/components/layout/YandexMetrika";
import { siteConfig } from "@/content/seo";
import { company, offices } from "@/content/company";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  // images здесь намеренно не задаются: превью берётся из файловой конвенции
  // app/opengraph-image.tsx (настоящий PNG). Явный images перебил бы её.
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: company.phonePrimary,
      contactType: "sales",
      email: company.email,
      areaServed: "RU",
      availableLanguage: "Russian",
    },
  ],
  address: offices.map((office) => ({
    "@type": "PostalAddress",
    addressLocality: office.city,
    streetAddress: office.address,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-njord-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержимому
        </a>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieNotice />
        <YandexMetrika />
      </body>
    </html>
  );
}
