"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function FadeInSection({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
                    setIsVisible(false);
                } else if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 } // Détecte quand 20% de la section entre/sort du viewport
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={sectionRef}
            className="w-full" // Suppression de "flex justify-center" qui causait la compression
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}