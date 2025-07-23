"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faEdit,
    faTrash,
    faUserShield,
    faUser,
    faFilter,
    faSort,
    faCheckCircle,
    faTimesCircle,
    faCrown,
    faCoins,
    faEnvelope,
    faUserCheck,
    faUserTimes,
    faDownload,
    faRefresh,
    faStar,
    faBolt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface User {
    name: string | null;
    id: string;
    image: string | null;
    password: string | null;
    admin: number;
    points: number;
    email: string | null;
    emailVerified: Date | null;
    created_at: Date;
}

type SortField = 'name' | 'email' | 'points' | 'created_at';
type SortOrder = 'asc' | 'desc';
type FilterType = 'all' | 'admin' | 'verified' | 'unverified';
type ViewMode = 'grid' | 'table';

export default function ShowUsers({ initusers }: { initusers: User[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(initusers);
    const [users, setUsers] = useState(initusers || []);
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isLoading, setIsLoading] = useState(false);

    // Configuration des filtres
    const filterOptions = [
        {
            key: 'all' as const,
            label: 'Tous les utilisateurs',
            icon: faUser,
            color: 'from-blue-500 to-indigo-600',
            count: users.length
        },
        {
            key: 'admin' as const,
            label: 'Administrateurs',
            icon: faCrown,
            color: 'from-red-500 to-pink-600',
            count: users.filter(u => u.admin === 1).length
        },
        {
            key: 'verified' as const,
            label: 'Utilisateurs vérifiés',
            icon: faCheckCircle,
            color: 'from-green-500 to-emerald-600',
            count: users.filter(u => u.emailVerified).length
        },
        {
            key: 'unverified' as const,
            label: 'Non vérifiés',
            icon: faTimesCircle,
            color: 'from-gray-500 to-slate-600',
            count: users.filter(u => !u.emailVerified).length
        },
    ];

    // Filtrage et tri des utilisateurs
    useEffect(() => {
        const filtered = users.filter((user) => {
            const matchesSearch =
                (user.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.email ?? "").toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter =
                filterType === 'all' ||
                (filterType === 'admin' && user.admin === 1) ||
                (filterType === 'verified' && user.emailVerified) ||
                (filterType === 'unverified' && !user.emailVerified);

            return matchesSearch && matchesFilter;
        });

        // Tri
        filtered.sort((a, b) => {
            let aValue: string | number | Date, bValue: string | number | Date;

            switch (sortField) {
                case 'name':
                    aValue = a.name || '';
                    bValue = b.name || '';
                    break;
                case 'email':
                    aValue = a.email || '';
                    bValue = b.email || '';
                    break;
                case 'points':
                    aValue = a.points;
                    bValue = b.points;
                    break;
                case 'created_at':
                    aValue = new Date(a.created_at);
                    bValue = new Date(b.created_at);
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredUsers(filtered);
    }, [searchQuery, users, sortField, sortOrder, filterType]);

    // Supprimer un utilisateur
    const deleteUser = async (userId: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/request/users/${userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Erreur lors de la suppression");

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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

    // Configuration des rôles
    const getRoleConfig = (user: User) => {
        if (user.admin === 1) {
            return {
                bg: 'bg-gradient-to-r from-red-500 to-pink-500',
                text: 'text-white',
                icon: faCrown,
                label: 'Admin'
            };
        }
        if (user.emailVerified) {
            return {
                bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
                text: 'text-white',
                icon: faUserCheck,
                label: 'Vérifié'
            };
        }
        return {
            bg: 'bg-gradient-to-r from-gray-500 to-slate-500',
            text: 'text-white',
            icon: faUser,
            label: 'Client'
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
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FontAwesomeIcon icon={faUserShield} className="text-white text-2xl" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faStar} className="text-white text-xs" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                                    Gestion des Utilisateurs
                                </h1>
                                <p className="text-lg text-gray-600 font-medium mt-1">
                                    {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} • {users.filter(u => u.admin === 1).length} admin{users.filter(u => u.admin === 1).length > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {/* Actions rapides */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                                <span className="hidden sm:inline">Actualiser</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
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
                                placeholder="Rechercher par nom ou e-mail..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white shadow-lg"
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
                                        { key: 'name' as const, label: 'Nom' },
                                        { key: 'email' as const, label: 'Email' },
                                        { key: 'points' as const, label: 'Points' },
                                        { key: 'created_at' as const, label: 'Date' }
                                    ].map((sort) => (
                                        <button
                                            key={sort.key}
                                            onClick={() => handleSort(sort.key)}
                                            className={clsx(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                                sortField === sort.key
                                                    ? "bg-blue-100 text-blue-700 border border-blue-300"
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
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faBolt} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('table')}
                                        className={clsx(
                                            "px-3 py-2 text-sm font-medium rounded-r-lg transition-all duration-200",
                                            viewMode === 'table'
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faFilter} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredUsers.length === 0 ? (
                    // État vide
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FontAwesomeIcon icon={faUserTimes} className="text-6xl text-gray-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Aucun utilisateur trouvé</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Aucun utilisateur ne correspond à vos critères de recherche.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setFilterType('all');
                            }}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            <FontAwesomeIcon icon={faRefresh} />
                            Réinitialiser les filtres
                        </button>
                    </motion.div>
                ) : viewMode === 'grid' ? (
                    // Vue grille - CORRECTION du z-index pour l'avatar
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredUsers.map((user, index) => {
                                const roleConfig = getRoleConfig(user);
                                return (
                                    <motion.div
                                        key={user.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        {/* Header avec avatar - CORRECTION */}
                                        <div className="relative h-24 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                                            <div className="absolute inset-0 opacity-20">
                                                <div className="absolute top-2 right-2 text-2xl animate-pulse">⚡</div>
                                                <div className="absolute bottom-2 left-2 text-lg animate-pulse [animation-delay:1s]">✨</div>
                                            </div>

                                            {/* Badge de rôle */}
                                            <div className="absolute top-2 left-2 z-10">
                                                <div className={`inline-flex items-center gap-1 px-2 py-1 ${roleConfig.bg} ${roleConfig.text} rounded-full text-xs font-bold shadow-lg`}>
                                                    <FontAwesomeIcon icon={roleConfig.icon} />
                                                    <span>{roleConfig.label}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Avatar avec z-index élevé pour être devant */}
                                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
                                            <div className="relative group-hover:scale-110 transition-transform duration-300">
                                                <div className="w-16 h-16 rounded-xl bg-white border-4 border-white shadow-xl overflow-hidden">
                                                    <Image
                                                        src={user.image ?? "/assets/img/default-profile.png"}
                                                        alt={`Profil de ${user.name}`}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {user.emailVerified && (
                                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center z-30">
                                                        <FontAwesomeIcon icon={faCheckCircle} className="text-white text-xs" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Contenu avec padding-top augmenté pour faire de la place à l'avatar */}
                                        <div className="pt-14 p-4 space-y-4 relative z-10">
                                            <div className="text-center space-y-2">
                                                <h3 className="font-bold text-gray-900 truncate">
                                                    {user.name || "Utilisateur inconnu"}
                                                </h3>
                                                <p className="text-xs text-gray-600 truncate flex items-center justify-center gap-1">
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                    {user.email}
                                                </p>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-2 text-center">
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                                                    <div className="text-sm font-bold text-yellow-700">{user.points}</div>
                                                    <div className="text-xs text-yellow-600">Points</div>
                                                </div>
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                                                    <div className="text-xs font-bold text-blue-700">
                                                        {new Date(user.created_at).toLocaleDateString("fr-FR", { month: "short", year: "2-digit" })}
                                                    </div>
                                                    <div className="text-xs text-blue-600">Membre</div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <Link href={`/admin/utilisateurs/edit/${user.id}`} className="flex-1">
                                                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        Modifier
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => deleteUser(user.id)}
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
                    // Vue tableau
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
                                        Utilisateur
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Rôle
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Points
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Inscription
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredUsers.map((user, index) => {
                                    const roleConfig = getRoleConfig(user);
                                    return (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                                                            <Image
                                                                src={user.image ?? "/assets/img/default-profile.png"}
                                                                alt={`Profil de ${user.name}`}
                                                                width={40}
                                                                height={40}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        {user.emailVerified && (
                                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faCheckCircle} className="text-white text-xs" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name || "Utilisateur inconnu"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 ${roleConfig.bg} ${roleConfig.text} rounded-full text-xs font-bold`}>
                                                    <FontAwesomeIcon icon={roleConfig.icon} />
                                                    {roleConfig.label}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                            {user.points.toLocaleString()}
                                                        </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(user.created_at).toLocaleDateString("fr-FR")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link href={`/admin/utilisateurs/edit/${user.id}`}>
                                                        <button className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                                                            <FontAwesomeIcon icon={faEdit} className="text-xs" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
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