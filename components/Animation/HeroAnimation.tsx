"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPAnimation = () => {
    useEffect(() => {
        // Configuration globale pour des animations fluides
        gsap.config({
            force3D: true,
            nullTargetWarn: false,
        });
    }, []);
};

// Animation de héro avec parallaxe
export const HeroAnimation = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation d'entrée du texte du héro
            gsap.fromTo('.hero-title', {
                y: 100,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.3
            });

            gsap.fromTo('.hero-subtitle', {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.6
            });

            gsap.fromTo('.hero-description', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.9
            });

            gsap.fromTo('.hero-button', {
                y: 30,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: 1.2
            });

            // Animation d'entrée de l'image - NOUVEAU
            gsap.fromTo('.hero-image', {
                x: 100,
                opacity: 0,
                scale: 0.8,
                rotation: 10
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.8
            });

            // Animation du badge flottant - NOUVEAU
            gsap.fromTo('.hero-badge', {
                scale: 0,
                rotation: 0,
                opacity: 0
            }, {
                scale: 1,
                rotation: 12,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(2)",
                delay: 2
            });

            // Effet parallaxe sur l'image
            gsap.to('.hero-image', {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return <div ref={containerRef}>{children}</div>;
};

// Animation de carte avec effet magnétique
export const MagneticCard = ({ children }: { children: React.ReactNode }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(card, {
                x: x * 0.1,
                y: y * 0.1,
                rotationX: y * 0.05,
                rotationY: -x * 0.05,
                duration: 0.3,
                ease: "power2.out",
                transformPerspective: 1000
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <div ref={cardRef}>{children}</div>;
};

// Animation de révélation au scroll
export const RevealAnimation = ({ children, direction = 'up', delay = 0 }: {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const getInitialProps = () => {
            switch (direction) {
                case 'up':
                    return { y: 100, opacity: 0 };
                case 'down':
                    return { y: -100, opacity: 0 };
                case 'left':
                    return { x: -100, opacity: 0 };
                case 'right':
                    return { x: 100, opacity: 0 };
                default:
                    return { y: 100, opacity: 0 };
            }
        };

        gsap.fromTo(element, getInitialProps(), {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: delay,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    }, [direction, delay]);

    return <div ref={elementRef}>{children}</div>;
};

// Animation de texte typewriter
export const TypewriterText = ({ text, className = "" }: { text: string; className?: string }) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        const chars = text.split('');
        element.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');

        gsap.fromTo('.char', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
        });
    }, [text]);

    return <span ref={textRef} className={className}></span>;
};