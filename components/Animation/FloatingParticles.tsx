"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FloatingParticles() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Créer des particules
        const particleCount = 50;
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.4) 100%);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
            container.appendChild(particle);
            particles.push(particle);
        }

        // Animer les particules
        particles.forEach((particle, index) => {
            gsap.to(particle, {
                x: `+=${Math.random() * 200 - 100}`,
                y: `+=${Math.random() * 200 - 100}`,
                rotation: 360,
                duration: Math.random() * 10 + 5,
                repeat: -1,
                yoyo: true,
                ease: "none",
                delay: index * 0.1
            });

            gsap.to(particle, {
                opacity: Math.random() * 0.7 + 0.3,
                duration: Math.random() * 3 + 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        });

        return () => {
            particles.forEach(particle => particle.remove());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ overflow: 'hidden' }}
        />
    );
}