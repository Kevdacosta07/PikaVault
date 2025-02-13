"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx"; // Utilisé pour la gestion des classes conditionnelles

interface Offer {
    title: string;
    image: string[];
    id: string;
    description: string;
    price: number;
    created_at: Date;
    status: string;
    user_id: string;
    tracknumber: string | null;
}

export default function CarouselOffer({ title, items } : {title: string, items: Offer[]}) {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [isDraggable, setIsDraggable] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (carouselRef.current) {
                const isOverflowing = carouselRef.current.scrollWidth > carouselRef.current.clientWidth;
                setIsDraggable(isOverflowing);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);

        return () => window.removeEventListener("resize", checkOverflow);
    }, [items]);

    // Fonction pour définir la couleur de la pastille selon le statut
    const getStatusBadge = (status: string) => {
        return clsx(
            "px-3 py-1 text-sm font-semibold rounded-full mt-2",
            {
                "bg-yellow-200 text-yellow-800": status === "waiting",
                "bg-orange-200 text-orange-800": status === "expedition",
                "bg-green-200 text-orange-800": status === "sended",
                "bg-red-200 text-red-800": status === "cancelled",
                "bg-green-200 text-green-800": status === "paid",
                "bg-gray-200 text-gray-800": !["pending", "shipped", "sended", "cancelled", "paid"].includes(status),
            }
        );
    };

    console.log(items.length);

    return (
        <div className="mb-12">
                <div className="flex items-center mb-1 px-2">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <Link href={`/admin/resell`} className="px-4 py-2 ml-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition">
                        Voir tout
                    </Link>
                </div>

            {items.length !== 0 ?
            (
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        ref={carouselRef}
                        className="flex shadow-gray-400 shadow-xl py-4 space-x-6 px-1 overflow-x-auto no-scrollbar"
                        drag={isDraggable ? "x" : false}
                        dragConstraints={isDraggable ? { right: 0, left: -1000 } : { left: 0, right: 0 }}
                    >
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                className="relative min-w-[280px] pt-0 max-w-[350px] bg-white hover:bg-gray-50 shadow-md rounded-lg p-5 transition hover:shadow-lg"
                            >

                                {/* Contenu de la carte */}
                                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                                    {item.title || `Commande #${item.id}`}
                                </h3>

                                {/* Pastille du statut & Date */}

                                <div>

                                    <p className={"mt-1 mb-2 text-gray-600"}>{new Date(item.created_at).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}</p>

                                    <span className={getStatusBadge(item.status)}>
                                    {item.status === "waiting" ? "En examen..." :
                                        item.status === "expedition" ? "Expédition en attente..." :
                                            item.status === "sended" ? "Paiement en attente..." :
                                            item.status === "paid" ? "Payée" :
                                                item.status === "cancelled" ? "Annulée" : "Inconnu"}
                                    </span>
                                </div>

                                {/* Bouton Détails */}
                                <Link href={`/admin/${title.toLowerCase()}/${item.id}`}>
                                    <button
                                        className="mt-4 w-full px-4 py-2 bg-orange-200 text-orange-800 rounded-md hover:bg-orange-300 transition">
                                        Détails
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )
            :
            (
                <p className={"ml-4 text-gray-500 font-medium mt-3"}>Aucune offre n&#39;a été répertoriée !</p>
            )}

        </div>
    );
}
