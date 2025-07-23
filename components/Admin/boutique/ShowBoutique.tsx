"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faSort,
    faEdit,
    faTrash,
    faGem,
    faStar,
    faTag,
    faBoxOpen,
    faTh,
    faList,
    faDownload,
    faRefresh,
    faStore,
    faCrown,
    faShieldAlt,
    faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { deleteArticle } from "@/actions/ArticleActions";

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

type SortField = 'title' | 'price' | 'amount' | 'type';
type SortOrder = 'asc' | 'desc';
type FilterType = 'all' | 'cards' | 'boosters' | 'accessories';
type ViewMode = 'grid' | 'list';

export default function ShowBoutique({ articles }: { articles: Article[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [sortField, setSortField] = useState<SortField>('title');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isLoading, setIsLoading] = useState(false);

    // Configuration des filtres
    const filterOptions = [
        {
            key: 'all' as const,
            label: 'Tous les articles',
            icon: faStore,
            color: 'from-blue-500 to-indigo-600',
            count: articles.length
        },
        {
            key: 'cards' as const,
            label: 'Cartes',
            icon: faGem,
            color: 'from-purple-500 to-pink-600',
            count: articles.filter(a => a.type === 'card').length
        },
        {
            key: 'boosters' as const,
            label: 'Boosters',
            icon: faBoxOpen,
            color: 'from-orange-500 to-red-600',
            count: articles.filter(a => a.type === 'booster').length
        },
        {
            key: 'accessories' as const,
            label: 'Accessoires',
            icon: faShieldAlt,
            color: 'from-green-500 to-emerald-600',
            count: articles.filter(a => a.type === 'accessory').length
        }
    ];

    // Filtrage et tri
    useEffect(() => {
        const filtered = articles.filter((article) => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter =
                filterType === 'all' ||
                (filterType === 'cards' && article.type === 'card') ||
                (filterType === 'boosters' && article.type === 'booster') ||
                (filterType === 'accessories' && article.type === 'accessory');

            return matchesSearch && matchesFilter;
        });

        // Tri
        filtered.sort((a, b) => {
            let aValue: string | number, bValue: string | number;

            switch (sortField) {
                case 'title':
                    aValue = a.title;
                    bValue = b.title;
                    break;
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'amount':
                    aValue = a.amount;
                    bValue = b.amount;
                    break;
                case 'type':
                    aValue = a.type;
                    bValue = b.type;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredArticles(filtered);
    }, [searchQuery, articles, sortField, sortOrder, filterType]);

    // Supprimer un article
    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

        setIsLoading(true);
        try {
            await deleteArticle({ article_id: id });
            setFilteredArticles(prev => prev.filter(article => article.id !== id));
        } catch (error) {
            console.error("Erreur suppression :", error);
            alert("Une erreur est survenue lors de la suppression !");
        } finally {
            setIsLoading(false);
        }
    };

    // Changer le tri
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    // Configuration des types d'articles
    const getTypeConfig = (type: string) => {
        const configs = {
            card: {
                bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
                text: 'text-white',
                icon: faGem,
                label: 'Carte'
            },
            booster: {
                bg: 'bg-gradient-to-r from-orange-500 to-red-500',
                text: 'text-white',
                icon: faBoxOpen,
                label: 'Booster'
            },
            accessory: {
                bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
                text: 'text-white',
                icon: faShieldAlt,
                label: 'Accessoire'
            }
        };

        return configs[type as keyof typeof configs] || {
            bg: 'bg-gradient-to-r from-gray-500 to-slate-500',
            text: 'text-white',
            icon: faTag,
            label: 'Autre'
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header avec design moderne */}
            <div className="bg-white shadow-xl border-b border-indigo-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Titre principal */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FontAwesomeIcon icon={faStore} className="text-white text-2xl" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCrown} className="text-white text-xs" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                                    Gestion Boutique
                                </h1>
                                <p className="text-lg text-gray-600 font-medium mt-1">
                                    {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} • {articles.reduce((sum, a) => sum + a.amount, 0)} exemplaires
                                </p>
                            </div>
                        </div>

                        {/* Actions rapides */}
                        <div className="flex flex-wrap gap-3">
                            <Link href="/admin/articles/create">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Nouvel Article</span>
                                </motion.button>
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                                <span className="hidden sm:inline">Actualiser</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                                <FontAwesomeIcon icon={faDownload} />
                                <span className="hidden sm:inline">Exporter</span>
                            </button>
                        </div>
                    </div>

                    {/* Barre de recherche et filtres */}
                    <div className="space-y-6">
                        {/* Recherche */}
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-lg" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher par nom ou description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white shadow-lg"
                            />
                        </div>

                        {/* Filtres */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {filterOptions.map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setFilterType(filter.key)}
                                    className={clsx(
                                        "flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105",
                                        filterType === filter.key
                                            ? `bg-gradient-to-r ${filter.color} text-white shadow-xl`
                                            : "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
                                    )}
                                >
                                    <FontAwesomeIcon icon={filter.icon} />
                                    <span className="hidden sm:inline">{filter.label}</span>
                                    <span className={clsx(
                                        "px-2 py-1 rounded-full text-xs font-bold",
                                        filterType === filter.key
                                            ? "bg-white/20 text-white"
                                            : "bg-gray-100 text-gray-600"
                                    )}>
                                        {filter.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Contrôles d'affichage */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-600">Trier par :</span>
                                <div className="flex gap-2">
                                    {[
                                        { key: 'title' as const, label: 'Nom' },
                                        { key: 'price' as const, label: 'Prix' },
                                        { key: 'amount' as const, label: 'Stock' },
                                        { key: 'type' as const, label: 'Type' }
                                    ].map((sort) => (
                                        <button
                                            key={sort.key}
                                            onClick={() => handleSort(sort.key)}
                                            className={clsx(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                                sortField === sort.key
                                                    ? "bg-purple-100 text-purple-700 border border-purple-300"
                                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                            )}
                                        >
                                            <span>{sort.label}</span>
                                            {sortField === sort.key && (
                                                <FontAwesomeIcon
                                                    icon={faSort}
                                                    className={clsx(
                                                        "transition-transform duration-200",
                                                        sortOrder === 'desc' && "rotate-180"
                                                    )}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Vue :</span>
                                <div className="flex rounded-lg border border-gray-200 bg-white">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={clsx(
                                            "px-3 py-2 text-sm font-medium rounded-l-lg transition-all duration-200",
                                            viewMode === 'grid'
                                                ? "bg-purple-600 text-white"
                                                : "text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faTh} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={clsx(
                                            "px-3 py-2 text-sm font-medium rounded-r-lg transition-all duration-200",
                                            viewMode === 'list'
                                                ? "bg-purple-600 text-white"
                                                : "text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faList} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredArticles.length === 0 ? (
                    // État vide
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl text-gray-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Aucun article trouvé</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Aucun article ne correspond à vos critères de recherche.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setFilterType('all');
                                }}
                                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                                Réinitialiser les filtres
                            </button>
                            <Link href="/admin/articles/create">
                                <button className="inline-flex items-center gap-3 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl">
                                    <FontAwesomeIcon icon={faPlus} />
                                    Ajouter un article
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ) : viewMode === 'grid' ? (
                    // Vue grille
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredArticles.map((article, index) => {
                                const typeConfig = getTypeConfig(article.type);
                                return (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        {/* Image du produit */}
                                        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />

                                            {/* Badge de type */}
                                            <div className="absolute top-2 left-2">
                                                <div className={`inline-flex items-center gap-1 px-2 py-1 ${typeConfig.bg} ${typeConfig.text} rounded-full text-xs font-bold shadow-lg`}>
                                                    <FontAwesomeIcon icon={typeConfig.icon} />
                                                    <span>{typeConfig.label}</span>
                                                </div>
                                            </div>

                                            {/* Badge de stock */}
                                            <div className="absolute top-2 right-2">
                                                <div className={clsx(
                                                    "px-2 py-1 rounded-full text-xs font-bold",
                                                    article.amount > 10
                                                        ? "bg-green-500 text-white"
                                                        : article.amount > 0
                                                            ? "bg-orange-500 text-white"
                                                            : "bg-red-500 text-white"
                                                )}>
                                                    {article.amount} en stock
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className="p-4 space-y-3">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {article.description}
                                                </p>
                                                {article.edition && (
                                                    <p className="text-xs text-purple-600 font-medium mt-1">
                                                        Édition: {article.edition}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Prix */}
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {article.price.toFixed(2)} CHF
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 pt-2">
                                                <Link href={`/admin/articles/edit/${article.id}`} className="flex-1">
                                                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        Modifier
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    disabled={isLoading}
                                                    className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    // Vue liste
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Article
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Prix
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredArticles.map((article, index) => {
                                    const typeConfig = getTypeConfig(article.type);
                                    return (
                                        <motion.tr
                                            key={article.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={article.image}
                                                            alt={article.title}
                                                            width={48}
                                                            height={48}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                            {article.title}
                                                        </div>
                                                        {article.edition && (
                                                            <div className="text-xs text-purple-600">
                                                                {article.edition}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 ${typeConfig.bg} ${typeConfig.text} rounded-full text-xs font-bold`}>
                                                    <FontAwesomeIcon icon={typeConfig.icon} />
                                                    {typeConfig.label}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {article.price.toFixed(2)} CHF
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={clsx(
                                                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                                                    article.amount > 10
                                                        ? "bg-green-100 text-green-800"
                                                        : article.amount > 0
                                                            ? "bg-orange-100 text-orange-800"
                                                            : "bg-red-100 text-red-800"
                                                )}>
                                                    <FontAwesomeIcon icon={faBoxOpen} />
                                                    {article.amount}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link href={`/admin/articles/edit/${article.id}`}>
                                                        <button className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                                                            <FontAwesomeIcon icon={faEdit} className="text-xs" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(article.id)}
                                                        disabled={isLoading}
                                                        className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}