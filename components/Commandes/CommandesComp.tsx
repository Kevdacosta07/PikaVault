"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";

interface Order {
    id: string;
    createdAt: string;
    totalAmount: number;
    adress: string;
    cp: string;
    city: string;
    country: string;
    status: string;
    items: string;
}

export default function CommandesPages({ commandes } : { commandes : Order[] }) {
    const [searchQuery, setSearchQuery] = useState(""); // 🔎 Recherche
    const [filteredCommandes, setFilteredCommandes] = useState(commandes);
    const [openCommande, setOpenCommande] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState("all"); // 🎯 Filtre actif

    // 🔎 Mettre à jour les résultats selon la recherche et le filtre
    useEffect(() => {
        let filtered = commandes.filter((commande) =>
            commande.id.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (activeFilter !== "all") {
            filtered = filtered.filter((commande) => commande.status === activeFilter);
        }

        setFilteredCommandes(filtered);
    }, [searchQuery, commandes, activeFilter]);

    // 🎨 Couleur du badge en fonction du statut
    const getStatusBadge = (status: string) => {
        return clsx(
            "px-3 py-1 text-sm font-semibold rounded-full",
            {
                "bg-yellow-100 text-yellow-700": status === "pending",
                "bg-orange-100 text-orange-700": status === "shipped",
                "bg-red-100 text-red-700": status === "cancelled",
                "bg-green-100 text-green-700": status === "paid",
                "bg-gray-200 text-gray-700": !["pending", "shipped", "cancelled", "paid"].includes(status),
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📦 Mes Commandes</h1>

            {/* 🔎 Barre de recherche */}
            <div className="max-w-lg mx-auto mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher une commande par numéro..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-10 text-lg border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
                </div>
            </div>

            {/* 🎯 Boutons de filtrage */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                    { filter: "all", label: "Toutes", color: "bg-orange-400", hover: "hover:bg-orange-500" },
                    { filter: "pending", label: "En attente", color: "bg-yellow-400", hover: "hover:bg-yellow-500" },
                    { filter: "paid", label: "Payées", color: "bg-green-400", hover: "hover:bg-green-500" },
                    { filter: "shipped", label: "Expédiées", color: "bg-orange-300", hover: "hover:bg-orange-400" },
                    { filter: "cancelled", label: "Annulées", color: "bg-red-300", hover: "hover:bg-red-400" },
                ].map(({ filter, label, color, hover }) => (
                    <button
                        key={filter}
                        className={clsx(
                            `px-4 py-2 rounded-md font-semibold shadow-md transition-colors ${hover}`,
                            {
                                [color]: activeFilter === filter,
                                "bg-gray-300 text-gray-700 hover:bg-gray-400": activeFilter !== filter,
                            }
                        )}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* 📦 Liste des commandes */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {filteredCommandes.length === 0 ? (
                    <div>
                        <p className="text-center text-gray-600">Aucune commande répertoriée.</p>
                    </div>
                ) : (
                    filteredCommandes.map((commande) => (
                        <div key={commande.id} className="border-b bg-gray-100 rounded-md shadow-md mb-3">
                            {/* Ligne compacte */}
                            <button
                                onClick={() => setOpenCommande(openCommande === commande.id ? null : commande.id)}
                                className="w-full flex justify-between items-center px-3 py-4 rounded-md text-left hover:bg-gray-200 transition duration-200"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">Commande #{commande.id}</p>
                                    <p className="text-sm text-gray-500">{new Date(commande.createdAt).toLocaleDateString("fr-FR")}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={getStatusBadge(commande.status)}>
                                        {commande.status === "pending" ? "En attente" :
                                            commande.status === "shipped" ? "Expédiée" :
                                                commande.status === "paid" ? "Payée" :
                                                    commande.status === "cancelled" ? "Annulée" : "Inconnue"}
                                    </span>
                                    <FontAwesomeIcon icon={openCommande === commande.id ? faChevronUp : faChevronDown} className="text-gray-500"/>
                                </div>
                            </button>

                            {/* 🔽 Détails déroulants */}
                            {openCommande === commande.id && (
                                <div className="p-4 mt-2 bg-gray-50 rounded-lg shadow-sm">
                                    <p className="text-gray-800 font-medium">
                                        Montant total : <span className="text-green-600 font-bold">{commande.totalAmount} €</span>
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        Adresse : <span className="text-gray-500">{commande.adress}, {commande.cp}, {commande.city} ({commande.country})</span>
                                    </p>

                                    {/* Articles commandés */}
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-700">📦 Articles :</h3>
                                        <div className="space-y-2">
                                            {JSON.parse(commande.items).map((item: {image: string, title: string, amount: number, price: number}, index : number) => (
                                                <div key={index} className="flex items-center gap-4 border p-2 rounded-lg shadow-sm">
                                                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg"/>
                                                    <div>
                                                        <p className="text-gray-800 font-medium">{item.title}</p>
                                                        <p className="text-gray-500">{item.amount} x {item.price} €</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Voir plus de détails */}
                                    <div className="mt-6 mb-3">
                                        <Link href={`/commandes/${commande.id}`} className="px-4 mt-2 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                                            Voir plus de détails
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
