"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [isDraggable, setIsDraggable] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (carouselRef.current instanceof HTMLDivElement) {
                const isOverflowing = carouselRef.current.scrollWidth > carouselRef.current.clientWidth;
                setIsDraggable(isOverflowing);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);

        return () => window.removeEventListener("resize", checkOverflow);
    }, [items]);

    return (
        <div className="mb-8">
            {/* Titre + Bouton */}
            <div className="flex items-center mb-1 px-2">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <Link href={`/admin/utilisateurs`} className="px-4 py-2 ml-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition">
                    Voir tout
                </Link>
            </div>

            {/* Carrousel */}
            <div className="relative w-full overflow-hidden">
                <motion.div
                    ref={carouselRef}
                    className="flex shadow-gray-400 shadow-xl py-6 space-x-10 px-1 overflow-x-auto no-scrollbar"
                    drag={isDraggable ? "x" : false}
                    dragConstraints={isDraggable ? { right: 0, left: -1000 } : { left: 0, right: 0 }}
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="relative min-w-[280px] max-w-[350px] bg-white shadow-md rounded-lg p-5 pt-1 transition hover:shadow-lg"
                        >
                            <Image
                                src={item.image ?? "/assets/img/default-profile.png"}
                                alt="Image de profil"
                                width={30}
                                height={30}
                                className="w-[50px] bg-gray-100 h-[50px] border-2 border-gray-500 absolute top-0 right-0 transform translate-x-[50%] translate-y-[-40%] rounded-full object-cover"
                            />

                            {/* Contenu de la carte */}
                            <h3 className="text-lg font-semibold text-gray-800 mt-4">
                                Utilisateur
                                <span className="bg-orange-300 ml-1 px-3 py-1">{item.name}</span>
                            </h3>

                            <p className="mt-1 mb-1 text-gray-600">
                                {new Date(item.created_at).toLocaleDateString("fr-FR", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>

                            {item.admin === 1 ? (
                                <p className="rounded-lg text-md px-3 py-1 mt-1 bg-red-300 text-red-700 font-semibold w-fit">
                                    Admin
                                </p>
                            ) : (
                                <p className="rounded-lg text-md px-3 py-1 mt-1 bg-blue-300 text-blue-700 font-semibold w-fit">
                                    Client
                                </p>
                            )}

                            {/* Bouton Détails */}
                            <Link href={`/admin/utilisateurs/edit/${item.id}`}>
                                <button className="mt-4 w-full px-4 py-2 bg-orange-200 text-orange-800 rounded-md hover:bg-orange-300 transition">
                                    Modifier
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
