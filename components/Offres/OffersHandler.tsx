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
    faTrash
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
    waiting: "En examen...",
    expedition: "Expédition en attente...",
    sended: "Paiement en attente...",
    paid: "Paiement reçu",
    deny: "Refusée",
};

const statusClasses: Record<Offer["status"], string> = {
    waiting: "bg-yellow-200 text-yellow-800",
    expedition: "bg-orange-200 text-orange-800",
    sended: "bg-yellow-200 text-orange-800",
    paid: "bg-green-200 text-green-800",
    deny: "bg-red-200 text-red-800",
};

export default function OffersHandler({ offers }: { offers: Offer[] }) {
    const [offs, setOffs] = useState<Offer[]>(offers);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | Offer["status"]>("all");
    const [expandedOffer, setExpandedOffer] = useState<string | null>(null);

    useEffect(() => {
        setOffs(offers);
    }, [offers]);

    // Filtrer les offres par statut ou recherche
    const filteredOffers = offs.filter((offer) => {
        return (
            (filter === "all" || offer.status === filter) &&
            offer.id.toLowerCase().includes(search.toLowerCase())
        );
    });

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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Titre de la section */}
            <div className="flex flex-col mt-8 items-center max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">📢 Gestion des Offres</h1>
                <p className="text-lg font-medium text-gray-500">
                    Gérez toutes les offres soumises
                </p>

                <Link href={"/resell/offers/create"} className={"my-4 px-3 py-2 bg-orange-300 text-orange-800 font-medium shadow-gray-300 rounded-lg shadow-md hover:bg-orange-400"} ><FontAwesomeIcon className={"mr-2 text-orange-800"} icon={faPlus} />Créer une offre</Link>
            </div>

            {/* Barre de recherche */}
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

            {/* Filtres */}
            <div className="flex justify-center gap-3 mb-6">
                {[
                    { label: "Toutes", value: "all" },
                    { label: "En attente", value: "waiting" },
                    { label: "Payées", value: "paid" },
                    { label: "Expédiées", value: "sended" },
                    { label: "Annulées", value: "deny" },
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
                            className="bg-white relative rounded-lg shadow-md mb-4 p-4 transition"
                        >
                            {/* Bouton de suppression de l'offre */}
                            <button onClick={() => deleteOffer(offer.id)} className={"absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] h-[35px] w-[35px] bg-red-200 hover:bg-red-300 transition-colors duration-200 rounded-full"}>
                                <FontAwesomeIcon className={"pl-[1px] text-red-900"} icon={faTrash} />
                            </button>

                            {/* En tête */}
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedOffer(expandedOffer === offer.id ? null : offer.id)}
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Offre #{offer.id}
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
                                        {statusLabels[offer.status]}
                                    </span>
                                    <FontAwesomeIcon
                                        icon={expandedOffer === offer.id ? faChevronUp : faChevronDown}
                                        className="text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Détails affichés si l'offre est dépliée */}
                            {expandedOffer === offer.id && (
                                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                                    <p className="text-gray-700 font-bold">
                                        Montant total : {" "}
                                        <span className={"font-normal text-green-600"}>{offer.price}€</span>
                                    </p>
                                    <p className="text-gray-700 font-bold">
                                        Utilisateur : <span className={"font-normal"}>{offer.user_id}</span>
                                    </p>
                                    <p className="text-gray-700 font-bold">
                                        Date :{" "}
                                        <span className={"font-normal"}>{new Date(offer.created_at).toLocaleDateString("fr-FR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}</span>
                                    </p>

                                    <div className={"flex gap-3 my-1"}>
                                        {offer.status === "waiting" && (
                                            <Link href={`/resell/offers/edit/${offer.id}`} className="mt-3 px-4 py-2 bg-orange-200 w-fit text-orange-800 font-semibold rounded-lg shadow-md hover:bg-orange-300 transition flex items-center gap-2">
                                                <FontAwesomeIcon icon={faPen} />
                                                Modifier l&#39;offre
                                            </Link>
                                        )}

                                        <Link href={`/resell/offers/check/${offer.id}`} className="mt-3 px-4 py-2 bg-orange-200 w-fit text-orange-800 font-semibold rounded-lg shadow-md hover:bg-orange-300 transition flex items-center gap-2">
                                            <FontAwesomeIcon icon={faEye} />
                                            Consulter l&#39;offre
                                        </Link>

                                        {offer.status === "expedition" && (
                                            <Link href={`/resell/offers/expedition/${offer.id}`} className="mt-3 px-4 py-2 bg-orange-400 w-fit text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition flex items-center gap-2">
                                                <FontAwesomeIcon icon={faTruck} />
                                                Expédier le colis
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-600 text-lg font-medium mb-8">
                            Aucune offre n&#39;a été répertoriée..
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
