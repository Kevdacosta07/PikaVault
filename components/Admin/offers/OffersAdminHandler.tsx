"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faChevronDown,
    faChevronUp,
    faEye,
    faCheckCircle,
    faTimesCircle,
    faMoneyBillWave, faTrash,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import Link from "next/link";

interface Offer {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: Date;
    price: number;
    user_id: string;
    image: string[];
}

export default function OffersAdminHandler({ offers }: { offers: Offer[] }) {
    const [offs, setOffs] = useState(offers);
    const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | Offer["status"]>("all");

    useEffect(() => {
        setOffs(offers);
    }, [offers]);

    // Fonction pour mettre à jour le statut d'une commande
    const updateOfferStatus = async (offerId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/request/offers/${offerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

            setOffs((prevOffers) =>
                prevOffers.map((offer) =>
                    offer.id === offerId ? { ...offer, status: newStatus } : offer
                )
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };

    const deleteOffer = async (offerId: string) => {
        try {
            const res = await fetch(`/api/request/offers/${offerId}`, { method: "DELETE" });

            if (!res.ok) throw new Error("Erreur lors de la suppression.");

            // Mettre à jour l'état en retirant l'offre supprimée
            setOffs((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));

            console.log(`Offre ${offerId} supprimée avec succès.`);
        } catch (e) {
            console.error("Une erreur est survenue :", e);
        }
    };


    const statusClasses: Record<Offer["status"], string> = {
        waiting: "bg-yellow-200 text-yellow-800",
        expedition: "bg-orange-200 text-orange-800",
        sended: "bg-yellow-200 text-orange-800",
        paid: "bg-green-200 text-green-800",
        deny: "bg-red-200 text-red-800",
    };

    const statusTexts: Record<Offer["status"], string> = {
        waiting: "En examen...",
        expedition: "Expédition en attente...",
        sended: "Paiement en attente...",
        paid: "Paiement envoyé",
        deny: "Refusée",
    };

    // 🔍 Filtrer les offres par statut et recherche
    const filteredOffers = offs.filter((offer) => {
        return (
            (filter === "all" || offer.status === filter) &&
            offer.id.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* 🔹 Titre de la section */}
            <div className="flex flex-col my-8 items-center max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-pink-500">📋</span> Gestion des Offres
                </h1>
                <p className="text-lg font-medium text-gray-500">Gérez toutes les offres soumises</p>
            </div>

            {/* 🔍 Barre de recherche */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Rechercher une offre par numéro..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>

            {/* 🏷️ Filtres */}
            <div className="flex justify-center gap-3 mb-6">
                {[
                    { label: "Toutes", value: "all" },
                    { label: "En attente", value: "waiting" },
                    { label: "Payées", value: "paid" },
                    { label: "Expédiées", value: "shipped" },
                    { label: "Annulées", value: "canceled" },
                ].map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value as Offer["status"] | "all")}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-semibold transition",
                            filter === value
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Liste des Offres */}
            <div className="max-w-4xl mx-auto">
                {filteredOffers.length > 0 ? (
                    filteredOffers.map((offer) => (
                        <div
                            key={offer.id}
                            className="bg-white relative z-10 shadow-md mb-4 rounded-lg transition cursor-pointer"
                        >

                            <button onClick={() => deleteOffer(offer.id)} className={"h-[30px] z-20 w-[30px] pl-[1px] translate-x-[30%] translate-y-[-30%] absolute top-0 right-0 bg-red-200 hover:bg-red-300 transition-colors duration-200 rounded-full flex justify-center items-center text-red-800 text-sm"}>
                                <FontAwesomeIcon className={"w-fit"} icon={faTrash} />
                            </button>

                            {/* En-tête avec statut et icône de déroulement */}
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer w-full h-full"
                                onClick={() =>
                                    setExpandedOffer(expandedOffer === offer.id ? null : offer.id)
                                }
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Commande #{offer.id}
                                    </h2>
                                    <p className="text-gray-600">{offer.title}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={clsx(
                                            "px-3 py-1 text-sm font-semibold rounded-full",
                                            statusClasses[offer.status]
                                        )}
                                    >
                                        {statusTexts[offer.status]}
                                    </span>
                                    <FontAwesomeIcon
                                        icon={expandedOffer === offer.id ? faChevronUp : faChevronDown}
                                        className="text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* ✅ Détails affichés si l'offre est dépliée */}
                            {expandedOffer === offer.id && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-gray-700 font-medium">
                                        <strong>Prix :</strong> <span className={"text-green-600"}>{offer.price}€</span>
                                    </p>
                                    <p className="text-gray-700 font-medium">
                                        <strong>Description :</strong> {offer.description}
                                    </p>
                                    <p className="text-gray-700 font-medium">
                                        <strong>Date
                                            :</strong> {new Date(offer.created_at).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    </p>

                                    {/* 📌 Bouton Voir les détails */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <Link
                                            href={`/admin/resell/offer/${offer.id}`}
                                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition flex items-center gap-2 w-fit"
                                        >
                                            <FontAwesomeIcon icon={faEye}/>
                                            Voir les détails
                                        </Link>

                                        {/* Boutons dynamiques selon le statut */}
                                        {offer.status === "waiting" && (
                                            <>
                                                <button
                                                    onClick={() => updateOfferStatus(offer.id, "deny")}
                                                    className="px-4 py-2 bg-red-200 text-red-800 font-semibold rounded-lg shadow-md hover:bg-red-300 transition flex items-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={faTimesCircle}/>
                                                    Refuser
                                                </button>
                                                <button
                                                    onClick={() => updateOfferStatus(offer.id, "expedition")}
                                                    className="px-4 py-2 bg-green-300 text-green-700 font-semibold rounded-lg shadow-md hover:bg-green-400 transition flex items-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={faCheckCircle}/>
                                                    Accepter
                                                </button>
                                            </>
                                        )}

                                        {offer.status === "sended" && (
                                            <button
                                                onClick={() => updateOfferStatus(offer.id, "paid")}
                                                className="px-4 py-2 bg-green-200 text-green-900 font-semibold rounded-lg shadow-md hover:bg-green-300 transition flex items-center gap-2"
                                            >
                                                <FontAwesomeIcon icon={faMoneyBillWave}/>
                                                Marquer comme payé
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-lg">Aucune offre trouvée.</p>
                )}
            </div>
        </div>
    );
}
