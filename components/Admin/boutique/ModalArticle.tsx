"use client";

import React, { useContext, useState } from "react";
import ImageLoading from "@/components/Boutique/ImageLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faX, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { PanierContext } from "@/components/Providers/PanierProvider"; // ✅ Import du contexte

interface ModalArticleProps {
    article: {
        id: string;
        image: string;
        type: string;
        price: number;
        title: string;
        description: string;
        amount: number;
    };
    isOpen: boolean;
    onClose: () => void;
}


const ModalArticle: React.FC<ModalArticleProps> = ({ article, isOpen, onClose }) => {
    const panierContext = useContext(PanierContext);

    if (!panierContext) {
        throw new Error("PanierContext n'est pas disponible. Vérifie que PanierProvider englobe ton application.");
    }

    const { ajouterAuPanier } = panierContext;

    const [added, setAdded] = useState(false); // État pour afficher la confirmation d'ajout
    const [buttonClass, setButtonClass] = useState("bg-orange-200 text-orange-900 hover:bg-orange-300")

    const typeMapping = {
        cartesjap: "Cartes japonaises",
        cartesfr: "Cartes françaises",
        displayfr: "Display françaises",
        displayjap: "Display japonaises",
        accessoires: "Accessoires",
        exclusivites: "Exclusivités",
    };

    const handleAddToCart = () => {
        ajouterAuPanier(article);
        setAdded(true);
        setButtonClass("bg-green-200 text-gray-800");
        setTimeout(() => {
            setAdded(false)
            setButtonClass("bg-orange-500 text-gray-800")
            onClose();
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center h-full w-full bg-gradient-to-b from-white to-gray-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative flex w-full h-full bg-white rounded-lg shadow-lg">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-red-500 hover:text-gray-800"
                        >
                            <FontAwesomeIcon icon={faX} className="font-bold text-red-600 text-xl" />
                        </button>
                        <div className="flex flex-col md:flex-row w-full">
                            <div className="flex justify-center items-center w-full bg-gradient-to-bl from-gray-50 to-white">
                                <ImageLoading
                                    src={article.image}
                                    className="h-auto w-[500px]"
                                    alt={article.title}
                                    height={600}
                                    width={300}
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center w-full bg-orange-100 p-6">
                                <div className="flex flex-col justify-center w-[80%]">
                                    <p className="text-gray-800 text-2xl mt-1 mb-2 w-fit font-light">
                                        {typeMapping[article.type as keyof typeof typeMapping] || article.type}
                                    </p>
                                    <p className="text-gray-800 text-4xl font-semibold">{article.title}</p>
                                    <p className="bg-amber-900 text-orange-100 my-4 mt-8 w-fit px-3 font-bold text-3xl shadow-md py-2 italic text-center">
                                        {article.price} €
                                    </p>
                                    <p className="text-gray-600 text-lg mt-4 font-medium">{article.description}</p>

                                    <div className={"flex justify-end"}>
                                        <p className={"mt-5 w-fit font-normal text-gray-600 italic text-lg flex items-center"}>
                                            Articles en stock
                                            <span className={"font-black ml-1"}>{article.amount}</span></p>
                                    </div>

                                    {/* Ajouter au panier avec animation */}
                                    <button
                                        className={`mt-3 font-semibold text-xl py-4 shadow-md ${buttonClass} transition-colors duration-200 rounded flex items-center justify-center gap-2`}
                                        onClick={handleAddToCart}
                                    >
                                        {added ? (
                                            <>
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-900" />
                                                Ajouté !
                                            </>
                                        ) : (
                                            <>
                                                Ajouter au panier <FontAwesomeIcon icon={faCartShopping} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalArticle;
