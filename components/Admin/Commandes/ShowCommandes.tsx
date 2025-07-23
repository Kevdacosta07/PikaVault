"use client";

import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faSearch,
    faTruck,
    faEye,
    faCalendarAlt,
    faEuroSign,
    faSort,
    faMapMarkerAlt,
    faUser,
    faShoppingBag,
    faSpinner,
    faCheckCircle,
    faClock,
    faTimes, IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

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

interface FilterButton {
    filter: string;
    label: string;
    color: string;
    icon: IconDefinition;
    count?: number;
}

export default function ShowCommandes({ commandes }: { commandes: Command[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCommandes, setFilteredCommandes] = useState(commandes);
    const [openCommande, setOpenCommande] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [sortBy, setSortBy] = useState<"date" | "amount" | "id">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // Calculer les statistiques des commandes
    const stats = useMemo(() => {
        const total = commandes.length;
        const pending = commandes.filter(c => c.status === "pending").length;
        const paid = commandes.filter(c => c.status === "paid").length;
        const shipped = commandes.filter(c => c.status === "shipped").length;
        const cancelled = commandes.filter(c => c.status === "cancelled").length;
        const totalRevenue = commandes
            .filter(c => c.status === "paid" || c.status === "shipped")
            .reduce((sum, c) => sum + c.totalAmount, 0);

        return { total, pending, paid, shipped, cancelled, totalRevenue };
    }, [commandes]);

    // Configuration des filtres avec compteurs
    const filterButtons: FilterButton[] = [
        { filter: "all", label: "Toutes", color: "bg-slate-500", icon: faShoppingBag, count: stats.total },
        { filter: "pending", label: "En attente", color: "bg-amber-500", icon: faClock, count: stats.pending },
        { filter: "paid", label: "Payées", color: "bg-green-500", icon: faCheckCircle, count: stats.paid },
        { filter: "shipped", label: "Expédiées", color: "bg-blue-500", icon: faTruck, count: stats.shipped },
        { filter: "cancelled", label: "Annulées", color: "bg-red-500", icon: faTimes, count: stats.cancelled },
    ];

    // Filtrage et tri des commandes
    useEffect(() => {
        let filtered = commandes.filter((commande) =>
            commande.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            commande.destinataire.toLowerCase().includes(searchQuery.toLowerCase()) ||
            commande.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (activeFilter !== "all") {
            filtered = filtered.filter((commande) => commande.status === activeFilter);
        }

        // Tri des commandes
        filtered.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case "date":
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    break;
                case "amount":
                    comparison = a.totalAmount - b.totalAmount;
                    break;
                case "id":
                    comparison = a.id.localeCompare(b.id);
                    break;
            }
            return sortOrder === "asc" ? comparison : -comparison;
        });

        setFilteredCommandes(filtered);
    }, [searchQuery, commandes, activeFilter, sortBy, sortOrder]);

    // Configuration des badges de statut
    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: {
                bg: "bg-amber-100 text-amber-800 border-amber-200",
                label: "En attente",
                icon: faClock,
                pulse: true
            },
            shipped: {
                bg: "bg-blue-100 text-blue-800 border-blue-200",
                label: "Expédiée",
                icon: faTruck,
                pulse: false
            },
            cancelled: {
                bg: "bg-red-100 text-red-800 border-red-200",
                label: "Annulée",
                icon: faTimes,
                pulse: false
            },
            paid: {
                bg: "bg-green-100 text-green-800 border-green-200",
                label: "Payée",
                icon: faCheckCircle,
                pulse: false
            },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || {
            bg: "bg-gray-100 text-gray-800 border-gray-200",
            label: "Inconnue",
            icon: faSort,
            pulse: false
        };

        return (
            <span className={clsx(
                "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-full border",
                config.bg,
                config.pulse && "animate-pulse"
            )}>
                <FontAwesomeIcon icon={config.icon} className="text-xs" />
                {config.label}
            </span>
        );
    };

    // Marquer comme expédiée
    const markAsShipped = async (commandeId: string) => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/commandes/shipped/${commandeId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "shipped" }),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

            setFilteredCommandes((prev) =>
                prev.map((cmd) => cmd.id === commandeId ? { ...cmd, status: "shipped" } : cmd)
            );
        } catch (error) {
            console.error("Erreur de mise à jour :", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSort = (field: "date" | "amount" | "id") => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("desc");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* En-tête moderne */}
            <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <FontAwesomeIcon icon={faShoppingBag} className="text-white" />
                                </div>
                                Gestion des Commandes
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Gérez toutes les commandes de vos utilisateurs en temps réel
                            </p>
                        </div>

                        {/* Statistiques rapides */}
                        <div className="flex gap-4 text-sm">
                            <div className="text-center">
                                <div className="font-bold text-2xl text-blue-600">{stats.total}</div>
                                <div className="text-gray-500">Total</div>
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-2xl text-green-600">{stats.totalRevenue}€</div>
                                <div className="text-gray-500">Revenus</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Barre de recherche et contrôles */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Recherche */}
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher par numéro, client ou email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pl-11 pr-4 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Tri */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleSort("date")}
                                className={clsx(
                                    "px-4 py-3 rounded-xl text-sm font-medium transition-all border",
                                    sortBy === "date"
                                        ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                                )}
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                onClick={() => toggleSort("amount")}
                                className={clsx(
                                    "px-4 py-3 rounded-xl text-sm font-medium transition-all border",
                                    sortBy === "amount"
                                        ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                                )}
                            >
                                <FontAwesomeIcon icon={faEuroSign} className="mr-2" />
                                Montant {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filtres avec compteurs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {filterButtons.map(({ filter, label, color, icon, count }) => (
                        <button
                            key={filter}
                            className={clsx(
                                "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border flex items-center gap-3 min-w-fit",
                                activeFilter === filter
                                    ? `${color} text-white border-transparent shadow-lg transform scale-105`
                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                            )}
                            onClick={() => setActiveFilter(filter)}
                        >
                            <FontAwesomeIcon icon={icon} />
                            <span>{label}</span>
                            <span className={clsx(
                                "px-2 py-0.5 rounded-full text-xs font-bold",
                                activeFilter === filter
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-gray-600"
                            )}>
                                {count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Liste des commandes */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredCommandes.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xl" />
                                </div>
                                <p className="text-gray-500 text-lg">Aucune commande trouvée</p>
                                <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos critères de recherche</p>
                            </motion.div>
                        ) : (
                            filteredCommandes.map((commande, index) => (
                                <motion.div
                                    key={commande.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                                >
                                    {/* En-tête de la commande */}
                                    <button
                                        onClick={() => setOpenCommande(openCommande === commande.id ? null : commande.id)}
                                        className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                                                    #{commande.id.slice(-3)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        Commande #{commande.id}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                        <span className="flex items-center gap-1">
                                                            <FontAwesomeIcon icon={faUser} className="text-xs" />
                                                            {commande.destinataire}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-xs" />
                                                            {new Date(commande.createdAt).toLocaleDateString("fr-FR")}
                                                        </span>
                                                        <span className="flex items-center gap-1 font-semibold text-green-600">
                                                            <FontAwesomeIcon icon={faEuroSign} className="text-xs" />
                                                            {commande.totalAmount}€
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {getStatusBadge(commande.status)}
                                                <FontAwesomeIcon
                                                    icon={openCommande === commande.id ? faChevronUp : faChevronDown}
                                                    className="text-gray-400 transition-transform duration-200"
                                                />
                                            </div>
                                        </div>
                                    </button>

                                    {/* Détails déroulants */}
                                    <AnimatePresence>
                                        {openCommande === commande.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-t border-gray-100 bg-gray-50"
                                            >
                                                <div className="p-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                        <div className="space-y-3">
                                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                                <FontAwesomeIcon icon={faUser} className="text-blue-500" />
                                                                Informations client
                                                            </h4>
                                                            <div className="space-y-2 text-sm">
                                                                <div>
                                                                    <span className="font-medium text-gray-700">Nom :</span>
                                                                    <span className="ml-2 text-gray-600">{commande.destinataire}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium text-gray-700">Email :</span>
                                                                    <span className="ml-2 text-gray-600">{commande.email}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500" />
                                                                Adresse de livraison
                                                            </h4>
                                                            <div className="text-sm text-gray-600">
                                                                <div>{commande.adress}</div>
                                                                <div>{commande.cp} {commande.city}</div>
                                                                <div>{commande.country}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                                        <Link
                                                            href={`/commandes/${commande.id}`}
                                                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                            Consulter
                                                        </Link>

                                                        {commande.status === "paid" && (
                                                            <button
                                                                onClick={() => markAsShipped(commande.id)}
                                                                disabled={isLoading}
                                                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                            >
                                                                {isLoading ? (
                                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faTruck} />
                                                                )}
                                                                Marquer expédiée
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}