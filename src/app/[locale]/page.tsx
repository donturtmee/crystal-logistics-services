import { useTranslations } from "next-intl";

import BasicHero from "@/components/site/BasicHero";
import Footer from "@/components/site/Footer";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <BasicHero titleKey="subtitle.about" />
        <Footer/>
    </>
  );
}
