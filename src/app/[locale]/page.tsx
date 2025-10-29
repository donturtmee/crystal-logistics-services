import { useTranslations } from "next-intl";

import Navbar from "@/components/site/Navbar";
import BasicHero from "@/components/site/BasicHero";
import Footer from "@/components/site/Footer";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <Navbar />
      <BasicHero titleKey="subtitle.about" />
        <Footer/>
    </>
  );
}
