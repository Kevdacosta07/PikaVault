
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldAlt,
    faUsers,
    faStore,
    faHandshake,
    faShoppingCart,
    faBars,
    faTimes,
    faBell,
    faCrown,
    faChartLine,
    faEye,
    faCheck,
    faExclamationTriangle,
    faInfoCircle,
    faClock,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "@/components/partials/ProfileDropdown";
import PanierNavbar from "@/components/partials/PanierNavbar";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface User {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    admin?: number;
    points?: number;
}

interface AdminNavBarProps {
    user: User;
}

interface Notification {
    id: string;
    type: 'success' | 'warning' | 'info' | 'error';
    title: string;
    message: string;
    timestamp: Date | string; // Accepter les deux types
    read: boolean;
    action?: {
        label: string;
        href: string;
    };
}

export default function AdminNavBar({ user }: AdminNavBarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Gestion du scroll pour l'effet glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fermer les notifications en cliquant ailleurs
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Charger les notifications au montage du composant
    useEffect(() => {
        loadNotifications();

        // Actualiser les notifications toutes les 30 secondes
        const interval = setInterval(loadNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Fonction pour charger les notifications depuis l'API
    const loadNotifications = async () => {
        setIsLoadingNotifications(true);
        try {
            const response = await fetch('/api/admin/notifications');
            if (response.ok) {
                const data = await response.json();
                // Convertir les timestamps en objets Date
                const processedData = data.map((notif: any) => ({
                    ...notif,
                    timestamp: new Date(notif.timestamp)
                }));
                setNotifications(processedData);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des notifications:', error);
            // Données de test si l'API n'est pas disponible
            setNotifications([
                {
                    id: '1',
                    type: 'info',
                    title: 'Nouvelle offre reçue',
                    message: 'Une nouvelle offre de revente a été soumise par John Doe',
                    timestamp: new Date(Date.now() - 5 * 60 * 1000),
                    read: false,
                    action: {
                        label: 'Voir l\'offre',
                        href: '/admin/resell'
                    }
                },
                {
                    id: '2',
                    type: 'success',
                    title: 'Commande validée',
                    message: 'La commande #12345 a été traitée avec succès',
                    timestamp: new Date(Date.now() - 15 * 60 * 1000),
                    read: false,
                    action: {
                        label: 'Voir la commande',
                        href: '/admin/commandes'
                    }
                },
                {
                    id: '3',
                    type: 'warning',
                    title: 'Stock faible',
                    message: 'Le produit "Carte Pikachu Gold" a un stock inférieur à 5 unités',
                    timestamp: new Date(Date.now() - 30 * 60 * 1000),
                    read: true,
                    action: {
                        label: 'Gérer le stock',
                        href: '/admin/articles'
                    }
                },
                {
                    id: '4',
                    type: 'error',
                    title: 'Problème de paiement',
                    message: 'Échec du paiement pour la commande #12344',
                    timestamp: new Date(Date.now() - 60 * 60 * 1000),
                    read: false,
                    action: {
                        label: 'Voir les détails',
                        href: '/admin/commandes'
                    }
                },
                {
                    id: '5',
                    type: 'info',
                    title: 'Nouvel utilisateur',
                    message: 'Un nouvel utilisateur s\'est inscrit sur la plateforme',
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    read: true,
                    action: {
                        label: 'Voir le profil',
                        href: '/admin/utilisateurs'
                    }
                }
            ]);
        } finally {
            setIsLoadingNotifications(false);
        }
    };

    // Marquer une notification comme lue
    const markAsRead = async (notificationId: string) => {
        try {
            await fetch(`/api/admin/notifications/${notificationId}/read`, {
                method: 'POST'
            });

            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId ? { ...notif, read: true } : notif
                )
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la notification:', error);
            // Mise à jour locale même en cas d'erreur API
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId ? { ...notif, read: true } : notif
                )
            );
        }
    };

    // Marquer toutes les notifications comme lues
    const markAllAsRead = async () => {
        try {
            await fetch('/api/admin/notifications/read-all', {
                method: 'POST'
            });

            setNotifications(prev =>
                prev.map(notif => ({ ...notif, read: true }))
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour des notifications:', error);
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, read: true }))
            );
        }
    };

    // Supprimer une notification
    const deleteNotification = async (notificationId: string) => {
        try {
            await fetch(`/api/admin/notifications/${notificationId}`, {
                method: 'DELETE'
            });

            setNotifications(prev =>
                prev.filter(notif => notif.id !== notificationId)
            );
        } catch (error) {
            console.error('Erreur lors de la suppression de la notification:', error);
            setNotifications(prev =>
                prev.filter(notif => notif.id !== notificationId)
            );
        }
    };

    // Navigation items
    const navItems = [
        {
            href: "/admin",
            label: "Dashboard",
            icon: faChartLine,
            color: "from-blue-500 to-indigo-600"
        },
        {
            href: "/admin/utilisateurs",
            label: "Utilisateurs",
            icon: faUsers,
            color: "from-purple-500 to-pink-600"
        },
        {
            href: "/admin/articles",
            label: "Boutique",
            icon: faStore,
            color: "from-green-500 to-emerald-600"
        },
        {
            href: "/admin/resell",
            label: "Offres",
            icon: faHandshake,
            color: "from-orange-500 to-red-600"
        },
        {
            href: "/admin/commandes",
            label: "Commandes",
            icon: faShoppingCart,
            color: "from-cyan-500 to-blue-600"
        }
    ];

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(href);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success': return faCheck;
            case 'warning': return faExclamationTriangle;
            case 'error': return faTimes;
            default: return faInfoCircle;
        }
    };

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'success': return 'text-green-500 bg-green-100 border-green-200';
            case 'warning': return 'text-yellow-500 bg-yellow-100 border-yellow-200';
            case 'error': return 'text-red-500 bg-red-100 border-red-200';
            default: return 'text-blue-500 bg-blue-100 border-blue-200';
        }
    };

    // Fonction corrigée pour le formatage des timestamps
    const formatTimestamp = (timestamp: Date | string) => {
        try {
            // Convertir en objet Date si ce n'en est pas déjà un
            const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

            // Vérifier si la date est valide
            if (isNaN(date.getTime())) {
                return 'Date invalide';
            }

            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (minutes < 1) return 'À l\'instant';
            if (minutes < 60) return `Il y a ${minutes}min`;
            if (hours < 24) return `Il y a ${hours}h`;
            return `Il y a ${days}j`;
        } catch (error) {
            console.error('Erreur lors du formatage de la date:', error);
            return 'Date invalide';
        }
    };

    return (
        <>
            <nav className={clsx(
                "sticky top-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-xl"
                    : "bg-white/95 backdrop-blur-lg border-b border-gray-100"
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo et titre */}
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="flex items-center gap-3 group">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <FontAwesomeIcon icon={faShieldAlt} className="text-white text-xl" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl animate-pulse opacity-20"></div>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                        <FontAwesomeIcon icon={faCrown} className="text-white text-xs" />
                                    </div>
                                </div>

                                <div className="hidden sm:block">
                                    <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 bg-clip-text text-transparent group-hover:from-red-500 group-hover:via-pink-500 group-hover:to-purple-600 transition-all duration-300">
                                        Admin Panel
                                    </h1>
                                    <p className="text-sm text-gray-600 font-medium">
                                        Console de gestion PikaVault
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation principale - Desktop */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={clsx(
                                            "relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2",
                                            isActive(item.href)
                                                ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        )}
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className={clsx(
                                                "text-sm",
                                                isActive(item.href) ? "text-white" : "text-gray-500"
                                            )}
                                        />
                                        <span className="text-sm">{item.label}</span>

                                        {isActive(item.href) && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-xl"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        {/* Actions utilisateur */}
                        <div className="flex items-center gap-3">

                            {/* Bouton Vue Client */}
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                    <span className="text-sm">Vue Client</span>
                                </motion.button>
                            </Link>

                            {/* Système de notifications */}
                            <div className="relative" ref={notificationRef}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                    className="relative w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
                                >
                                    <FontAwesomeIcon icon={faBell} className="text-gray-600" />
                                    {unreadCount > 0 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                                        >
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </motion.div>
                                    )}
                                </motion.button>

                                {/* Dropdown des notifications */}
                                <AnimatePresence>
                                    {isNotificationOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                        >
                                            {/* Header des notifications */}
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        Notifications
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        {unreadCount > 0 && (
                                                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                                                                {unreadCount} non lues
                                                            </span>
                                                        )}
                                                        {notifications.length > 0 && (
                                                            <button
                                                                onClick={markAllAsRead}
                                                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                                            >
                                                                Tout marquer comme lu
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Liste des notifications */}
                                            <div className="max-h-96 overflow-y-auto">
                                                {isLoadingNotifications ? (
                                                    <div className="p-6 text-center">
                                                        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                                                        <p className="text-gray-500 text-sm">Chargement...</p>
                                                    </div>
                                                ) : notifications.length === 0 ? (
                                                    <div className="p-6 text-center">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                            <FontAwesomeIcon icon={faBell} className="text-gray-400" />
                                                        </div>
                                                        <p className="text-gray-500 text-sm">Aucune notification</p>
                                                    </div>
                                                ) : (
                                                    <div className="divide-y divide-gray-100">
                                                        {notifications.map((notification) => (
                                                            <motion.div
                                                                key={notification.id}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className={clsx(
                                                                    "p-4 hover:bg-gray-50 transition-colors relative group",
                                                                    !notification.read && "bg-blue-50/50"
                                                                )}
                                                            >
                                                                <div className="flex gap-3">
                                                                    {/* Icône de type */}
                                                                    <div className={clsx(
                                                                        "w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0",
                                                                        getNotificationColor(notification.type)
                                                                    )}>
                                                                        <FontAwesomeIcon
                                                                            icon={getNotificationIcon(notification.type)}
                                                                            className="text-sm"
                                                                        />
                                                                    </div>

                                                                    {/* Contenu */}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="flex-1">
                                                                                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                                                                    {notification.title}
                                                                                </h4>
                                                                                <p className="text-sm text-gray-600 mb-2">
                                                                                    {notification.message}
                                                                                </p>
                                                                                <div className="flex items-center justify-between">
                                                                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                                                                        <FontAwesomeIcon icon={faClock} />
                                                                                        {formatTimestamp(notification.timestamp)}
                                                                                    </p>
                                                                                    {!notification.read && (
                                                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* Actions */}
                                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                {!notification.read && (
                                                                                    <button
                                                                                        onClick={() => markAsRead(notification.id)}
                                                                                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                                        title="Marquer comme lu"
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} className="text-xs" />
                                                                                    </button>
                                                                                )}
                                                                                <button
                                                                                    onClick={() => deleteNotification(notification.id)}
                                                                                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                                                                    title="Supprimer"
                                                                                >
                                                                                    <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        {/* Action button */}
                                                                        {notification.action && (
                                                                            <Link
                                                                                href={notification.action.href}
                                                                                onClick={() => {
                                                                                    setIsNotificationOpen(false);
                                                                                    if (!notification.read) {
                                                                                        markAsRead(notification.id);
                                                                                    }
                                                                                }}
                                                                                className="inline-flex items-center mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors"
                                                                            >
                                                                                {notification.action.label}
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            {notifications.length > 0 && (
                                                <div className="border-t border-gray-200 p-3">
                                                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                                                        Voir toutes les notifications
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Panier */}
                            <div className="hidden sm:block">
                                <PanierNavbar />
                            </div>

                            {/* Profile Dropdown */}
                            <ProfileDropdown user={user} />

                            {/* Menu Mobile */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
                            >
                                <FontAwesomeIcon
                                    icon={isMobileMenuOpen ? faTimes : faBars}
                                    className="text-gray-600"
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Menu Mobile */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
                        >
                            <div className="px-4 py-6 space-y-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            className={clsx(
                                                "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300",
                                                isActive(item.href)
                                                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                                    : "text-gray-700 hover:bg-gray-100"
                                            )}
                                        >
                                            <FontAwesomeIcon
                                                icon={item.icon}
                                                className={clsx(
                                                    isActive(item.href) ? "text-white" : "text-gray-500"
                                                )}
                                            />
                                            <span>{item.label}</span>
                                            {isActive(item.href) && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="ml-auto w-2 h-2 bg-white rounded-full"
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                ))}

                                {/* Actions mobiles */}
                                <div className="pt-4 border-t border-gray-200 space-y-3">
                                    {/* Notifications mobiles */}
                                    <div className="flex items-center justify-between px-4 py-3 text-gray-700">
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faBell} />
                                            <span className="font-medium">Notifications</span>
                                        </div>
                                        {unreadCount > 0 && (
                                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </div>

                                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold">
                                            <FontAwesomeIcon icon={faEye} />
                                            <span>Vue Client</span>
                                        </div>
                                    </Link>

                                    <div className="flex items-center gap-3 px-4 py-3 text-gray-700">
                                        <PanierNavbar />
                                        <span className="font-medium">Mon Panier</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Indicateur de statut Admin */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white text-center py-2 text-sm font-semibold"
            >
                <div className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faShieldAlt} className="animate-pulse" />
                    <span>Mode Administrateur Activé</span>
                    <FontAwesomeIcon icon={faCrown} className="animate-bounce" />
                    {unreadCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                            {unreadCount} notifications
                        </span>
                    )}
                </div>
            </motion.div>
        </>
    );
}