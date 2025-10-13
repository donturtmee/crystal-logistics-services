import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ro"],

  // Used when no locale matches
  defaultLocale: "en",

  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    "/": "/",
    "/blog": "/blog",

    // If locales use different paths, you can
    // specify the relevant external pathnames
    "/services": {
      ro: "/leistungen",
    },

    // Encoding of non-ASCII characters is handled
    // automatically where relevant
    "/about": {
      ro: "/über-uns",
    },

    // Dynamic params are supported via square brackets
    "/news/[articleSlug]": {
      ro: "/neuigkeiten/[articleSlug]",
    },

    // Static pathnames that overlap with dynamic segments
    // will be prioritized over the dynamic segment
    "/news/just-in": {
      ro: "/neuigkeiten/aktuell",
    },

    // Also (optional) catch-all segments are supported
    "/categories/[...slug]": {
      ro: "/kategorien/[...slug]",
    },
  },
});
