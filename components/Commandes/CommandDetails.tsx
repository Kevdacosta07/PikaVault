"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faBox,
    faCheckCircle,
    faClock,
    faTruck,
    faTimesCircle,
    faMapMarkerAlt,
    faUser,
    faShoppingBag,
    faBolt,
    faStar,
    faShieldAlt,
    faRocket,
    faSpinner,
    faHeart,
    faGift,
    faTag,
    faEye,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
    id: string;
    items: string;
    destinataire: string;
    adress: string;
    city: string;
    country: string;
    cp: number;
    status: string;
    totalAmount: number;
    createdAt: Date;
}

interface OrderItem {
    id: string;
    title: string;
    amount: number;
    price: number;
    image: string;
}

export default function CommandDetails({ order, session }: { order: Order, session: Session }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const orderItems: OrderItem[] = JSON.parse(order.items);
    const totalItems = orderItems.reduce((acc, item) => acc + item.amount, 0);

    // Configuration des statuts avec couleurs et animations
    const getStatusConfig = (status: string) => {
        const configs = {
            pending: {
                bg: "bg-gradient-to-r from-amber-100 to-yellow-100",
                border: "border-amber-300",
                text: "text-amber-800",
                icon: faClock,
                label: "En cours de traitement",
                description: "Votre commande est en préparation",
                pulse: true,
                color: "from-amber-500 to-yellow-500"
            },
            shipped: {
                bg: "bg-gradient-to-r from-blue-100 to-cyan-100",
                border: "border-blue-300",
                text: "text-blue-800",
                icon: faTruck,
                label: "Expédiée",
                description: "Votre commande est en route",
                pulse: false,
                color: "from-blue-500 to-cyan-500"
            },
            paid: {
                bg: "bg-gradient-to-r from-green-100 to-emerald-100",
                border: "border-green-300",
                text: "text-green-800",
                icon: faCheckCircle,
                label: "Livrée",
                description: "Commande reçue avec succès",
                pulse: false,
                color: "from-green-500 to-emerald-500"
            },
            cancelled: {
                bg: "bg-gradient-to-r from-red-100 to-rose-100",
                border: "border-red-300",
                text: "text-red-800",
                icon: faTimesCircle,
                label: "Annulée",
                description: "Cette commande a été annulée",
                pulse: false,
                color: "from-red-500 to-rose-500"
            }
        };

        return configs[status as keyof typeof configs] || {
            bg: "bg-gradient-to-r from-gray-100 to-slate-100",
            border: "border-gray-300",
            text: "text-gray-800",
            icon: faBox,
            label: "Statut inconnu",
            description: "Statut non défini",
            pulse: false,
            color: "from-gray-500 to-slate-500"
        };
    };

    const statusConfig = getStatusConfig(order.status);

    // Copier l'ID de commande
    const copyOrderId = async () => {
        try {
            await navigator.clipboard.writeText(order.id);
            setShowCopySuccess(true);
            setTimeout(() => setShowCopySuccess(false), 2000);
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
        }
    };

    // Mettre à jour la commande en "expédiée"
    const markAsShipped = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/commandes/shipped/${order.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "shipped" }),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

            router.refresh();
        } catch (error) {
            console.error("Erreur de mise à jour :", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
            {/* Header Hero */}
            <div className="bg-white shadow-xl border-b border-yellow-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Navigation */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-700 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                            Retour aux commandes
                        </button>
                    </div>

                    {/* Header principal */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full shadow-lg">
                            <FontAwesomeIcon icon={faBolt} className="text-xl animate-pulse" />
                            <span className="font-bold text-lg">Détails de la commande</span>
                            <FontAwesomeIcon icon={faBolt} className="text-xl animate-pulse" />
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                                Commande <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">#{order.id.slice(-8).toUpperCase()}</span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                Passée le {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            </p>
                        </div>

                        {/* Statut principal */}
                        <div className="flex justify-center">
                            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} shadow-lg ${statusConfig.pulse ? 'animate-pulse' : ''}`}>
                                <FontAwesomeIcon icon={statusConfig.icon} className="text-xl" />
                                <div className="text-center">
                                    <div className="font-bold text-lg">{statusConfig.label}</div>
                                    <div className="text-sm opacity-75">{statusConfig.description}</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats rapides */}
                        <div className="flex flex-wrap justify-center items-center gap-8 pt-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                                    {totalItems}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Articles</div>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                                    {order.totalAmount}€
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total</div>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    {order.destinataire}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Destinataire</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corps principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Articles commandés */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <FontAwesomeIcon icon={faShoppingBag} />
                                    Articles commandés ({totalItems})
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {orderItems.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200 hover:shadow-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="relative flex-shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title}
                                                            width={80}
                                                            height={80}
                                                            className="rounded-xl shadow-md"
                                                        />
                                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                            {item.amount}
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-gray-900 text-lg truncate">{item.title}</h3>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                <FontAwesomeIcon icon={faTag} />
                                                                <span>{item.amount} × {item.price}€</span>
                                                            </div>
                                                            <div className="font-bold text-xl text-gray-900">
                                                                {(item.amount * item.price).toFixed(2)}€
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Total */}
                                <div className="border-t border-gray-200 pt-6 mt-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-gray-900">Total de la commande</span>
                                        <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                            {order.totalAmount}€
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar informations */}
                    <div className="space-y-6">

                        {/* Informations de livraison */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
                                Livraison
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-500" />
                                        {order.destinataire}
                                    </div>
                                    <div className="text-gray-700 text-sm leading-relaxed">
                                        {order.adress}<br />
                                        {order.cp} {order.city}<br />
                                        {order.country}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faRocket} className="text-purple-500" />
                                Actions
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={copyOrderId}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                                >
                                    <FontAwesomeIcon icon={showCopySuccess ? faCheckCircle : faCopy} className={showCopySuccess ? "text-green-500" : ""} />
                                    {showCopySuccess ? "ID copié !" : "Copier l'ID"}
                                </button>

                                <Link
                                    href="/commandes"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-semibold transition-all duration-200"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                    Toutes mes commandes
                                </Link>

                                <Link
                                    href="/boutique"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-semibold transition-all duration-200"
                                >
                                    <FontAwesomeIcon icon={faShoppingBag} />
                                    Continuer mes achats
                                </Link>

                                {/* Action admin */}
                                {order.status === "paid" && session.user.admin === 1 && (
                                    <button
                                        onClick={markAsShipped}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                Mise à jour...
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faTruck} />
                                                Marquer comme expédiée
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Timeline de la commande */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faClock} className="text-indigo-500" />
                                Suivi de commande
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Commande confirmée</p>
                                        <p className="text-sm text-gray-600">Paiement accepté avec succès</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-3 ${order.status === 'paid' ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'paid' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <FontAwesomeIcon icon={faBox} className={order.status === 'paid' ? 'text-blue-500' : 'text-gray-400'} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Préparation</p>
                                        <p className="text-sm text-gray-600">Emballage des articles</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-3 ${order.status === 'shipped' ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'shipped' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                                        <FontAwesomeIcon icon={faTruck} className={order.status === 'shipped' ? 'text-purple-500' : 'text-gray-400'} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Expédition</p>
                                        <p className="text-sm text-gray-600">Colis en route</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avantages PikaVault */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border border-purple-200 p-6">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                                Avantages PikaVault
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                    <span>Authenticité garantie 100%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
                                    <span>Livraison express 24-48h</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                                    <span>Points fidélité sur chaque achat</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faGift} className="text-purple-500" />
                                    <span>Emballage collector premium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}