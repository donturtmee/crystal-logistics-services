"use client";

import { useState } from "react";
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
import {
  Mail,
  Phone,
  Menu,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";

type NavbarProps = {
  logoSrc?: string;
  logo?: React.ReactNode;
  logoHref?: string;
};

type NavItem = {
  href: string;
  labelKey: string;
  submenu?: { href: string; label: string; submenu?: { href: string; label: string }[] }[];
};

const NAV: NavItem[] = [
  { href: "/bursa", labelKey: "nav.bursa" },
  {
    href: "/transport",
    labelKey: "nav.transport",
    submenu: [
      {
        href: "/transport/rutier",
        label: "Transport Rutier",
        submenu: [
          { href: "/transport/rutier/armament", label: "Transport Armament" },
          { href: "/transport/rutier/bursa", label: "Bursa de Transport" },
        ],
      },
      { href: "/transport/maritim", label: "Transport Maritim" },
      { href: "/transport/aerian", label: "Transport Aerian" },
      { href: "/transport/feroviar", label: "Transport Feroviar" },
    ],
  },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMain, setOpenMain] = useState<string | null>(null); // nivel 1
  const [openSub, setOpenSub] = useState<string | null>(null);   // nivel 2

  const toggleMain = (href: string) =>
      setOpenMain((prev) => (prev === href ? null : href));

  const toggleSub = (href: string) =>
      setOpenSub((prev) => (prev === href ? null : href));

  return (
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-900 text-white">
        <div className="grid h-20 w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 xl:px-10">
          {/* === LOGO === */}
          <Link href={logoHref} aria-label={t("a11y.home")} className="flex items-center">
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

          {/* === DESKTOP NAV === */}
          <nav className="hidden lg:flex w-full justify-center relative z-50">
            <ul className="flex items-center gap-12">
              {NAV.map((item) => {
                const active = pathname?.startsWith(item.href);
                return (
                    <li
                        key={item.href}
                        className="relative group"
                        onMouseEnter={(e) => e.currentTarget.classList.add("open")}
                        onMouseLeave={(e) => e.currentTarget.classList.remove("open")}
                    >
                      <Link
                          href={item.href}
                          className={`text-base font-semibold tracking-wide transition-colors hover:text-[#F4BD19] ${
                              active ? "text-[#F4BD19]" : "text-white/80"
                          }`}
                      >
                        {t(item.labelKey)}
                      </Link>

                      {/* === SUBMENU LEVEL 1 === */}
                      {item.submenu && (
                          <div
                              className="
                        invisible opacity-0 absolute left-0 top-full mt-0
                        group-[.open]:visible group-[.open]:opacity-100
                        transition-all duration-300 ease-out
                        bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg
                        min-w-[220px] py-2
                      "
                          >
                            {item.submenu.map((sub) => (
                                <div key={sub.href} className="relative group/sub">
                                  <Link
                                      href={sub.href}
                                      className="
                              block px-4 py-2 text-sm text-[#F4BD19]
                              hover:bg-neutral-800 hover:text-white
                              transition-colors duration-200 flex justify-between items-center
                            "
                                  >
                                    {sub.label}
                                    {sub.submenu && (
                                        <ChevronDown className="h-4 w-4 rotate-[-90deg] opacity-60 group-hover/sub:opacity-100 transition" />
                                    )}
                                  </Link>

                                  {/* === SUBMENU LEVEL 2 === */}
                                  {sub.submenu && (
                                      <div
                                          className="
                                absolute left-full top-0 ml-1
                                bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg
                                min-w-[200px] py-2
                                opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible
                                transition-all duration-300 ease-out
                              "
                                      >
                                        {sub.submenu.map((deep) => (
                                            <Link
                                                key={deep.href}
                                                href={deep.href}
                                                className="block px-4 py-2 text-sm text-[#F4BD19] hover:bg-neutral-800 hover:text-white transition"
                                            >
                                              {deep.label}
                                            </Link>
                                        ))}
                                      </div>
                                  )}
                                </div>
                            ))}
                          </div>
                      )}
                    </li>
                );
              })}
            </ul>
          </nav>

          {/* === DESKTOP ACTIONS === */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
                href="/cotatie"
                className="relative overflow-hidden group inline-flex items-center gap-2
              border border-yellow-400 rounded-full
              px-5 py-2 text-base font-semibold
              bg-yellow-400 text-[#000]
              transition-all duration-300"
            >
            <span
                className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100
                transition-transform duration-500 ease-out"
            ></span>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-[#000] transition-colors duration-300">
              {t("cta.quote")} <ArrowUpRight className="h-5 w-5" />
            </span>
            </Link>

            <Link href="tel:+40123456789" className="rounded-full p-2.5 hover:bg-white/10">
              <Phone className="h-6 w-6" />
            </Link>
            <Link href="mailto:office@exemplu.ro" className="rounded-full p-2.5 hover:bg-white/10">
              <Mail className="h-6 w-6" />
            </Link>

            <LocaleSwitcher hideEmoji />
          </div>

          {/* === MOBILE NAV === */}
          <div className="flex lg:hidden items-center justify-end gap-2">
            <Link
                href="/cotatie"
                className="inline-flex items-center rounded-lg bg-[#E0B400] px-3.5 py-2 text-base font-semibold text-black hover:bg-[#F2C200]"
            >
              {t("cta.short")}
              <ArrowUpRight className="ml-1 h-5 w-5" />
            </Link>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                {!isMenuOpen && (
                    <button
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10"
                        aria-label={t("a11y.menu")}
                    >
                      <Menu className="h-7 w-7" />
                    </button>
                )}
              </SheetTrigger>

              <SheetContent
                  side="left"
                  className="h-screen w-screen bg-neutral-900 text-white px-8 pt-8 border-none"
              >
                <SheetHeader className="mb-5">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <Image
                        src={logoSrc}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                    />
                    <span className="font-semibold">{t("menu.title")}</span>
                  </SheetTitle>
                </SheetHeader>

                {/* === MOBILE NAV LIST === */}
                <nav>
                  <ul className="space-y-2">
                    {NAV.map((item) => {
                      const active = pathname?.startsWith(item.href);
                      return (
                          <li key={item.href}>
                            {item.submenu ? (
                                <>
                                  <button
                                      onClick={() => toggleMain(item.href)}
                                      className={`w-full flex items-center justify-between rounded-lg px-3.5 py-2.5 text-lg font-medium hover:bg-white/10 ${
                                          active ? "bg-white/10" : ""
                                      }`}
                                  >
                                    {t(item.labelKey)}
                                    <ChevronDown
                                        className={`h-5 w-5 transition-transform ${
                                            openMain === item.href ? "rotate-180" : ""
                                        }`}
                                    />
                                  </button>

                                  {openMain === item.href && (
                                      <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                                        {item.submenu.map((sub) => (
                                            <li key={sub.href}>
                                              {sub.submenu ? (
                                                  <>
                                                    <button
                                                        onClick={() => toggleSub(sub.href)}
                                                        className="w-full flex items-center justify-between px-3 py-1.5 text-base text-[#F4BD19] hover:text-white transition"
                                                    >
                                                      {sub.label}
                                                      <ChevronDown
                                                          className={`h-4 w-4 transition-transform ${
                                                              openSub === sub.href ? "rotate-180" : ""
                                                          }`}
                                                      />
                                                    </button>
                                                    {openSub === sub.href && (
                                                        <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                                                          {sub.submenu.map((deep) => (
                                                              <li key={deep.href}>
                                                                <Link
                                                                    href={deep.href}
                                                                    className="block px-3 py-1.5 text-base text-[#F4BD19] hover:text-white transition"
                                                                >
                                                                  {deep.label}
                                                                </Link>
                                                              </li>
                                                          ))}
                                                        </ul>
                                                    )}
                                                  </>
                                              ) : (
                                                  <Link
                                                      href={sub.href}
                                                      className="block px-3 py-1.5 text-base text-[#F4BD19] hover:text-white transition"
                                                  >
                                                    {sub.label}
                                                  </Link>
                                              )}
                                            </li>
                                        ))}
                                      </ul>
                                  )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`block rounded-lg px-3.5 py-2.5 text-lg font-medium hover:bg-white/10 ${
                                        active ? "bg-white/10" : ""
                                    }`}
                                >
                                  {t(item.labelKey)}
                                </Link>
                            )}
                          </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* === DRAWER ACTIONS === */}
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

                  {/* === LIMBA PE UN SINGUR RÂND === */}
                  <div className="rounded-lg border border-white/10 p-3.5 flex items-center justify-between">
                    <p className="text-sm text-white/60">{t("labels.language")}</p>
                    <div className="flex gap-3">
                      <LocaleSwitcher hideEmoji />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
  );
}
