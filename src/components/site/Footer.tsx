"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <motion.footer
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
                hidden: { opacity: 0, y: 80 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="bg-neutral-900 text-white pt-16 pb-8 border-t border-neutral-800 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">

                {/* === SOCIALS (DOAR PE TELEFON) === */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
                    }}
                    className="flex justify-center gap-4 mb-8 md:hidden"
                >
                    {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            className="w-10 h-10 border border-white/60 rounded-full flex items-center justify-center hover:bg-[#F4BD19] hover:text-black transition"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </motion.div>

                {/* === GRID STRUCTURE === */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, ease: "easeOut", delay: 0.25 },
                        },
                    }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_minmax(280px,1fr)] gap-10 md:gap-x-8 mb-12 text-left"
                >
                    {[
                        {
                            title: "Servicii",
                            links: [
                                "Bursa de Transport",
                                "Transport Multimodal",
                                "Transport Rutier",
                                "Transport Aerian",
                                "Transport Maritim",
                                "Transport Feroviar",
                            ],
                        },
                        {
                            title: "Despre noi",
                            links: [
                                "Devino Partener CLS",
                                "Cariere",
                                "Echipa Noastră",
                                "Blog",
                                "Recenzii",
                                "Broșuri",
                            ],
                        },
                        {
                            title: "Contact",
                            custom: (
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2"><MapPin size={16}/> Locațiile noastre</li>
                                    <li className="flex items-center gap-2"><Phone size={16}/> +40723344599</li>
                                    <li className="flex items-center gap-2"><Mail size={16}/> logistics@crystal-logistics-services.com</li>
                                    <li className="flex items-center gap-2"><Clock size={16}/> Program: 09:00–17:30</li>
                                </ul>
                            ),
                        },
                    ].map((col, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 25 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 + i * 0.1 } },
                            }}
                            className="flex flex-col items-center md:items-start"
                        >
                            <div className="w-full max-w-[320px]">
                                <h3 className="text-[#F4BD19] font-medium mb-4">{col.title}</h3>
                                {col.custom ? (
                                    col.custom
                                ) : (
                                    <ul className="space-y-2 text-sm">
                                        {col.links.map((link, j) => (
                                            <li key={j}><a href="#">{link}</a></li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* === Licențe === */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 } },
                        }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <div className="w-full max-w-[320px]">
                            <h3 className="text-[#F4BD19] font-medium mb-4">Licențe</h3>
                            <p className="text-sm mb-6 leading-relaxed">
                                <span className="block">Licența de intermediere seria CI nr. 0010969</span>
                                <span className="block">Licența de transport nr. 023173</span>
                            </p>

                            <div className="flex flex-col items-start gap-4">
                                <div className="flex flex-wrap justify-start gap-4">
                                    <img src="/images/licenta1.png" alt="FIATA" className="h-10 object-contain"/>
                                    <img src="/images/licenta2.png" alt="USER" className="h-10 object-contain"/>
                                    <img src="/images/licenta3.png" alt="ASKO" className="h-10 object-contain w-[85px]"/>
                                </div>
                                <div className="flex flex-wrap justify-start gap-4 mt-2">
                                    <img src="/images/licenta4.png" alt="CCIB" className="h-14 object-contain"/>
                                    <img src="/images/licenta5.png" alt="CERTIND" className="h-14 object-contain"/>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* === LINIA PRINCIPALĂ === */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
                    }}
                    className="border-t border-neutral-800 pt-8 grid grid-cols-1 md:grid-cols-[20%_60%_20%] items-center text-center md:text-left gap-6 md:gap-0"
                >
                    {/* Stânga - Logo */}
                    <div className="flex justify-center md:justify-start">
                        <img
                            src="/images/logoFooter.png"
                            alt="Crystal Logistics"
                            className="w-24 md:w-40 h-auto object-contain"
                        />
                    </div>

                    {/* Centru - Politici */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-sm">
                        <a href="#" className="hover:text-[#FFD84D] transition">Termeni și condiții</a>
                        <a href="#" className="hover:text-[#FFD84D] transition">Politica de confidențialitate</a>
                        <a href="#" className="hover:text-[#FFD84D] transition">Politica Cookies</a>
                    </div>

                    {/* Dreapta - Social Media */}
                    <div className="hidden md:flex justify-center md:justify-end gap-3">
                        {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-9 h-9 border border-white/60 rounded-full flex items-center justify-center hover:bg-[#F4BD19] hover:text-black transition"
                            >
                                <Icon size={16}/>
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* === COPYRIGHT === */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 25 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } },
                    }}
                    className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-white/90 text-center md:text-left"
                >
                    <p>Copyright © 2025 Crystal Logistics Services</p>
                    <p className="mt-2 md:mt-0">
                        Powered by:{" "}
                        <a
                            href="https://generationsalez.ro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#F4BD19] font-medium hover:text-[#FFD84D] transition"
                        >
                            Generation Salez
                        </a>
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
