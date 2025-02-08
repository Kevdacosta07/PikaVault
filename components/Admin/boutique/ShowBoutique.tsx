"use client";

import SearchForm from "@/components/Boutique/SearchForm";
import ArticleComposent from "@/components/Admin/boutique/ArticleComposent";
import { useEffect, useState } from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {deleteArticle} from "@/actions/ArticleActions";

interface Article {
    id: string;
    title: string;
    description: string;
    price: number;
    amount: number;
    edition: string | null;
    type: string;
    image: string;
}


export default function ShowBoutique({ articles }: { articles: Article[] }) {
    const [query, setQuery] = useState("");
    const [filteredArticles, setFilteredArticles] = useState(articles);

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery.trim().toLowerCase()); // Normalisation de la recherche
    };

    // Suppression d'un article
    const handleDelete = (id: string) => {
        setFilteredArticles((prevArticles) => prevArticles.filter((article: { id: string; }) => article.id !== id));
        deleteArticle({article_id: id})
    };

    // Filtrage de recherche
    useEffect(() => {
        const filtered = articles.filter((article: { title: string }) =>
            query ? article.title.toLowerCase().includes(query) : true
        );

        setFilteredArticles(filtered);
    }, [query, articles]);

    return (
        <div>

            {/* Ajouter un nouvel article */}
            <div className={"flex justify-center mt-8"}>
                <Link href={"/admin/articles/create"} className={"px-3 py-2 bg-orange-500 font-medium text-white rounded shadow shadow-gray-400 text-xl"}><FontAwesomeIcon icon={faPlus} className={"mr-1"} /> Ajouter une offre</Link>
            </div>

            {/* Filtre de recherche */}
            <div className="w-full flex justify-center items-center">
                <SearchForm onSearch={handleSearch} />
            </div>

            {/* Articles de la Boutique */}
            <div className="articles mt-5 flex flex-wrap justify-center">
                {filteredArticles.length === 0 ? (
                    <p>Aucun article n&#39;a été trouvé</p>
                ) : (
                    filteredArticles.map((article) => (
                        <ArticleComposent key={article.id} onDelete={handleDelete} article={article} />
                    ))
                )}
            </div>
        </div>
    );
}
