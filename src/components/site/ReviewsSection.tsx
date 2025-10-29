"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import reviews from "../../../data/reviews";
import { Star } from "lucide-react";

export default function ReviewsSection() {
    const [shuffled, setShuffled] = useState<typeof reviews>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // === Shuffle reviews și selectează 3 random ===
    useEffect(() => {
        const copy = [...reviews];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        setShuffled(copy.slice(0, Math.min(copy.length, 3)));
    }, []);

    // === Centrare card curent (mobil) ===
    useEffect(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const card = container.children[currentIndex] as HTMLElement;
        if (!card) return;

        const containerWidth = container.offsetWidth;
        const scrollLeft =
            card.offsetLeft - (containerWidth - card.offsetWidth) / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }, [currentIndex]);

    const next = () =>
        setCurrentIndex((prev) => (prev < shuffled.length - 1 ? prev + 1 : 0));

    const prev = () =>
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : shuffled.length - 1));

    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 60 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="bg-neutral-900 text-white py-20 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* TITLU */}
                <h2 className="text-center text-2xl md:text-3xl font-semibold mb-12">
                    Ce spun clienții noștri
                </h2>

                {/* === DESKTOP GRID === */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {shuffled.map((r, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } },
                            }}
                        >
                            <ReviewCard {...r} />
                        </motion.div>
                    ))}
                </div>

                {/* === MOBILE CAROUSEL === */}
                <div className="relative md:hidden -mx-6">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory w-full"
                    >
                        {shuffled.map((r, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
                                }}
                                className="snap-center flex-shrink-0 w-full px-6"
                            >
                                <ReviewCard {...r} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Link */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { delay: 0.3 } },
                    }}
                    className="text-center mt-10"
                >
                    <a
                        href="https://www.google.com/maps/place/Crystal+Logistics+Services/@44.4336093,26.0513054,17z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 hover:text-yellow-400 transition font-medium underline"
                    >
                        Vezi toate recenziile pe Google Maps
                    </a>
                </motion.div>
            </div>
        </motion.section>
    );
}

function ReviewCard({
                        author,
                        date,
                        text,
                        rating,
                    }: {
    author: string;
    date: string;
    text: string;
    rating: number;
}) {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 200;
    const isLong = text.length > maxLength;
    const visibleText = expanded || !isLong ? text : text.slice(0, maxLength);

    return (
        <div className="bg-white text-neutral-900 p-6 rounded-xl shadow-lg h-full flex flex-col justify-between">
            {/* Stele */}
            <div className="flex gap-1 mb-3">
                {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
            </div>

            {/* Text + Read more inline */}
            <p className="text-sm leading-relaxed mb-4">
                “{visibleText}
                {isLong && !expanded && (
                    <>
                        ...{" "}
                        <button
                            onClick={() => setExpanded(true)}
                            className="text-yellow-500 hover:text-yellow-400 font-medium text-sm"
                        >
                            Read more
                        </button>
                    </>
                )}
                {expanded && (
                    <button
                        onClick={() => setExpanded(false)}
                        className="text-yellow-500 hover:text-yellow-400 font-medium text-sm ml-1"
                    >
                        Read less
                    </button>
                )}
                ”
            </p>

            {/* Autor */}
            <div className="mt-auto border-t border-neutral-200 pt-4">
                <div className="font-semibold">{author}</div>
                <div className="text-gray-500 text-xs">{date}</div>
            </div>
        </div>
    );
}
