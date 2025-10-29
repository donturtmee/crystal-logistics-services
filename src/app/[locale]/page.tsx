import { useTranslations } from "next-intl";

import BasicHero from "@/components/site/BasicHero";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <BasicHero titleKey="subtitle.about" />
    </>
  );
}
