
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
    faMoneyBillWave,
    faTrash,
    faBox,
    faTruck,
    faClock,
    faShieldAlt,
    faBolt,
    faExclamationTriangle,
    faFilter,
    faTimes,
    faSpinner,
    faImage,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

interface OfferStatusConfig {
    bg: string;
    text: string;
    textColor: string;
    icon: any;
    pulse: boolean;
    description: string;
}

export default function OffersAdminHandler({ offers }: { offers: Offer[] }) {
    const [offs, setOffs] = useState(offers);
    const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | Offer["status"]>("all");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingOfferId, setLoadingOfferId] = useState<string | null>(null);

    useEffect(() => {
        setOffs(offers);
    }, [offers]);

    // Configuration des statuts avec design moderne
    const statusConfig: Record<Offer["status"], OfferStatusConfig> = {
        waiting: {
            bg: "bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-300",
            text: "En examen",
            textColor: "text-amber-800",
            icon: faClock,
            pulse: true,
            description: "En attente de validation"
        },
        expedition: {
            bg: "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300",
            text: "Acceptée - Expédition",
            textColor: "text-blue-800",
            icon: faTruck,
            pulse: false,
            description: "Prête pour l'expédition"
        },
        sended: {
            bg: "bg-gradient-to-r from-purple-100 to-violet-100 border-purple-300",
            text: "Paiement en attente",
            textColor: "text-purple-800",
            icon: faMoneyBillWave,
            pulse: true,
            description: "En attente de paiement"
        },
        paid: {
            bg: "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300",
            text: "Terminée",
            textColor: "text-green-800",
            icon: faCheckCircle,
            pulse: false,
            description: "Transaction complète"
        },
        deny: {
            bg: "bg-gradient-to-r from-red-100 to-rose-100 border-red-300",
            text: "Refusée",
            textColor: "text-red-800",
            icon: faTimesCircle,
            pulse: false,
            description: "Offre rejetée"
        },
    };

    const filterOptions = [
        { label: "Toutes", value: "all", count: offs.length },
        { label: "En attente", value: "waiting", count: offs.filter(o => o.status === "waiting").length },
        { label: "Acceptées", value: "expedition", count: offs.filter(o => o.status === "expedition").length },
        { label: "Paiement", value: "sended", count: offs.filter(o => o.status === "sended").length },
        { label: "Terminées", value: "paid", count: offs.filter(o => o.status === "paid").length },
        { label: "Refusées", value: "deny", count: offs.filter(o => o.status === "deny").length },
    ];

    // Fonction pour mettre à jour le statut d'une offre
    const updateOfferStatus = async (offerId: string, newStatus: string) => {
        setLoadingOfferId(offerId);
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
        } finally {
            setLoadingOfferId(null);
        }
    };

    const deleteOffer = async (offerId: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) return;

        setLoadingOfferId(offerId);
        try {
            const res = await fetch(`/api/request/offers/${offerId}`, { method: "DELETE" });

            if (!res.ok) throw new Error("Erreur lors de la suppression.");

            setOffs((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));
        } catch (e) {
            console.error("Une erreur est survenue :", e);
        } finally {
            setLoadingOfferId(null);
        }
    };

    const filteredOffers = offs.filter((offer) => {
        return (
            (filter === "all" || offer.status === filter) &&
            (offer.id.toLowerCase().includes(search.toLowerCase()) ||
                offer.title.toLowerCase().includes(search.toLowerCase()))
        );
    });

    const getStatusBadge = (status: string) => {
        const config = statusConfig[status as Offer["status"]] || {
            bg: "bg-gray-100 border-gray-300",
            text: "Statut inconnu",
            textColor: "text-gray-800",
            icon: faExclamationTriangle,
            pulse: false,
            description: "Statut non défini"
        };

        return (
            <div className={clsx(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 shadow-sm",
                config.bg,
                config.textColor,
                config.pulse && "animate-pulse"
            )}>
                <FontAwesomeIcon icon={config.icon} className="text-sm" />
                {config.text}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header simplifié */}
            <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-indigo-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg">
                            <FontAwesomeIcon icon={faBolt} className="text-xl animate-pulse" />
                            <span className="font-bold text-lg">Administration PikaVault</span>
                            <FontAwesomeIcon icon={faBolt} className="text-xl animate-pulse" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900">
                            Gestion des <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Offres</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Gérez toutes les offres de revente soumises par les utilisateurs ⚡
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Barre de recherche et filtres modernisés */}
                <div className="mb-8 space-y-6">
                    {/* Recherche */}
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-2xl">
                            <input
                                type="text"
                                placeholder="Rechercher une offre par numéro ou titre..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400 focus:outline-none transition-all duration-200 bg-white shadow-lg"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filtres */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFilter(option.value as Offer["status"] | "all")}
                                className={clsx(
                                    "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-md",
                                    filter === option.value
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white transform scale-105"
                                        : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg"
                                )}
                            >
                                <span>{option.label}</span>
                                <span className={clsx(
                                    "text-xs px-2 py-1 rounded-full font-bold",
                                    filter === option.value
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 text-gray-600"
                                )}>
                                    {option.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Liste des offres */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {filteredOffers.length > 0 ? (
                            filteredOffers.map((offer) => (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white relative shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100"
                                >
                                    {/* Bouton de suppression */}
                                    <button
                                        onClick={() => deleteOffer(offer.id)}
                                        disabled={loadingOfferId === offer.id}
                                        className="absolute top-4 right-4 z-20 h-10 w-10 bg-red-100 hover:bg-red-200 disabled:opacity-50 transition-colors duration-200 rounded-full flex justify-center items-center text-red-700 shadow-lg"
                                    >
                                        {loadingOfferId === offer.id ? (
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTrash} />
                                        )}
                                    </button>

                                    {/* En-tête de l'offre */}
                                    <div
                                        className="flex justify-between items-center p-6 cursor-pointer"
                                        onClick={() => setExpandedOffer(expandedOffer === offer.id ? null : offer.id)}
                                    >
                                        <div className="flex items-center gap-6">
                                            {/* Image miniature */}
                                            {offer.image && offer.image.length > 0 && (
                                                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                                                    <Image
                                                        src={offer.image[0]}
                                                        alt={offer.title}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    Offre #{offer.id.slice(-8)}
                                                </h3>
                                                <p className="text-gray-600 font-medium">{offer.title}</p>
                                                <p className="text-2xl font-black text-green-600 mt-1">
                                                    {offer.price}€
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {getStatusBadge(offer.status)}
                                            <FontAwesomeIcon
                                                icon={expandedOffer === offer.id ? faChevronUp : faChevronDown}
                                                className="text-gray-400 text-lg"
                                            />
                                        </div>
                                    </div>

                                    {/* Détails étendus */}
                                    <AnimatePresence>
                                        {expandedOffer === offer.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="border-t border-gray-100"
                                            >
                                                <div className="p-6 bg-gray-50">
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        {/* Informations principales */}
                                                        <div className="space-y-4">
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Description</p>
                                                                <p className="text-gray-800">{offer.description}</p>
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Date de création</p>
                                                                <p className="text-gray-800">
                                                                    {new Date(offer.created_at).toLocaleDateString("fr-FR", {
                                                                        day: "2-digit",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit"
                                                                    })}
                                                                </p>
                                                            </div>

                                                            {/* Images */}
                                                            {offer.image && offer.image.length > 0 && (
                                                                <div>
                                                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Images ({offer.image.length})</p>
                                                                    <div className="flex gap-2 flex-wrap">
                                                                        {offer.image.slice(0, 4).map((img, index) => (
                                                                            <div key={index} className="w-16 h-16 rounded-lg overflow-hidden shadow-md border border-gray-200">
                                                                                <Image
                                                                                    src={img}
                                                                                    alt={`Image ${index + 1}`}
                                                                                    width={64}
                                                                                    height={64}
                                                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                        {offer.image.length > 4 && (
                                                                            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold">
                                                                                +{offer.image.length - 4}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="space-y-4">
                                                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Actions</p>

                                                            <div className="space-y-3">
                                                                <Link
                                                                    href={`/admin/resell/offer/${offer.id}`}
                                                                    className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-3"
                                                                >
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                    Voir les détails complets
                                                                </Link>

                                                                {/* Boutons conditionnels selon le statut */}
                                                                {offer.status === "waiting" && (
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <button
                                                                            onClick={() => updateOfferStatus(offer.id, "deny")}
                                                                            disabled={loadingOfferId === offer.id}
                                                                            className="px-4 py-3 bg-red-100 text-red-800 font-semibold rounded-xl shadow-md hover:bg-red-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                                                        >
                                                                            {loadingOfferId === offer.id ? (
                                                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                                            ) : (
                                                                                <FontAwesomeIcon icon={faTimesCircle} />
                                                                            )}
                                                                            Refuser
                                                                        </button>
                                                                        <button
                                                                            onClick={() => updateOfferStatus(offer.id, "expedition")}
                                                                            disabled={loadingOfferId === offer.id}
                                                                            className="px-4 py-3 bg-green-100 text-green-800 font-semibold rounded-xl shadow-md hover:bg-green-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                                                        >
                                                                            {loadingOfferId === offer.id ? (
                                                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                                            ) : (
                                                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                                            )}
                                                                            Accepter
                                                                        </button>
                                                                    </div>
                                                                )}

                                                                {offer.status === "sended" && (
                                                                    <button
                                                                        onClick={() => updateOfferStatus(offer.id, "paid")}
                                                                        disabled={loadingOfferId === offer.id}
                                                                        className="w-full px-6 py-3 bg-green-100 text-green-800 font-semibold rounded-xl shadow-md hover:bg-green-200 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
                                                                    >
                                                                        {loadingOfferId === offer.id ? (
                                                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                                        ) : (
                                                                            <FontAwesomeIcon icon={faMoneyBillWave} />
                                                                        )}
                                                                        Marquer comme payé
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon icon={faBox} className="text-gray-400 text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune offre trouvée</h3>
                                <p className="text-gray-600">Aucune offre ne correspond à vos critères de recherche.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}