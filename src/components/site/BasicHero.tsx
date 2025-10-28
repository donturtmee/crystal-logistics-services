"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PageHero({ backgroundVideo = "/videos/heroVideo.webm" }) {
    const t = useTranslations("BasicHero");

    return (
        <section className="bg-neutral-900 text-white overflow-hidden">

            {/* === HERO TEXT SECTION === */}
            <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row items-start justify-between">
                <div className="flex flex-col items-start md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-regular leading-tight">
                        {t("title")}
                    </h1>
                </div>

                <div className="relative md:w-1/2 text-neutral-100 text-xl leading-relaxed mt-10 md:mt-0">
                    <p className="max-w-lg whitespace-pre-line">{t("paragraph")}</p>

                    {/* === BULINA DOAR DESKTOP === */}
                    <div className="hidden md:block absolute top-[155px] left-[70%] -translate-x-1/2 rotate-[20deg] z-20">
                        <button
                            className="
                w-32 h-32 rounded-full bg-white text-black font-medium shadow-lg
                flex items-center justify-center text-center rotate-[-45deg]
                transition-all duration-500 ease-out
                hover:bg-yellow-500 hover:text-white hover:scale-110 hover:rotate-[-40deg]
              "
                        >
                            {t("ctaPrimary")}
                        </button>
                    </div>
                </div>
            </div>

            {/* === BACKGROUND VIDEO SECTION === */}
            <div className="relative w-full h-[45vh] md:h-[70vh] overflow-hidden">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.7]"
                    src={backgroundVideo}
                    autoPlay muted loop playsInline
                />

                <div className="relative z-20 w-full h-full flex items-end">
                    {/* WRAPPER BUTOANE – MOBIL ABSOLUT / DESKTOP NORMAL */}
                    <div
                        className="
              absolute bottom-6 left-6
              flex flex-col gap-3
              md:static md:pb-[100px] md:left-auto md:bottom-auto
              md:w-full md:max-w-7xl md:mx-auto md:px-6 md:px-12
              md:flex md:flex-col md:gap-4 md:items-start
            "
                    >

                        {/* === CERE O OFERTĂ — DOAR PE TELEFON === */}
                        {/* === CERE O OFERTĂ — DOAR PE TELEFON === */}
                        <button
                            className="
    block md:hidden
    relative overflow-hidden group
    flex items-center
    border border-yellow-400 rounded-full
    px-7 py-2 text-sm font-medium
    text-black bg-yellow-400
    transition-all duration-300
    w-auto
  "
                        >
  <span
      className="
      absolute inset-0 bg-white origin-left scale-x-0
      group-hover:scale-x-100 transition-transform duration-500 ease-out
    "
  ></span>

                            {/* Text stânga */}
                            <span className="relative z-10">
    {t("ctaPrimary")}
  </span>

                            {/* Săgeata împinsă în dreapta complet */}
                            <span className="relative z-10 ml-auto pl-3 group-hover:text-black transition-colors duration-300">
    <ArrowRight size={16} />
  </span>
                        </button>


                        {/* === DEVINO PARTENER — DESKTOP + MOBIL === */}
                        <button
                            className="
                relative overflow-hidden group
                flex items-center gap-2
                border border-white/60 rounded-full
                px-7 py-2 text-sm md:text-base font-medium
                text-white transition-all duration-300
                w-auto
              "
                        >
              <span
                  className="
                  absolute inset-0 bg-yellow-400 origin-left scale-x-0
                  group-hover:scale-x-100 transition-transform duration-500 ease-out
                "
              ></span>
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                {t("ctaSecondary")} <ArrowRight size={16}/>
              </span>
                        </button>

                    </div>
                </div>
            </div>

            {/* === AI MARFĂ === */}
            <div className="bg-neutral-900 text-gray-200 py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("hasCargoTitle")}</h2>
                    <p className="mb-4 max-w-2xl">{t("hasCargoText1")}</p>
                    <p className="mb-4 max-w-2xl whitespace-pre-line">{t("hasCargoText2")}</p>
                    <p className="mb-8 max-w-2xl">{t("hasCargoText3")}</p>

                    <button
                        className="
              relative overflow-hidden group
              flex items-center gap-2 border border-white/60 rounded-full
              px-10 py-2 text-white text-sm md:text-base font-medium transition-all duration-300 w-fit
            "
                    >
                        <span className="absolute inset-0 bg-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>

                        <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              {t("fillForm")}
                            <ArrowRight size={16} />
            </span>
                    </button>
                </div>
            </div>

            {/* === SERVICII === */}
            <section className="bg-neutral-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12">

                    <div className="flex items-center justify-center gap-6 mb-16">
                        <span className="block h-[2px] w-16 bg-yellow-500"></span>
                        <h2 className="text-center text-4xl md:text-5xl font-normal">Servicii</h2>
                        <span className="block h-[2px] w-16 bg-yellow-500"></span>
                    </div>

                    {/* Fade-in Card Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.18 } }
                        }}
                        className="grid md:grid-cols-2 gap-10"
                    >
                        {[
                            {
                                img: "/images/rutier.webp",
                                title: "Transport Rutier",
                                link: "/servicii/transport-rutier",
                                desc: `Serviciile de transport marfă acoperă o gamă completă de soluții adaptate nevoilor fiecărui client de la transport intern marfă până la rute europene.

Asigurăm transport rutier pentru mărfuri generale, transport agabaritic, marfă ADR, frigorifică, cisterne sau basculante.`,
                            },
                            {
                                img: "/images/maritim.webp",
                                title: "Transport Maritim",
                                link: "/servicii/transport-maritim",
                                desc: `Soluțiile de transport marfă pe cale maritimă sunt ideale pentru volume mari, containere sau transport în vrac, către și dinspre principalele porturi comerciale.

Sunt incluse servicii de încărcare, documentație vamală, urmărire și asigurare opțională.`,
                            },
                            {
                                img: "/images/aerian.webp",
                                title: "Transport Aerian",
                                link: "/servicii/transport-aerian",
                                desc: `Soluția rapidă și eficientă pentru transportul internațional de marfă.

Ideal pentru livrări urgente sau sensibile.`,
                            },
                            {
                                img: "/images/feroviar.webp",
                                title: "Transport Feroviar",
                                link: "/servicii/transport-feroviar",
                                desc: `Este alternativa economică și sustenabilă pentru volume mari de marfă generală sau agabaritică.

Ideal în proiecte logistice complexe.`,
                            }
                        ].map((c, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                                className="bg-white text-black rounded-md overflow-hidden shadow-lg"
                            >
                                <img src={c.img} className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="block h-6 w-[3px] bg-yellow-500"></span>
                                        <h3 className="text-xl font-normal">{c.title}</h3>
                                    </div>
                                    <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-6">{c.desc}</p>
                                    <a href={c.link} className="inline-flex flex-col group">
                    <span className="flex items-center gap-2 text-black font-medium">
                      Află mai multe <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                                        <span className="block h-[2px] w-14 bg-yellow-500 mt-1 group-hover:w-20 transition-all"></span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CARD MARE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mt-10 bg-white text-black rounded-md overflow-hidden shadow-xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <img src="/images/multimodal.webp" className="w-full h-72 md:h-full object-cover" />
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="block h-6 w-[3px] bg-yellow-500"></span>
                                    <h3 className="text-2xl font-normal">Transport Multimodal</h3>
                                </div>
                                <p className="text-gray-800 mb-8 leading-relaxed max-w-xl">
                                    Acest tip de transport combină rutier, maritim, aerian și feroviar pentru eficiență și costuri optimizate.
                                </p>
                                <a href="/servicii/transport-multimodal" className="inline-flex flex-col group">
                  <span className="flex items-center gap-2 text-black font-medium">
                    Află mai multe <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                                    <span className="block h-[2px] w-14 bg-yellow-500 mt-1 group-hover:w-20 transition-all"></span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

        </section>
    );
}
