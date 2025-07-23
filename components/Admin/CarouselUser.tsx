"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCalendarAlt,
    faEnvelope,
    faCoins,
    faCheckCircle,
    faEdit,
    faArrowRight,
    faUsersGear,
    faCrown,
    faChevronLeft,
    faChevronRight,
    faEye,
    faUserCheck,
    faUserTimes
} from "@fortawesome/free-solid-svg-icons";

interface UserItem {
    id: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
    emailVerified: Date | null;
    admin: number;
    points: number;
    created_at: Date;
}

export default function CarouselUser({ title, items }: { title: string; items: UserItem[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isDraggable, setIsDraggable] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Vérifier si le carousel peut défiler
    useEffect(() => {
        const checkScrollability = () => {
            if (containerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
                const isOverflowing = scrollWidth > clientWidth;

                setIsDraggable(isOverflowing);
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
            }
        };

        checkScrollability();

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScrollability);
            window.addEventListener("resize", checkScrollability);

            return () => {
                container.removeEventListener("scroll", checkScrollability);
                window.removeEventListener("resize", checkScrollability);
            };
        }
    }, [items]);

    // Navigation du carousel
    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = direction === 'left'
                ? containerRef.current.scrollLeft - scrollAmount
                : containerRef.current.scrollLeft + scrollAmount;

            containerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    // Configuration des couleurs pour les rôles
    const getRoleConfig = (admin: number, verified: boolean) => {
        if (admin === 1) {
            return {
                bg: "bg-gradient-to-r from-red-500 to-pink-500",
                textColor: "text-white",
                icon: faCrown,
                label: "Admin",
                badge: "bg-red-100 text-red-700 border-red-300"
            };
        }

        if (verified) {
            return {
                bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
                textColor: "text-white",
                icon: faUserCheck,
                label: "Vérifié",
                badge: "bg-blue-100 text-blue-700 border-blue-300"
            };
        }

        return {
            bg: "bg-gradient-to-r from-gray-500 to-slate-500",
            textColor: "text-white",
            icon: faUser,
            label: "Client",
            badge: "bg-gray-100 text-gray-700 border-gray-300"
        };
    };

    return (
        <div className="mb-12">
            {/* Header avec design moderne */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 px-4">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faUsersGear} className="text-white text-xl" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">{title}</h2>
                            <p className="text-gray-600 font-medium">{items.length} utilisateurs actifs</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Boutons de navigation */}
                    {isDraggable && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                    canScrollLeft
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                                        : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                }`}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                    canScrollRight
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                                        : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                }`}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    )}

                    {/* Bouton "Voir tout" */}
                    <Link
                        href="/admin/utilisateurs"
                        className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faEye} />
                        <span>Voir tout</span>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                    </Link>
                </div>
            </div>

            {/* Container du carrousel avec drag simple */}
            <div className="px-4 py-8">
                <div className="relative">
                    <div
                        ref={containerRef}
                        className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 ${
                            isDraggable ? 'cursor-grab active:cursor-grabbing' : ''
                        }`}
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>

                        {items.map((item, index) => {
                            const roleConfig = getRoleConfig(item.admin, !!item.emailVerified);

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex-shrink-0 group"
                                >
                                    <div className="relative w-72 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">

                                        {/* Header de la carte avec avatar */}
                                        <div className="relative h-28 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                                            {/* Motif décoratif */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute top-4 right-4 text-5xl">⚡</div>
                                                <div className="absolute bottom-2 left-6 text-3xl">✨</div>
                                            </div>

                                            {/* Avatar centré */}
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                                <div className="relative">
                                                    <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden">
                                                        <Image
                                                            src={item.image ?? "/assets/img/default-profile.png"}
                                                            alt={`Profil de ${item.name}`}
                                                            width={64}
                                                            height={64}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    {/* Badge de vérification */}
                                                    {item.emailVerified && (
                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faCheckCircle} className="text-white text-xs" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contenu de la carte */}
                                        <div className="pt-10 p-5 space-y-4">
                                            {/* Nom et email */}
                                            <div className="text-center space-y-1">
                                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                                    {item.name || "Utilisateur inconnu"}
                                                </h3>
                                                <p className="text-xs text-gray-600 truncate flex items-center justify-center gap-1">
                                                    <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                                                    {item.email}
                                                </p>
                                            </div>

                                            {/* Statistiques */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="text-center bg-yellow-50 rounded-lg p-2 border border-yellow-200">
                                                    <div className="text-lg font-bold text-yellow-700">{item.points}</div>
                                                    <div className="text-xs text-yellow-600 font-medium flex items-center justify-center gap-1">
                                                        <FontAwesomeIcon icon={faCoins} />
                                                        Points
                                                    </div>
                                                </div>
                                                <div className="text-center bg-blue-50 rounded-lg p-2 border border-blue-200">
                                                    <div className="text-xs font-bold text-blue-700">
                                                        {new Date(item.created_at).toLocaleDateString("fr-FR", { month: "short", year: "2-digit" })}
                                                    </div>
                                                    <div className="text-xs text-blue-600 font-medium flex items-center justify-center gap-1">
                                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                                        Membre
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Badge de rôle */}
                                            <div className="flex justify-center">
                                                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border-2 ${roleConfig.badge} font-semibold text-xs`}>
                                                    <FontAwesomeIcon icon={roleConfig.icon} />
                                                    {roleConfig.label}
                                                </div>
                                            </div>

                                            {/* Date d'inscription */}
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500">
                                                    Inscrit le {new Date(item.created_at).toLocaleDateString("fr-FR", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                                </p>
                                            </div>

                                            {/* Bouton d'action */}
                                            <div className="pt-2">
                                                <Link href={`/admin/utilisateurs/edit/${item.id}`}>
                                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-gray-700 hover:text-white rounded-lg font-semibold transition-all duration-200 group/btn">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        <span>Modifier</span>
                                                        <FontAwesomeIcon
                                                            icon={faArrowRight}
                                                            className="group-hover/btn:translate-x-1 transition-transform duration-200"
                                                        />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Indicateur de drag */}
                    {isDraggable && (
                        <div className="absolute top-4 right-4 pointer-events-none">
                            <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                                <span>👆</span>
                                <span>Glissez</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* État vide */}
            {items.length === 0 && (
                <div className="text-center py-16 px-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FontAwesomeIcon icon={faUserTimes} className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun utilisateur</h3>
                    <p className="text-gray-600 mb-6">Il n&#39;y a aucun utilisateur à afficher pour le moment.</p>
                    <Link
                        href="/admin/utilisateurs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                        <FontAwesomeIcon icon={faUsersGear} />
                        Gérer les utilisateurs
                    </Link>
                </div>
            )}
        </div>
    );
}