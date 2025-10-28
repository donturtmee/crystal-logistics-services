import { useTranslations } from "next-intl";

import Navbar from "@/components/site/Navbar";
import BasicHero from "@/components/site/BasicHero";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <Navbar />
      <BasicHero titleKey="subtitle.about" />
    </>
  );
}
