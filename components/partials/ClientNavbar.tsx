"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function NavBarClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname === "/resell" || pathname === "/panier";
    const isBlackListed = pathname === "/auth/login" || pathname === "/auth/register";

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Gestion du scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Gestion du menu mobile
    useEffect(() => {
        const handleMobileMenu = () => {
            const toggleButton = document.querySelector('.mobile-menu-toggle');
            const closeButton = document.querySelector('.mobile-menu-close');
            const overlay = document.querySelector('.mobile-menu-overlay');
            const mobileMenu = document.querySelector('.mobile-menu');
            const signOutBtn = document.querySelector('.mobile-signout-btn');
            const menuLinks = document.querySelectorAll('.mobile-menu-link');

            const openMenu = () => {
                setIsMobileMenuOpen(true);
                document.body.style.overflow = 'hidden';
                overlay?.classList.remove('opacity-0', 'invisible');
                overlay?.classList.add('opacity-100', 'visible');
                mobileMenu?.classList.remove('translate-x-full');
                mobileMenu?.classList.add('translate-x-0');
            };

            const closeMenu = () => {
                setIsMobileMenuOpen(false);
                document.body.style.overflow = '';
                overlay?.classList.add('opacity-0', 'invisible');
                overlay?.classList.remove('opacity-100', 'visible');
                mobileMenu?.classList.add('translate-x-full');
                mobileMenu?.classList.remove('translate-x-0');
            };

            const handleSignOut = async () => {
                closeMenu();
                await signOut();
            };

            // Event listeners
            toggleButton?.addEventListener('click', openMenu);
            closeButton?.addEventListener('click', closeMenu);
            overlay?.addEventListener('click', closeMenu);
            signOutBtn?.addEventListener('click', handleSignOut);

            // Fermer le menu quand on clique sur un lien
            menuLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });

            // Cleanup function
            return () => {
                toggleButton?.removeEventListener('click', openMenu);
                closeButton?.removeEventListener('click', closeMenu);
                overlay?.removeEventListener('click', closeMenu);
                signOutBtn?.removeEventListener('click', handleSignOut);
                menuLinks.forEach(link => {
                    link.removeEventListener('click', closeMenu);
                });
                document.body.style.overflow = '';
            };
        };

        // Attendre que le DOM soit complètement chargé
        const timer = setTimeout(handleMobileMenu, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    // Fermer le menu mobile quand on change de page
    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
            document.body.style.overflow = '';

            const overlay = document.querySelector('.mobile-menu-overlay');
            const mobileMenu = document.querySelector('.mobile-menu');

            overlay?.classList.add('opacity-0', 'invisible');
            overlay?.classList.remove('opacity-100', 'visible');
            mobileMenu?.classList.add('translate-x-full');
            mobileMenu?.classList.remove('translate-x-0');
        }
    }, [pathname]);

    // Gérer la touche Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
                document.body.style.overflow = '';

                const overlay = document.querySelector('.mobile-menu-overlay');
                const mobileMenu = document.querySelector('.mobile-menu');

                overlay?.classList.add('opacity-0', 'invisible');
                overlay?.classList.remove('opacity-100', 'visible');
                mobileMenu?.classList.add('translate-x-full');
                mobileMenu?.classList.remove('translate-x-0');
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    return (
        <div
            className={`top-0 left-0 w-full z-50 transition-transform duration-300 ${
                isBlackListed
                    ? "hidden"
                    : (isHomePage
                            ? (isVisible ? "fixed translate-y-0" : "fixed -translate-y-full")
                            : "sticky top-0"
                    )
            }`}
        >
            {children}
        </div>
    );
}