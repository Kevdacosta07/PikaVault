"use client";

import { Article } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faTh, faList, faTimes } from "@fortawesome/free-solid-svg-icons";
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
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const typeMapping: Record<string, string> = {
        "cartesjap": "Cartes japonaises",
        "cartesfr": "Cartes françaises",
        "displayfr": "Display françaises",
        "displayjap": "Display japonaises",
        "accessoires": "Accessoires",
        "exclusivites": "Exclusivités",
    };

    const handleOpenModal = (articleId: string) => {
        setSelectedArticleId(articleId);
    };

    const handleCloseModal = () => {
        setSelectedArticleId(null);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setTypeQuery(null);
        setEditionQuery(null);
    };

    // Filtrage combiné
    useEffect(() => {
        const filtered = articles.filter(article =>
            (typeQuery ? article.type === typeQuery : true) &&
            (searchQuery ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
            (editionQuery ? (article.edition ? article.edition.toLowerCase().includes(editionQuery.toLowerCase()) : false) : true)
        );
        setFilteredArticles(filtered);
    }, [editionQuery, searchQuery, typeQuery, articles]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header avec recherche et contrôles */}
            <div className="mb-8 space-y-6">
                {/* Barre de recherche moderne et proportionnée */}
                <div className="relative max-w-xl mx-auto">
                    <div className="relative group">
                        {/* Icône de recherche */}
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Input principal */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500
                       shadow-sm hover:shadow-md transition-all duration-200
                       placeholder:text-gray-400"
                            placeholder="Rechercher une carte..."
                        />

                        {/* Bouton de suppression */}
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2
                           w-6 h-6 bg-gray-100 hover:bg-red-100 rounded-full
                           flex items-center justify-center
                           text-gray-400 hover:text-red-500
                           transition-all duration-200 hover:scale-110"
                                aria-label="Effacer la recherche"
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="text-xs"
                                />
                            </button>
                        )}
                    </div>

                    {/* Suggestions rapides compactes */}
                    {searchQuery === "" && (
                        <div className="flex justify-center gap-2 mt-3">
                            {['Pikachu', 'Charizard', 'Display'].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => setSearchQuery(suggestion)}
                                    className="px-3 py-1 bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-700
                               rounded-full text-xs font-medium transition-colors duration-200"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contrôles et stats */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Résultats */}
                    <div className="flex items-center gap-4">
                        <p className="text-gray-600 font-medium">
                            <span className="text-2xl font-bold text-gray-900">{filteredArticles.length}</span> produits trouvés
                        </p>
                        {(typeQuery || editionQuery || searchQuery) && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                                Effacer les filtres
                            </button>
                        )}
                    </div>

                    {/* Contrôles d'affichage */}
                    <div className="flex items-center gap-4">
                        {/* Toggle filtres mobile */}
                        <button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="sm:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <FontAwesomeIcon icon={faFilter} />
                            Filtres
                        </button>

                        {/* Vue grille/liste */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-2 rounded-md transition-colors ${
                                    viewMode === 'grid'
                                        ? 'bg-white shadow-sm text-gray-900'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <FontAwesomeIcon icon={faTh} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-2 rounded-md transition-colors ${
                                    viewMode === 'list'
                                        ? 'bg-white shadow-sm text-gray-900'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <FontAwesomeIcon icon={faList} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtres */}
            <div className={`mb-8 ${filtersOpen ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <ButtonsFilters setTypeQuery={setTypeQuery} />
                    <EditionFilter setEditionQuery={setEditionQuery} />
                </div>
            </div>

            {/* Grille d'articles */}
            <div className="mb-12">
                {filteredArticles.length > 0 ? (
                    <div className={`grid gap-6 ${
                        viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            : 'grid-cols-1'
                    }`}>
                        {filteredArticles.map(article => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                typeMapping={typeMapping}
                                viewMode={viewMode}
                                onOpenModal={handleOpenModal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faSearch} className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
                        <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                        >
                            Voir tous les produits
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedArticleId && (
                <ModalArticle
                    article={filteredArticles.find(a => a.id === selectedArticleId)!}
                    isOpen={!!selectedArticleId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

// Composant ArticleCard séparé pour plus de clarté
interface ArticleCardProps {
    article: Article;
    typeMapping: Record<string, string>;
    viewMode: 'grid' | 'list';
    onOpenModal: (id: string) => void;
}

function ArticleCard({ article, typeMapping, viewMode, onOpenModal }: ArticleCardProps) {
    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-yellow-300">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <ImageLoading
                            src={article.image}
                            alt={article.title}
                            width={200}
                            height={200}
                            className="w-48 h-48 object-cover rounded-xl"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                    {typeMapping[article.type] || article.type}
                                </span>
                                {article.edition && (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {article.edition}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-black text-gray-900">
                                {article.price}€
                            </div>
                            <button
                                onClick={() => onOpenModal(article.id)}
                                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                            >
                                Voir le produit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-yellow-300 group">
            <div className="relative overflow-hidden">
                <ImageLoading
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium">
                        {typeMapping[article.type] || article.type}
                    </span>
                </div>
                {article.edition && (
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-medium">
                            {article.edition}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{article.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{article.description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-gray-900">
                        {article.price}€
                    </div>
                    <button
                        onClick={() => onOpenModal(article.id)}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-sm"
                    >
                        Voir
                    </button>
                </div>
            </div>
        </div>
    );
}