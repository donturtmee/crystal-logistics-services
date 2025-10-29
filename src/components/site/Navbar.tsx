"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Mail, Phone, Menu, ArrowUpRight } from "lucide-react";
import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";

type NavbarProps = {
  logoSrc?: string;
  logo?: React.ReactNode;
  logoHref?: string;
};

type NavItem = { href: string; labelKey: string };

const NAV: NavItem[] = [
  { href: "/bursa", labelKey: "nav.bursa" },
  { href: "/transport", labelKey: "nav.transport" },
  { href: "/transportatori", labelKey: "nav.transportatori" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navbar({
  logoSrc = "/logo.svg",
  logo,
  logoHref = "/",
}: NavbarProps) {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-900 text-white">
      {/* layout grid: left logo, center nav, right actions */}
      <div className="grid h-20 w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 xl:px-10">
        {/* logo */}
        <Link
          href={logoHref}
          aria-label={t("a11y.home")}
          className="flex items-center"
        >
          {logo ? (
            <div className="h-10 w-10">{logo}</div>
          ) : (
            <Image
              src={logoSrc}
              alt="Logo"
              width={40}
              height={40}
              priority
              className="h-12 w-12"
            />
          )}
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:flex w-full justify-center">
          <ul className="flex items-center gap-12">
            {NAV.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-base font-semibold tracking-wide transition-colors hover:text-white ${
                      active ? "text-white" : "text-white/80"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* desktop actions */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Animated yellow fill button */}
          <Link
            href="/cotatie"
            className="
    relative overflow-hidden group inline-flex items-center gap-2
    border border-yellow-400 rounded-full
    px-5 py-2 text-base font-semibold
    bg-yellow-400 text-[#000]
    transition-all duration-300
  "
          >
            {/* fill layer: white fills left to right */}
            <span
              className="
      absolute inset-0 bg-white
      origin-left scale-x-0 group-hover:scale-x-100
      transition-transform duration-500 ease-out
    "
            ></span>

            {/* text layer */}
            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#000] transition-colors duration-300">
              {t("cta.quote")} <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>

          <Link
            href="tel:+40123456789"
            className="rounded-full p-2.5 hover:bg-white/10"
            aria-label={t("a11y.call")}
            title={t("a11y.call")}
          >
            <Phone className="h-6 w-6" />
          </Link>
          <Link
            href="mailto:office@exemplu.ro"
            className="rounded-full p-2.5 hover:bg-white/10"
            aria-label={t("a11y.email")}
            title={t("a11y.email")}
          >
            <Mail className="h-6 w-6" />
          </Link>

          <LocaleSwitcher />
        </div>

        {/* mobile actions */}
        <div className="flex lg:hidden items-center justify-end gap-2">
          <Link
            href="/cotatie"
            className="inline-flex items-center rounded-lg bg-[#E0B400] px-3.5 py-2 text-base font-semibold text-black hover:bg-[#F2C200]"
          >
            {t("cta.short")}
            <ArrowUpRight className="ml-1 h-5 w-5" />
          </Link>

          {/* mobile drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg白/10 hover:bg-white/10"
                aria-label={t("a11y.menu")}
              >
                <Menu className="h-7 w-7" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="h-screen w-screen bg-neutral-900 text-white px-8 pt-8 border-none"
            >
              <SheetHeader className="mb-5">
                <SheetTitle className="flex items-center gap-2 text-lg">
                  {logo ? (
                    <div className="h-10 w-10">{logo}</div>
                  ) : (
                    <Image
                      src={logoSrc}
                      alt="Logo"
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                  )}
                  <span className="font-semibold">{t("menu.title")}</span>
                </SheetTitle>
              </SheetHeader>

              {/* mobile nav list */}
              <nav>
                <ul className="space-y-2">
                  {NAV.map((item) => {
                    const active = pathname?.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block rounded-lg px-3.5 py-2.5 text-lg font-medium hover:bg-white/10 ${
                            active ? "bg-white/10" : ""
                          }`}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* drawer actions */}
              <div className="mt-7 space-y-4">
                <Button
                  asChild
                  className="w-full rounded-xl bg-[#E0B400] px-4 py-2.5 text-base text-black hover:bg-[#F2C200]"
                >
                  <Link href="/cotatie">{t("cta.quote")}</Link>
                </Button>

                <div className="flex items-center justify-between">
                  <Link
                    href="tel:+40123456789"
                    className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 hover:bg-white/10"
                  >
                    <Phone className="h-6 w-6" />
                    <span className="text-base">{t("labels.phone")}</span>
                  </Link>
                  <Link
                    href="mailto:office@exemplu.ro"
                    className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 hover:bg-white/10"
                  >
                    <Mail className="h-6 w-6" />
                    <span className="text-base">{t("labels.email")}</span>
                  </Link>
                </div>

                <div className="rounded-lg border border-white/10 p-3.5">
                  <p className="mb-2 text-sm text-white/60">
                    {t("labels.language")}
                  </p>
                  <LocaleSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
