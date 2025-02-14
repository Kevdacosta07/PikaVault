"use client";

import { Article } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ButtonsFilters from "@/components/Boutique/ButtonsFilters";
import EditionFilter from "@/components/Boutique/EditionFilter";
import ImageLoading from "@/components/Boutique/ImageLoading";
import ModalArticle from "@/components/Admin/boutique/ModalArticle";

interface ShowArticlesProps {
    articles: Article[];
}

export default function ShowArticles({ articles }: ShowArticlesProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [typeQuery, setTypeQuery] = useState<string | null>(null);
    const [editionQuery, setEditionQuery] = useState<string | null>(null);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null); // Gère l'article sélectionné pour la modale

    const typeMapping: Record<string, string> = {
        "cartesjap": "Cartes japonaises",
        "cartesfr": "Cartes françaises",
        "displayfr": "Display françaises",
        "displayjap": "Display japonaises",
        "accessoires": "Accessoires",
        "exclusivites": "Exclusivités",
    };

    const handleOpenModal = (articleId: string) => {
        setSelectedArticleId(articleId); // Enregistre l'ID de l'article sélectionné
    };

    const handleCloseModal = () => {
        setSelectedArticleId(null); // Réinitialise l'article sélectionné
    };

    // Filtrage combiné : Recherche + Type + Édition
    useEffect(() => {
        const filtered = articles.filter(article =>
            (typeQuery ? article.type === typeQuery : true) &&
            (searchQuery ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
            (editionQuery ? (article.edition ? article.edition.toLowerCase().includes(editionQuery.toLowerCase()) : false) : true)
        );

        setFilteredArticles(filtered);
    }, [editionQuery, searchQuery, typeQuery, articles]);

    return (
        <div className="flex flex-col justify-center items-center">
            {/* Barre de recherche */}
            <form className="search-form flex justify-between w-[550px] bg-gray-200 shadow-sm shadow-gray-400 px-3 text-xl mt-7 py-3">
                <input
                    name="query"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input outline-none bg-gray-200 w-[90%]"
                    placeholder="Que cherchez-vous ?"
                />
                <div className="flex gap-2">
                    <button type="submit" className="search-btn bg-gray-200 text-black">
                        <FontAwesomeIcon icon={faSearch} className="bg-gray-200" />
                    </button>
                </div>
            </form>

            {/* Boutons de filtres par type */}
            <ButtonsFilters setTypeQuery={setTypeQuery} />

            {/* Filtre par édition */}
            <EditionFilter setEditionQuery={setEditionQuery} />

            {/* Affichage des articles */}
            <div className="w-[80vw] mt-10 flex flex-col items-center">
                <div className="flex justify-center flex-1 flex-wrap">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <div className={"transition-all duration-300"} key={article.id}>
                                <div className="card relative hover:scale-[101%] transition-all hover:border-2 bg-gradient-to-b from-gray-200 to-white hover:border-orange-300 border-2 border-white m-8 overflow-hidden bg-gray-50 flex flex-col items-center rounded-xl py-4 w-[350px] shadow-gray-500 shadow-lg">
                                    <div className="flex flex-col items-center w-[300px]">
                                        <ImageLoading
                                            src={article.image}
                                            alt="Image ajoutée"
                                            width={290}
                                            height={280}
                                            className="w-auto h-[280px] object-center object-fill rounded-sm"
                                        />
                                        <div className="flex mb-3 flex-col items-center text-[#383838] w-full">
                                            <div className="flex items-start w-full flex-col mt-8">
                                                <div className="flex items-center flex-row-reverse justify-end w-full mb-5">
                                                    <p className="text-md rounded-full bg-orange-300 px-3 py-1 ml-3 capitalize font-medium text-orange-900">
                                                        {typeMapping[article.type] || article.type}
                                                    </p>
                                                    <p className="text-3xl text-center text-black italic">{article.price} €</p>
                                                </div>

                                                <h2 className="font-semibold text-xl text-[#383838] w-full capitalize">{article.title}</h2>

                                                <p className="mt-2 mb-2 text-gray-600 text-sm">
                                                    {article.description.length > 50
                                                        ? `${article.description.substring(0, 60)}...`
                                                        : article.description}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            className="bg-orange-200 font-semibold text-lg text-orange-900 transition-colors hover:bg-orange-300 duration-300 w-full px-4 py-2 rounded"
                                            onClick={() => handleOpenModal(article.id)}
                                        >
                                            Consulter l&#39;article
                                        </button>
                                    </div>
                                </div>

                                {/* Affichage de la modale uniquement pour l'article sélectionné */}
                                {selectedArticleId === article.id && (
                                    <ModalArticle
                                        article={article}
                                        isOpen={selectedArticleId === article.id}
                                        onClose={handleCloseModal}
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="px-5 py-3 my-8 bg-red-600 font-semibold text-white shadow-gray-400 shadow-sm rounded text-2xl">
                            Aucun article répertorié
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
