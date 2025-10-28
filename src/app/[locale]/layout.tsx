import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";
import { Raleway } from "next/font/google"; // 👈 import Raleway from next/font/google
import "../globals.css";

// Load Raleway with desired weights
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // customize as needed
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crystal Logistics Services",
  description: "Crystal Logistics Services",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
      <html lang={locale} className={raleway.className}>
      <body className={`${raleway.variable} antialiased`}>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
      </html>
  );
}
