"use client";

import React, { useContext, useState, useEffect } from "react";
import ImageLoading from "@/components/Boutique/ImageLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faTimes,
    faCheckCircle,
    faShieldAlt,
    faTruck,
    faBoxOpen,
    faMinus,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { PanierContext } from "@/components/Providers/PanierProvider";

interface ModalArticleProps {
    article: {
        id: string;
        image: string;
        type: string;
        price: number;
        title: string;
        description: string;
        amount: number;
        edition?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

const ModalArticle: React.FC<ModalArticleProps> = ({ article, isOpen, onClose }) => {
    const panierContext = useContext(PanierContext);
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex] = useState(0); // Supprimé setCurrentImageIndex car non utilisé
    const [isLoading, setIsLoading] = useState(false);

    if (!panierContext) {
        throw new Error("PanierContext n'est pas disponible.");
    }

    const { ajouterAuPanier } = panierContext;

    const typeMapping = {
        cartesjap: "Cartes japonaises",
        cartesfr: "Cartes françaises",
        displayfr: "Display françaises",
        displayjap: "Display japonaises",
        accessoires: "Accessoires",
        exclusivites: "Exclusivités",
    };

    // Fermeture avec Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleAddToCart = async () => {
        setIsLoading(true);

        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 500));

        for (let i = 0; i < quantity; i++) {
            ajouterAuPanier(article);
        }

        setAdded(true);
        setIsLoading(false);

        setTimeout(() => {
            setAdded(false);
            onClose();
        }, 2000);
    };

    const handleQuantityChange = (change: number) => {
        const newQuantity = Math.max(1, Math.min(article.amount, quantity + change));
        setQuantity(newQuantity);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Utilise seulement l'image réelle
    const images = [article.image];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header avec bouton fermer */}
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={onClose}
                                className="w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-gray-700 text-lg" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh] overflow-hidden">
                            {/* Section Image */}
                            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
                                {/* Image principale */}
                                <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
                                    <div className="relative w-full max-w-md">
                                        <motion.div
                                            key={currentImageIndex}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white"
                                        >
                                            <ImageLoading
                                                src={images[currentImageIndex]}
                                                alt={article.title}
                                                width={500}
                                                height={500}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        {/* Badge de statut */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium shadow-lg">
                                                En stock
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section Informations */}
                            <div className="flex flex-col overflow-y-auto">
                                <div className="p-8 lg:p-12 space-y-8">
                                    {/* En-tête produit */}
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                                {typeMapping[article.type as keyof typeof typeMapping] || article.type}
                                            </span>
                                            {article.edition && (
                                                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                                    Édition {article.edition}
                                                </span>
                                            )}
                                        </div>

                                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                            {article.title}
                                        </h1>
                                    </div>

                                    {/* Prix */}
                                    <div className="space-y-3">
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-4xl lg:text-5xl font-black text-gray-900">
                                                {article.price}€
                                            </span>
                                        </div>
                                        <p className="text-gray-600">TVA incluse • Livraison gratuite dès 50€</p>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {article.description}
                                        </p>
                                    </div>

                                    {/* Stock et quantité */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-medium">Stock disponible</span>
                                            <span className="text-green-600 font-bold">{article.amount} unités</span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-700 font-medium">Quantité :</span>
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => handleQuantityChange(-1)}
                                                    disabled={quantity <= 1}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faMinus} className="text-sm" />
                                                </button>
                                                <span className="w-16 text-center font-semibold text-lg">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(1)}
                                                    disabled={quantity >= article.amount}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className="text-sm" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Garanties */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon icon={faShieldAlt} className="text-green-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-sm">Authentique</div>
                                                <div className="text-gray-600 text-xs">Garanti 100%</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon icon={faTruck} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-sm">Livraison 24h</div>
                                                <div className="text-gray-600 text-xs">Partout en France</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon icon={faBoxOpen} className="text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-sm">Retour 30j</div>
                                                <div className="text-gray-600 text-xs">Satisfait ou remboursé</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-8 lg:p-12 pt-0">
                                    <motion.button
                                        onClick={handleAddToCart}
                                        disabled={isLoading || added}
                                        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                            added
                                                ? 'bg-green-500 text-white'
                                                : isLoading
                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl hover:scale-105'
                                        }`}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {added ? (
                                            <>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                Ajouté au panier !
                                            </>
                                        ) : isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Ajout en cours...
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faCartShopping} />
                                                Ajouter au panier • {(article.price * quantity).toFixed(2)}€
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalArticle;