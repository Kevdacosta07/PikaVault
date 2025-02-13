"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavBarClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname === "/resell" || pathname === "/panier"; // Vérifie si on est sur la page d'accueil
    const isBlackListed = pathname === "/auth/login" || pathname === "/auth/register"; // Vérifie si on est sur la page d'accueil

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scroll vers le bas → cacher la navbar
                setIsVisible(false);
            } else {
                // Scroll vers le haut → afficher la navbar
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-200 ${
                isBlackListed ? "hidden" : (isHomePage ? (isVisible ? "fixed translate-y-0" : "fixed -translate-y-full") : "")
            }`}
        >
            {children}
        </div>
    );
}
