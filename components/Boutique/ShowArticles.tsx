"use client";

import { Article } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faSearch, faStar} from "@fortawesome/free-solid-svg-icons";
import ButtonsFilters from "@/components/Boutique/ButtonsFilters";
import EditionFilter from "@/components/Boutique/EditionFilter";

interface ShowArticlesProps {
    articles: Article[];
}

export default function ShowArticles({ articles }: ShowArticlesProps) {
    const [searchQuery, setSearchQuery] = useState(""); // Recherche
    const [typeQuery, setTypeQuery] = useState<string | null>(null); // Type de carte
    const [editionQuery, setEditionQuery] = useState<string | null>(null); // Édition de la carte
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles); // Articles filtrés

    // Filtrage combiné : Recherche + Type + Édition
    useEffect(() => {
        const filtered = articles.filter(article =>
            (typeQuery ? article.type === typeQuery : true) &&
            (searchQuery ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
            (editionQuery ? (article.edition ? article.edition.toLowerCase().includes(editionQuery.toLowerCase()) : false) : true)
        );

        setFilteredArticles(filtered);
    }, [editionQuery, searchQuery, typeQuery, articles]);

    // Gestion de la recherche
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className={"flex flex-col justify-center items-center"}>

            {/* Barre de recherche */}
            <form className="search-form flex justify-between w-[550px] bg-gray-200 shadow-sm shadow-gray-400 px-3 text-xl mt-7 py-3">
                <input
                    name="query"
                    value={searchQuery}
                    onChange={handleSearch}
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

            {/* 🏷️ Affichage des articles */}
            <div className="flex justify-center">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <div key={article.id} className="card relative m-8 overflow-hidden bg-gray-200 flex flex-col items-center rounded-xl bg-gradient-to-bl py-4 from-yellow-500 to-purple-600 w-[350px] shadow-gray-400 shadow-xl">
                            <div className={"w-[280px]"}>
                                <img src={article.image} alt="Image ajoutée"
                                     className={"w-[280px] shadow-xl shadow-gray-800 h-[280px] object-cover object-center rounded"}/>
                                <div className={"flex flex-col items-center w-full"}>
                                    <h2 className={"font-semibold text-2xl mt-8 text-white capitalize"}>{article.title}</h2>
                                    <div className={"text-white flex my-5 items-center font-bold w-full justify-between"}>
                                        <p className={"text-2xl w-fit"}>4 <FontAwesomeIcon className={"text-yellow-300"} icon={faStar} /></p>
                                        <p className={"text-2xl w-fit"}>35€</p>
                                    </div>
                                </div>
                                <button
                                    className={"font-semibold px-3 py-3 bg-white transition-colors hover:bg-gray-200 duration-200 text-black rounded-xl text-xl mt-2 w-full"}><FontAwesomeIcon className={"mr-2"} icon={faCartShopping}/> Acheter</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="px-5 py-3 mt-8 bg-red-600 font-semibold text-white shadow-gray-400 shadow-sm rounded text-2xl">
                        Aucun article répertorié
                    </p>
                )}
            </div>
        </div>
    );
}
