import React from "react";

type SlantedHeaderProps = {
  eyebrow?: string;
  title: string;
  bgClassName?: string; // ex: "bg-amber-400"
  angleColorClassName?: string; // ex: "bg-neutral-800"
  desktopMinHeightClassName?: string; // ex: "md:min-h-[33vh]"
};

export default function SlantedHeader({
  eyebrow,
  title,
  bgClassName = "bg-amber-400",
  angleColorClassName = "bg-neutral-800",
  desktopMinHeightClassName = "md:min-h-[33vh]",
}: SlantedHeaderProps) {
  return (
    <header
      className={[
        "relative w-full",
        bgClassName,
        "text-neutral-900",
        "min-h-[28vh]",
        desktopMinHeightClassName,
      ].join(" ")}
    >
      {/* panoul în unghi - doar desktop */}
      <div
        className={`pointer-events-none absolute inset-0 hidden md:block ${angleColorClassName}`}
        style={{ clipPath: "polygon(60% 0%, 100% 0%, 100% 100%)" }}
        aria-hidden
      />

      {/* conținut centrat */}
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex h-full min-h-[28vh] md:min-h-[33vh] items-center justify-center md:justify-start py-10 md:py-0">
          <div className="text-center md:text-left">
            {eyebrow ? (
              <div className="text-base md:text-lg font-semibold tracking-wide text-neutral-900/90">
                <span>/ </span>
                <span>{eyebrow}</span>
                <span> /</span>
              </div>
            ) : null}

            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
