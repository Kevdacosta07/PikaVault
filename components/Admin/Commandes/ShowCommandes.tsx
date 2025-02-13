"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch, faTruck, faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";

interface Command {
    items: string;
    id: string;
    email: string;
    userId: string;
    destinataire: string;
    adress: string;
    city: string;
    country: string;
    cp: number;
    totalAmount: number;
    createdAt: Date;
    status: string;
}

export default function ShowCommandes({ commandes } : { commandes : Command[] }) {
    const [searchQuery, setSearchQuery] = useState(""); // Barre de recherche
    const [filteredCommandes, setFilteredCommandes] = useState(commandes);
    const [openCommande, setOpenCommande] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all"); // Filtre actif

    // Filtrer les commandes selon la recherche et le filtre actif
    useEffect(() => {
        let filtered = commandes.filter((commande) =>
            commande.id.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (activeFilter !== "all") {
            filtered = filtered.filter((commande) => commande.status === activeFilter);
        }

        setFilteredCommandes(filtered);
    }, [searchQuery, commandes, activeFilter]);

    // Couleur du badge en fonction du statut
    const getStatusBadge = (status: string) => {
        return clsx(
            "px-3 py-1 text-sm font-semibold rounded-full",
            {
                "bg-yellow-100 text-yellow-700": status === "pending",
                "bg-orange-100 text-orange-700": status === "shipped",
                "bg-red-100 text-red-700": status === "cancelled",
                "bg-green-100 text-green-700": status === "paid",
                "bg-gray-100 text-gray-700": status === "unknown",
            }
        );
    };

    // ✅ Met à jour le statut de la commande à "Expédiée"
    const markAsShipped = async (commandeId : string) => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/commandes/shipped/${commandeId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "shipped" }),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

            // Met à jour le statut de la commande localement
            setFilteredCommandes((prev) =>
                prev.map((cmd) => cmd.id === commandeId ? { ...cmd, status: "shipped" } : cmd)
            );
        } catch (error) {
            console.error("Erreur de mise à jour :", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-200 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">📦 Gestion des Commandes</h1>
            <p className="text-lg mt-1 font-medium text-center mb-6 text-gray-500">Gérez toutes les commandes de vos utilisateurs</p>

            {/* 🔎 Barre de recherche */}
            <div className="max-w-lg mx-auto mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher une commande par numéro..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-10 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
                </div>
            </div>

            {/* 🎯 Boutons de filtrage */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                    { filter: "all", label: "Toutes", color: "bg-orange-400", hover: "hover:bg-orange-500" },
                    { filter: "pending", label: "En attente", color: "bg-yellow-200", hover: "hover:bg-yellow-300" },
                    { filter: "paid", label: "Payées", color: "bg-green-300", hover: "hover:bg-green-400" },
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
                    <p className="text-center text-gray-500">Aucune commande trouvée.</p>
                ) : (
                    filteredCommandes.map((commande) => (
                        <div key={commande.id} className="border-b bg-gray-100 rounded-md shadow-md mb-3">
                            {/* Ligne compacte */}
                            <button
                                onClick={() => setOpenCommande(openCommande === commande.id ? null : commande.id)}
                                className="w-full flex justify-between items-center px-3 py-4 rounded-lg text-left hover:bg-gray-200 transition duration-200"
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
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="text-gray-800 font-medium">
                                        Montant total : <span
                                        className="text-green-600 font-bold">{commande.totalAmount} €</span>
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        Destinataire : <span
                                        className="text-gray-500">{commande.destinataire}</span>
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        Adresse : <span
                                        className="text-gray-500">{commande.adress}, {commande.cp}, {commande.city} ({commande.country})</span>
                                    </p>

                                    {/* 🔗 Actions */}
                                    <div className="mt-4 flex gap-4">
                                        <Link href={`/commandes/${commande.id}`}
                                              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition flex items-center gap-2">
                                            <FontAwesomeIcon icon={faEye}/>
                                            Consulter la commande
                                        </Link>

                                        {commande.status === "paid" && (
                                            <button
                                                onClick={() => markAsShipped(commande.id)}
                                                disabled={isLoading}
                                                className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition flex items-center gap-2 disabled:bg-gray-400"
                                            >
                                                <FontAwesomeIcon icon={faTruck}/>
                                                Marquer comme expédiée
                                            </button>
                                        )}
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
