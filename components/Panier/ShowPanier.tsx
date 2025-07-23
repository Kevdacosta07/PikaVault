"use client";

import { useContext, useEffect, useState } from "react";
import { PanierContext } from "@/components/Providers/PanierProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faTrash,
    faPlus,
    faMinus,
    faChevronUp,
    faChevronDown,
    faMapMarkerAlt,
    faUser,
    faCheckCircle,
    faExclamationTriangle,
    faSpinner,
    faBolt,
    faCreditCard,
    faShieldAlt,
    faRocket,
    faStar,
    faHeart,
    faGift,
    faTag,
    faTimes,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface UserProfile {
    name: string;
    adress: string;
    city: string;
    cp: string;
    country: string;
}

export default function ShowPanier({ session }: { session: Session | null }) {
    const panierContext = useContext(PanierContext) ?? {
        panier: [],
        ajouterAuPanier: () => {},
        supprimerDuPanier: () => {}
    };

    const { panier, ajouterAuPanier, supprimerDuPanier } = panierContext;
    const [isClient, setIsClient] = useState(false);
    const [pr, setPr] = useState<UserProfile | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isSendingDataExpanded, setSendingDataExpanded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/request/profile?userId=" + session?.user?.id);
                const data: UserProfile = await response.json();
                setPr(data);
            } catch (error) {
                console.error("Erreur de récupération du profil :", error);
                setPr(null);
            } finally {
                setIsLoadingUser(false);
            }
        }
        if (session?.user?.id) {
            fetchUser();
        }
    }, [session?.user?.id]);

    if (!isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <FontAwesomeIcon icon={faSpinner} className="text-4xl text-yellow-500 animate-spin mb-4" />
                    <p className="text-lg text-gray-600">Chargement du panier...</p>
                </div>
            </div>
        );
    }

    // Panier vide
    if (!panier || panier.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
                {/* Header */}
                <div className="bg-white shadow-lg border-b border-yellow-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Link
                                href="/boutique"
                                className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span>Retour à la boutique</span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full shadow-lg mb-6">
                                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                                <span className="font-bold text-lg">Mon Panier PikaVault</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenu panier vide */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FontAwesomeIcon icon={faShoppingCart} className="text-6xl text-yellow-500" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Votre panier est vide
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Découvrez notre incroyable collection de cartes Pokémon et commencez votre aventure de dresseur ! ⚡
                        </p>

                        {/* Suggestions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
                                <FontAwesomeIcon icon={faStar} className="text-3xl text-yellow-500 mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">Cartes Rares</h3>
                                <p className="text-sm text-gray-600">Découvrez nos cartes les plus précieuses</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
                                <FontAwesomeIcon icon={faGift} className="text-3xl text-red-500 mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">Displays</h3>
                                <p className="text-sm text-gray-600">Boostez vos chances avec nos displays</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
                                <FontAwesomeIcon icon={faRocket} className="text-3xl text-blue-500 mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">Exclusivités</h3>
                                <p className="text-sm text-gray-600">Articles limités et collector</p>
                            </div>
                        </div>

                        <Link
                            href="/boutique"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <FontAwesomeIcon icon={faBolt} />
                            Découvrir la boutique
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    const total = panier.reduce((acc, article) => acc + article.price * article.amount, 0);
    const totalItems = panier.reduce((acc, article) => acc + article.amount, 0);

    // Gestion du paiement
    const handleCheckout = async () => {
        if (!session?.user?.id) {
            setError("Erreur : Aucun utilisateur trouvé pour la commande.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session.user.email,
                    userId: session.user.id,
                    destinataire: pr?.name,
                    adress: pr?.adress,
                    city: pr?.city,
                    country: pr?.country,
                    cp: pr?.cp,
                    items: panier.map((article) => ({
                        id: article.id,
                        title: article.title,
                        price: article.price,
                        amount: article.amount,
                        image: article.image,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors du paiement.");
            }

            localStorage.removeItem("panier");
            setShowSuccess(true);

            setTimeout(() => {
                window.location.href = data.url; // Redirection vers Stripe Checkout
            }, 1500);
        } catch (error) {
            console.error("Erreur de paiement :", error);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsProcessing(false);
        }
    };

    const isProfileValid = (profile: UserProfile | null) => {
        return profile !== null &&
            profile.name &&
            profile.adress &&
            profile.city &&
            profile.cp &&
            profile.country;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
            {/* Header */}
            <div className="bg-white shadow-lg border-b border-yellow-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/boutique"
                                className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span>Retour à la boutique</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full shadow-lg">
                            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                            <span className="font-bold text-lg">Mon Panier PikaVault</span>
                            <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-bold">
                                {totalItems}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Liste des articles */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-yellow-500 to-red-500 p-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Vos articles ({totalItems})
                                </h2>
                            </div>

                            <div className="p-6 space-y-6">
                                <AnimatePresence>
                                    {panier.map((article, index) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-200"
                                        >
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Image */}
                                                <div className="flex-shrink-0">
                                                    <div className="relative group">
                                                        <Image
                                                            src={article.image}
                                                            alt={article.title}
                                                            width={120}
                                                            height={120}
                                                            className="rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200"
                                                        />
                                                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Informations */}
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <span className="text-2xl font-black text-gray-900">
                                                                {article.price}€
                                                            </span>
                                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                                                <FontAwesomeIcon icon={faTag} className="mr-1" />
                                                                Prix unitaire
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Contrôles quantité et actions */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center bg-white rounded-xl border-2 border-yellow-200 shadow-sm">
                                                                <button
                                                                    onClick={() => supprimerDuPanier(article.id)}
                                                                    className="px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-l-xl transition-colors"
                                                                >
                                                                    <FontAwesomeIcon icon={faMinus} />
                                                                </button>
                                                                <span className="px-6 py-2 text-lg font-bold text-gray-900 bg-yellow-50 border-x-2 border-yellow-200">
                                                                    {article.amount}
                                                                </span>
                                                                <button
                                                                    onClick={() => ajouterAuPanier(article)}
                                                                    className="px-4 py-2 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-r-xl transition-colors"
                                                                >
                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                </button>
                                                            </div>

                                                            <div className="text-sm text-gray-600">
                                                                <span className="font-medium">Sous-total: </span>
                                                                <span className="font-bold text-gray-900 text-lg">
                                                                    {(article.price * article.amount).toFixed(2)}€
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={() => supprimerDuPanier(article.id, true)}
                                                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-500"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                            <span className="hidden sm:inline">Supprimer</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Récapitulatif et commande */}
                    <div className="space-y-6">
                        {/* Résumé de la commande */}
                        <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-hidden sticky top-6">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Récapitulatif
                                </h3>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Détails prix */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                        <span className="text-gray-600">Sous-total ({totalItems} articles)</span>
                                        <span className="font-semibold">{total.toFixed(2)}€</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                        <span className="text-gray-600 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faRocket} className="text-green-500" />
                                            Livraison
                                        </span>
                                        <span className="font-semibold text-green-600">Gratuite</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-bold bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200">
                                        <span>Total</span>
                                        <span className="text-2xl bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                                            {total.toFixed(2)}€
                                        </span>
                                    </div>
                                </div>

                                {/* Adresse d'expédition */}
                                <div>
                                    <button
                                        onClick={() => setSendingDataExpanded(!isSendingDataExpanded)}
                                        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-purple-500" />
                                            <span className="font-semibold">Adresse d'expédition</span>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={isSendingDataExpanded ? faChevronUp : faChevronDown}
                                            className="text-gray-500"
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isSendingDataExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 overflow-hidden"
                                            >
                                                {isLoadingUser ? (
                                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-yellow-500" />
                                                        <span>Chargement...</span>
                                                    </div>
                                                ) : isProfileValid(pr) ? (
                                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                                            <span className="font-semibold text-green-800">Adresse confirmée</span>
                                                        </div>
                                                        <div className="space-y-2 text-sm">
                                                            <div>
                                                                <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                                                                <strong>{pr?.name}</strong>
                                                            </div>
                                                            <div>
                                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mr-2" />
                                                                {pr?.adress}, {pr?.city}, {pr?.cp}, {pr?.country}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />
                                                            <span className="font-semibold text-red-800">Adresse manquante</span>
                                                        </div>
                                                        <p className="text-sm text-red-700 mb-3">
                                                            Veuillez ajouter votre adresse de livraison pour continuer.
                                                        </p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Messages d'erreur */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-red-50 border border-red-200 rounded-xl p-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />
                                                <span className="text-red-800 font-medium">{error}</span>
                                                <button
                                                    onClick={() => setError(null)}
                                                    className="ml-auto text-red-500 hover:text-red-700"
                                                >
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Message de succès */}
                                <AnimatePresence>
                                    {showSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="bg-green-50 border border-green-200 rounded-xl p-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                                <span className="text-green-800 font-medium">
                                                    Redirection vers le paiement...
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Boutons d'action */}
                                <div className="space-y-3">
                                    {isProfileValid(pr) ? (
                                        <button
                                            onClick={handleCheckout}
                                            disabled={isProcessing || showSuccess}
                                            className={clsx(
                                                "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl",
                                                isProcessing || showSuccess
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                                            )}
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                    Traitement en cours...
                                                </>
                                            ) : showSuccess ? (
                                                <>
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                    Redirection...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faCreditCard} />
                                                    Finaliser la commande
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/profile/${session?.user?.id}`}
                                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            Ajouter une adresse
                                        </Link>
                                    )}

                                    <div className="flex items-center gap-3 text-sm text-gray-600 justify-center">
                                        <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                        <span>Paiement 100% sécurisé</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avantages PikaVault */}
                        <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 p-6">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                                Vos avantages PikaVault
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
                                    <span>Livraison gratuite dès 1€</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                    <span>Garantie authenticité 100%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                                    <span>Points de fidélité offerts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}