"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faSearch,
    faChevronDown,
    faChevronUp,
    faEye,
    faPen,
    faTruck,
    faTrash,
    faSpinner,
    faExclamationTriangle,
    faCheckCircle,
    faFilter,
    faBox,
    faCalendarAlt,
    faUser,
    faEuroSign,
    faClipboardList,
    faMagic
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

type Offer = {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string[];
    user_id: string;
    status: string;
    created_at: Date;
};

const statusLabels: Record<Offer["status"], string> = {
    waiting: "En examen",
    expedition: "Prête à expédier",
    sended: "Expédiée",
    paid: "Paiement reçu",
    deny: "Refusée",
};

const statusClasses: Record<Offer["status"], string> = {
    waiting: "bg-amber-100 text-amber-800 border-amber-200",
    expedition: "bg-blue-100 text-blue-800 border-blue-200",
    sended: "bg-purple-100 text-purple-800 border-purple-200",
    paid: "bg-green-100 text-green-800 border-green-200",
    deny: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons: Record<Offer["status"], any> = {
    waiting: faClipboardList,
    expedition: faBox,
    sended: faTruck,
    paid: faCheckCircle,
    deny: faExclamationTriangle,
};

export default function OffersHandler({ offers }: { offers: Offer[] }) {
    const [offs, setOffs] = useState<Offer[]>(offers);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | Offer["status"]>("all");
    const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    useEffect(() => {
        setOffs(offers);
    }, [offers]);

    // Filtrer les offres par statut et recherche
    const filteredOffers = offs.filter((offer) => {
        const matchesFilter = filter === "all" || offer.status === filter;
        const matchesSearch =
            offer.id.toLowerCase().includes(search.toLowerCase()) ||
            offer.title.toLowerCase().includes(search.toLowerCase()) ||
            offer.user_id.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const deleteOffer = async (offerId: string) => {
        setIsDeleting(offerId);

        try {
            const res = await fetch(`/api/request/offers/${offerId}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                throw new Error("Erreur lors de la suppression de l'offre");
            }

            // Mettre à jour l'état en retirant l'offre supprimée
            setOffs((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));

            console.log(`Offre ${offerId} supprimée avec succès.`);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            // Vous pourriez ajouter une notification d'erreur ici
        } finally {
            setIsDeleting(null);
        }
    };

    const filterOptions = [
        { label: "Toutes les offres", value: "all", count: offs.length },
        { label: "En examen", value: "waiting", count: offs.filter(o => o.status === "waiting").length },
        { label: "Prêtes à expédier", value: "expedition", count: offs.filter(o => o.status === "expedition").length },
        { label: "Expédiées", value: "sended", count: offs.filter(o => o.status === "sended").length },
        { label: "Payées", value: "paid", count: offs.filter(o => o.status === "paid").length },
        { label: "Refusées", value: "deny", count: offs.filter(o => o.status === "deny").length },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* En-tête avec statistiques */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full mb-4">
                        <FontAwesomeIcon icon={faMagic} className="text-orange-600 mr-2" />
                        <span className="text-orange-800 font-semibold text-sm">Gestion des offres</span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        📢 Gestion des Offres
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Gérez et suivez toutes les offres soumises par les utilisateurs
                    </p>

                    {/* Statistiques rapides */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="text-2xl font-bold text-gray-900">{offs.length}</div>
                            <div className="text-sm text-gray-500">Total offres</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="text-2xl font-bold text-amber-600">
                                {offs.filter(o => o.status === "waiting").length}
                            </div>
                            <div className="text-sm text-gray-500">En attente</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="text-2xl font-bold text-green-600">
                                {offs.filter(o => o.status === "paid").length}
                            </div>
                            <div className="text-sm text-gray-500">Payées</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="text-2xl font-bold text-blue-600">
                                {offs.reduce((sum, offer) => sum + offer.price, 0).toFixed(2)}€
                            </div>
                            <div className="text-sm text-gray-500">Valeur totale</div>
                        </div>
                    </div>

                    {/* Bouton Créer une offre */}
                    <Link
                        href="/resell/offers/create"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Créer une nouvelle offre
                    </Link>
                </div>

                {/* Barre de recherche améliorée */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Recherche */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Rechercher par numéro, titre ou utilisateur..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>

                        {/* Filtre de statut */}
                        <div className="relative">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as Offer["status"] | "all")}
                                className="appearance-none px-4 py-3 pl-12 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white transition-all duration-200"
                            >
                                {filterOptions.map(({ label, value, count }) => (
                                    <option key={value} value={value}>
                                        {label} ({count})
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon
                                icon={faFilter}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Résultats de recherche */}
                    {search && (
                        <div className="mt-4 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                            {filteredOffers.length} résultat{filteredOffers.length > 1 ? 's' : ''} trouvé{filteredOffers.length > 1 ? 's' : ''} pour "{search}"
                        </div>
                    )}
                </div>

                {/* Liste des Offres */}
                <div className="space-y-4">
                    {filteredOffers.length > 0 ? (
                        filteredOffers.map((offer) => (
                            <div
                                key={offer.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
                            >
                                {/* En-tête de l'offre */}
                                <div className="relative p-6">
                                    {/* Bouton de suppression */}
                                    <button
                                        onClick={() => deleteOffer(offer.id)}
                                        disabled={isDeleting === offer.id}
                                        className="absolute top-4 right-4 h-10 w-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Supprimer cette offre"
                                    >
                                        {isDeleting === offer.id ? (
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTrash} />
                                        )}
                                    </button>

                                    {/* Contenu principal */}
                                    <div
                                        className="cursor-pointer pr-16"
                                        onClick={() => setExpandedOffer(expandedOffer === offer.id ? null : offer.id)}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        Offre #{offer.id}
                                                    </h3>
                                                    <span
                                                        className={clsx(
                                                            "px-3 py-1 text-sm font-semibold rounded-full border flex items-center gap-2",
                                                            statusClasses[offer.status]
                                                        )}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={statusIcons[offer.status]}
                                                            className="text-xs"
                                                        />
                                                        {statusLabels[offer.status]}
                                                    </span>
                                                </div>

                                                <p className="text-gray-700 font-medium mb-2">{offer.title}</p>

                                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faEuroSign} />
                                                        <span className="font-semibold text-green-600">{offer.price}€</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faUser} />
                                                        {offer.user_id}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                                        {new Date(offer.created_at).toLocaleDateString("fr-FR", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center mt-4 md:mt-0">
                                                <FontAwesomeIcon
                                                    icon={expandedOffer === offer.id ? faChevronUp : faChevronDown}
                                                    className="text-gray-400 text-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Détails étendus */}
                                {expandedOffer === offer.id && (
                                    <div className="border-t border-gray-100 bg-gray-50 p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Informations détaillées */}
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                                    <FontAwesomeIcon icon={faClipboardList} className="text-blue-500" />
                                                    Détails de l'offre
                                                </h4>
                                                <div className="bg-white rounded-lg p-4 space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Montant total :</span>
                                                        <span className="font-semibold text-green-600">{offer.price}€</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Utilisateur :</span>
                                                        <span className="font-medium">{offer.user_id}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Date de création :</span>
                                                        <span className="font-medium">
                                                            {new Date(offer.created_at).toLocaleDateString("fr-FR", {
                                                                day: "2-digit",
                                                                month: "long",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-gray-800">Description</h4>
                                                <div className="bg-white rounded-lg p-4">
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {offer.description || "Aucune description fournie"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3">
                                            {/* Bouton Modifier (seulement si en attente) */}
                                            {offer.status === "waiting" && (
                                                <Link
                                                    href={`/resell/offers/edit/${offer.id}`}
                                                    className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-all duration-200 border border-blue-200"
                                                >
                                                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                                                    Modifier l'offre
                                                </Link>
                                            )}

                                            {/* Bouton Consulter */}
                                            <Link
                                                href={`/resell/offers/check/${offer.id}`}
                                                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-200"
                                            >
                                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                                Consulter l'offre
                                            </Link>

                                            {/* Bouton Expédier (seulement si prêt à expédier) */}
                                            {offer.status === "expedition" && (
                                                <Link
                                                    href={`/resell/offers/expedition/${offer.id}`}
                                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-sm"
                                                >
                                                    <FontAwesomeIcon icon={faTruck} className="mr-2" />
                                                    Expédier le colis
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <FontAwesomeIcon
                                    icon={faBox}
                                    className="text-6xl text-gray-300 mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Aucune offre trouvée
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {search || filter !== "all"
                                        ? "Aucune offre ne correspond à vos critères de recherche."
                                        : "Aucune offre n'a encore été soumise."
                                    }
                                </p>
                                {(search || filter !== "all") && (
                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setFilter("all");
                                        }}
                                        className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-all duration-200"
                                    >
                                        Effacer les filtres
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}