"use client";

import { useTranslations } from "next-intl";

type PageHeroProps = {
  kickerKey?: string; // small label
  titleKey: string; // main title
  height?: number; // vh
};

export default function PageHero({
  kickerKey = "kicker",
  titleKey,
  height = 50,
}: PageHeroProps) {
  const t = useTranslations("BasicHero");

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-800 text-white"
      style={{ height: `${height}vh` }}
    >
      {/* angled slab (hidden on mobile) */}
      <div
        className="absolute inset-y-0 left-0 hidden md:block"
        style={{
          width: "85%",
          background: "#E0B400",
          clipPath: "polygon(0 0, 72% 0, 95% 100%, 0% 100%)",
        }}
        aria-hidden
      />
      {/* content */}
      <div className="relative flex h-full items-center px-4 md:px-6">
        <div className="max-w-none md:pl-24">
          <p className="mb-2 text-xl font-extrabold tracking-wider text-neutral-900/90 md:text-4xl">
            {t(kickerKey)}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            {t(titleKey)}
          </h1>
        </div>
      </div>
    </section>
  );
}
