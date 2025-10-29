import SlantedHeader from "@/components/SlantedHeader";
import WhyUsSection from "@/components/about/WhyUsSection";
import VerticalVideo from "@/components/about/VerticalVideo";
export default function AboutPage() {
  return (
    <main>
      <SlantedHeader
        eyebrow="DESPRE"
        title="CRYSTAL LOGISTICS"
        bgClassName="bg-amber-400"
        angleColorClassName="bg-neutral-800" // se ascunde pe mobil
        desktopMinHeightClassName="min-h-[33vh]"
      />
      <WhyUsSection
        ctaHref="/cerere-oferta"
        video={
          <VerticalVideo
            srcWebm="/videos/about.webm"
            srcMp4="/videos/about.mp4"
            poster="/media/crystal-clip-poster.jpg"
            className="mx-auto w-full max-w-sm lg:ml-auto"
            loop={false}
            muted={false}
            nativeControls={true}
          />
        }
      />
    </main>
  );
}
