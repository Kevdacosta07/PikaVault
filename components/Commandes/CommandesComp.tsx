"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faSearch,
    faTimes,
    faCalendarAlt,
    faMapMarkerAlt,
    faEuroSign,
    faBox,
    faShoppingBag,
    faEye,
    faTh,
    faList,
    faCheckCircle,
    faClock,
    faTruck,
    faTimesCircle,
    faHeart,
    faStar,
    faBolt
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

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

export default function CommandesPages({ commandes }: { commandes: Order[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCommandes, setFilteredCommandes] = useState(commandes);
    const [openCommande, setOpenCommande] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    // Configuration des filtres avec couleurs Pikachu
    const filterConfig = [
        {
            filter: "all",
            label: "Toutes mes commandes",
            icon: faShoppingBag,
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50",
            textColor: "text-yellow-700",
            borderColor: "border-yellow-200",
            count: commandes.length
        },
        {
            filter: "pending",
            label: "En cours",
            icon: faClock,
            color: "from-amber-500 to-yellow-500",
            bgColor: "bg-amber-50",
            textColor: "text-amber-700",
            borderColor: "border-amber-200",
            count: commandes.filter(c => c.status === "pending").length
        },
        {
            filter: "paid",
            label: "Payées",
            icon: faCheckCircle,
            color: "from-green-500 to-yellow-500",
            bgColor: "bg-green-50",
            textColor: "text-green-700",
            borderColor: "border-green-200",
            count: commandes.filter(c => c.status === "paid").length
        },
        {
            filter: "shipped",
            label: "Expédiées",
            icon: faTruck,
            color: "from-blue-500 to-yellow-500",
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
            borderColor: "border-blue-200",
            count: commandes.filter(c => c.status === "shipped").length
        },
        {
            filter: "cancelled",
            label: "Annulées",
            icon: faTimesCircle,
            color: "from-red-500 to-yellow-500",
            bgColor: "bg-red-50",
            textColor: "text-red-700",
            borderColor: "border-red-200",
            count: commandes.filter(c => c.status === "cancelled").length
        },
    ];

    // Filtrage des commandes
    useEffect(() => {
        let filtered = commandes.filter((commande) =>
            commande.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            commande.adress.toLowerCase().includes(searchQuery.toLowerCase()) ||
            commande.city.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (activeFilter !== "all") {
            filtered = filtered.filter((commande) => commande.status === activeFilter);
        }

        setFilteredCommandes(filtered);
    }, [searchQuery, commandes, activeFilter]);

    // Configuration des badges de statut avec couleurs Pikachu
    const getStatusConfig = (status: string) => {
        const configs = {
            pending: {
                bg: "bg-gradient-to-r from-amber-100 to-yellow-100",
                border: "border-amber-300",
                text: "text-amber-800",
                icon: faClock,
                label: "En cours de traitement",
                description: "Votre commande est en préparation ⚡",
                pulse: true
            },
            shipped: {
                bg: "bg-gradient-to-r from-blue-100 to-yellow-100",
                border: "border-blue-300",
                text: "text-blue-800",
                icon: faTruck,
                label: "Expédiée",
                description: "Votre commande est en route vers vous ⚡",
                pulse: false
            },
            paid: {
                bg: "bg-gradient-to-r from-green-100 to-yellow-100",
                border: "border-green-300",
                text: "text-green-800",
                icon: faCheckCircle,
                label: "Livrée",
                description: "Commande reçue avec succès ! ⚡",
                pulse: false
            },
            cancelled: {
                bg: "bg-gradient-to-r from-red-100 to-yellow-100",
                border: "border-red-300",
                text: "text-red-800",
                icon: faTimesCircle,
                label: "Annulée",
                description: "Cette commande a été annulée",
                pulse: false
            }
        };

        return configs[status as keyof typeof configs] || {
            bg: "bg-gradient-to-r from-gray-100 to-yellow-100",
            border: "border-gray-300",
            text: "text-gray-800",
            icon: faBox,
            label: "Statut inconnu",
            description: "Statut non défini",
            pulse: false
        };
    };

    const clearSearch = () => setSearchQuery("");

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
            {/* Header Hero avec couleurs Pikachu */}
            <div className="bg-white shadow-lg border-b border-yellow-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full shadow-lg">
                            <FontAwesomeIcon icon={faBolt} className="text-xl animate-pulse" />
                            <span className="font-bold text-lg">Mes Commandes PikaVault</span>
                            <FontAwesomeIcon icon={faBolt} className="text-xl animate-pulse" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900">
                            Votre historique de <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">commandes</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Retrouvez toutes vos commandes Pokémon, suivez leur statut et revivez vos meilleures trouvailles ! ⚡
                        </p>

                        {/* Stats utilisateur avec couleurs Pikachu */}
                        <div className="flex flex-wrap justify-center items-center gap-8 pt-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                                    {commandes.length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Commandes passées</div>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-yellow-300"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                                    {commandes.reduce((sum, c) => sum + c.totalAmount, 0)}€
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total dépensé</div>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-yellow-300"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-500">
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Dresseur Premium</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Barre de recherche avec couleurs Pikachu */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative group">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-200"
                            />
                            <input
                                type="text"
                                placeholder="Recherchez dans vos commandes... ⚡"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-14 py-5 bg-white border-2 border-yellow-200 rounded-3xl
                                         focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500
                                         shadow-xl hover:shadow-2xl transition-all duration-200
                                         text-lg placeholder:text-gray-400 hover:border-yellow-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-5 top-1/2 transform -translate-y-1/2
                                             w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full
                                             flex items-center justify-center
                                             text-red-500 hover:text-red-600
                                             transition-all duration-200 hover:scale-110"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="text-sm" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filtres avec couleurs Pikachu */}
                <div className="mb-8 space-y-6">
                    <div className="flex flex-wrap justify-center gap-3">
                        {filterConfig.map(({ filter, label, icon, color, bgColor, textColor, borderColor, count }) => (
                            <motion.button
                                key={filter}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={clsx(
                                    "relative px-5 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl",
                                    activeFilter === filter
                                        ? `bg-gradient-to-r ${color} text-white shadow-2xl`
                                        : `${bgColor} ${textColor} border-2 ${borderColor} hover:border-yellow-400`
                                )}
                                onClick={() => setActiveFilter(filter)}
                            >
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon
                                        icon={icon}
                                        className={activeFilter === filter ? "text-white" : textColor}
                                    />
                                    <span className="text-sm font-bold">
                                        {label}
                                    </span>
                                    <span className={clsx(
                                        "px-2 py-1 rounded-full text-xs font-bold",
                                        activeFilter === filter
                                            ? "bg-white/20 text-white"
                                            : "bg-white text-gray-600 shadow-sm border border-yellow-200"
                                    )}>
                                        {count}
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Contrôles d'affichage avec couleurs Pikachu */}
                    <div className="flex justify-between items-center">
                        <div className="text-gray-600 font-medium">
                            <span className="font-bold text-yellow-600">{filteredCommandes.length}</span> commande{filteredCommandes.length > 1 ? 's' : ''}
                            {searchQuery && (
                                <span className="ml-2 text-sm">
                                    pour "<span className="font-semibold text-yellow-600">{searchQuery}</span>"
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('list')}
                                className={clsx(
                                    "p-3 rounded-xl transition-all duration-200 font-medium",
                                    viewMode === 'list'
                                        ? "bg-yellow-100 text-yellow-600 shadow-md border border-yellow-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                                )}
                            >
                                <FontAwesomeIcon icon={faList} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={clsx(
                                    "p-3 rounded-xl transition-all duration-200 font-medium",
                                    viewMode === 'grid'
                                        ? "bg-yellow-100 text-yellow-600 shadow-md border border-yellow-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                                )}
                            >
                                <FontAwesomeIcon icon={faTh} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Liste des commandes avec couleurs Pikachu */}
                <div className="space-y-6">
                    {filteredCommandes.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <FontAwesomeIcon icon={faShoppingBag} className="text-6xl text-yellow-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Aucune commande trouvée</h3>
                            <p className="text-gray-600 mb-8 text-lg">
                                {searchQuery
                                    ? "Aucune commande ne correspond à votre recherche."
                                    : "Vous n'avez pas encore passé de commande."
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {searchQuery ? (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setActiveFilter("all");
                                        }}
                                        className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-2xl font-bold hover:from-yellow-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Voir toutes mes commandes
                                    </button>
                                ) : (
                                    <Link
                                        href="/boutique"
                                        className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-2xl font-bold hover:from-yellow-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Découvrir la boutique ⚡
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <div className={clsx(
                            viewMode === 'grid'
                                ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                                : "space-y-6"
                        )}>
                            {filteredCommandes.map((commande, index) => {
                                const statusConfig = getStatusConfig(commande.status);
                                const isOpen = openCommande === commande.id;

                                return (
                                    <motion.div
                                        key={commande.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-yellow-200"
                                    >
                                        {/* En-tête de la commande avec couleurs Pikachu */}
                                        <button
                                            onClick={() => setOpenCommande(isOpen ? null : commande.id)}
                                            className="w-full p-8 text-left hover:bg-yellow-50 transition-colors duration-200"
                                        >
                                            <div className="flex justify-between items-start gap-6">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <h3 className="text-2xl font-black text-gray-900">
                                                            Commande #{commande.id.slice(-6)}
                                                        </h3>
                                                        <div className={clsx(
                                                            "inline-flex items-center gap-2 px-4 py-2 rounded-full border-2",
                                                            statusConfig.bg,
                                                            statusConfig.border,
                                                            statusConfig.text,
                                                            statusConfig.pulse && "animate-pulse"
                                                        )}>
                                                            <FontAwesomeIcon icon={statusConfig.icon} className="text-sm" />
                                                            <span className="font-bold text-sm">{statusConfig.label}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm text-gray-500 mb-4">{statusConfig.description}</p>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="flex items-center gap-3 text-gray-600">
                                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-yellow-500" />
                                                            <span className="font-medium">
                                                                {new Date(commande.createdAt).toLocaleDateString("fr-FR", {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <FontAwesomeIcon icon={faEuroSign} className="text-green-500" />
                                                            <span className="font-black text-xl text-green-600">{commande.totalAmount} €</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center gap-2">
                                                    <FontAwesomeIcon
                                                        icon={isOpen ? faChevronUp : faChevronDown}
                                                        className="text-yellow-500 text-xl transform transition-transform duration-200"
                                                    />
                                                    <span className="text-xs text-yellow-600 font-medium">
                                                        {isOpen ? 'Masquer' : 'Détails'}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Détails déroulants avec couleurs Pikachu */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="border-t border-yellow-200"
                                                >
                                                    <div className="p-8 space-y-8 bg-gradient-to-br from-yellow-50 to-orange-50">
                                                        {/* Adresse de livraison avec couleurs Pikachu */}
                                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500" />
                                                                </div>
                                                                <h4 className="font-black text-gray-900 text-lg">Adresse de livraison</h4>
                                                            </div>
                                                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                                                <p className="text-gray-700 font-medium leading-relaxed">
                                                                    {commande.adress}<br />
                                                                    {commande.cp} {commande.city}<br />
                                                                    <span className="font-bold">{commande.country}</span>
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Articles commandés avec couleurs Pikachu */}
                                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
                                                            <div className="flex items-center gap-3 mb-6">
                                                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                                                    <FontAwesomeIcon icon={faBox} className="text-yellow-500" />
                                                                </div>
                                                                <h4 className="font-black text-gray-900 text-lg">Vos cartes Pokémon ⚡</h4>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {JSON.parse(commande.items).map((item: {image: string, title: string, amount: number, price: number}, itemIndex: number) => (
                                                                    <div key={itemIndex} className="flex items-center gap-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.title}
                                                                            className="w-20 h-20 object-cover rounded-xl shadow-lg border-2 border-yellow-300"
                                                                        />
                                                                        <div className="flex-1">
                                                                            <h5 className="font-bold text-gray-900 text-lg">{item.title}</h5>
                                                                            <p className="text-gray-600 font-medium">
                                                                                Quantité: <span className="font-bold text-yellow-600">{item.amount}</span> × <span className="font-bold text-yellow-600">{item.price} €</span>
                                                                            </p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="font-black text-xl bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                                                                                {(item.amount * item.price).toFixed(2)} €
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Actions avec couleurs Pikachu */}
                                                        <div className="flex gap-4">
                                                            <Link
                                                                href={`/commandes/${commande.id}`}
                                                                className="flex-1 px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-2xl font-bold hover:from-yellow-600 hover:to-red-600 transition-all duration-200 text-center shadow-lg hover:shadow-xl"
                                                            >
                                                                <FontAwesomeIcon icon={faEye} className="mr-3" />
                                                                Voir tous les détails
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}