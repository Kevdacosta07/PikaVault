"use client";

import Link from "next/link";
import { useState, useEffect, useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faUser,
    faBox,
    faGem,
    faSignOutAlt,
    faCrown,
    faCoins,
    faUserCircle,
    faChevronDown,
    faBars,
    faTimes,
    faHome,
    faStore,
    faPlus,
    faGamepad,
    faCog
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { PanierContext } from "@/components/Providers/PanierProvider";

interface User {
    name?: string | null | undefined;
    id?: string | null | undefined;
    image?: string | null | undefined;
    admin: number;
    email?: string | null | undefined;
    points?: number;
}

interface Session {
    user?: User;
}

interface NavBarContentProps {
    session: Session | null;
}

// Composant PanierNavbar moderne
function PanierNavbar() {
    const panierContext = useContext(PanierContext);
    const router = useRouter();

    if (!panierContext) {
        return null;
    }

    const { panier } = panierContext;

    return (
        <button
            onClick={() => router.push("/panier")}
            className="relative p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 group"
        >
            <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-lg group-hover:scale-110 transition-transform"
            />
            {panier.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {panier.length}
                </span>
            )}
        </button>
    );
}

// Composant ProfileDropdown moderne
function ProfileDropdown({ user }: { user: User }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        setDropdownOpen(false);
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
            >
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt="Profile"
                                width={36}
                                height={36}
                                className="w-9 h-9 rounded-full border-2 border-gray-200 group-hover:border-orange-300 transition-colors object-cover"
                            />
                        ) : (
                            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center border-2 border-gray-200 group-hover:border-orange-300 transition-colors">
                                <span className="text-white font-semibold text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                        )}
                        {user?.admin === 1 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faCrown} className="text-white text-xs" />
                            </div>
                        )}
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-24">
                            {user?.name || 'Utilisateur'}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faCoins} className="mr-1" />
                            {user?.points || 0} pts
                        </p>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-gray-400 text-sm transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown menu moderne */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">

                    {/* Header du dropdown */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                {user?.image ? (
                                    <Image
                                        src={user.image}
                                        alt="Profile"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faUserCircle} className="text-white text-2xl" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold truncate">
                                    {user?.name || 'Utilisateur'}
                                </p>
                                <p className="text-orange-100 text-sm truncate">
                                    {user?.email}
                                </p>
                                <div className="flex items-center mt-1">
                                    <FontAwesomeIcon icon={faCoins} className="text-yellow-300 mr-1" />
                                    <span className="text-yellow-100 text-sm font-medium">
                                        {user?.points || 0} points
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation du dropdown */}
                    <div className="py-2">
                        {user?.admin === 1 && (
                            <Link
                                href="/admin"
                                className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 transition-colors group"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                                    <FontAwesomeIcon icon={faCrown} className="text-red-600 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm">Administration</div>
                                    <div className="text-xs text-gray-500">Gestion du site</div>
                                </div>
                            </Link>
                        )}

                        <Link
                            href={`/profile/${user?.id}`}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors group"
                            onClick={() => setDropdownOpen(false)}
                        >
                            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                                <FontAwesomeIcon icon={faUser} className="text-blue-600 text-sm" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">Mon Profil</div>
                                <div className="text-xs text-gray-500">Gérer mes informations</div>
                            </div>
                        </Link>

                        <Link
                            href="/commandes"
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 transition-colors group"
                            onClick={() => setDropdownOpen(false)}
                        >
                            <div className="w-10 h-10 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                                <FontAwesomeIcon icon={faBox} className="text-purple-600 text-sm" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">Mes Commandes</div>
                                <div className="text-xs text-gray-500">Historique des achats</div>
                            </div>
                        </Link>

                        <Link
                            href={`/resell/offers/${user?.id}`}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 transition-colors group"
                            onClick={() => setDropdownOpen(false)}
                        >
                            <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                                <FontAwesomeIcon icon={faGem} className="text-green-600 text-sm" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">Mes Offres</div>
                                <div className="text-xs text-gray-500">Cartes en vente</div>
                            </div>
                        </Link>

                        <div className="border-t border-gray-100 my-2"></div>

                        {/* Section paramètres */}
                        <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
                            <div className="w-10 h-10 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                                <FontAwesomeIcon icon={faCog} className="text-gray-600 text-sm" />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold text-sm">Paramètres</div>
                                <div className="text-xs text-gray-500">Préférences du compte</div>
                            </div>
                        </button>

                        <div className="border-t border-gray-100 my-2"></div>

                        <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 transition-colors group"
                        >
                            <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                                <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600 text-sm" />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold text-sm text-red-700">Se Déconnecter</div>
                                <div className="text-xs text-red-500">Fermer la session</div>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function NavBarContent({ session: initialSession }: NavBarContentProps) {
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname === "/resell" || pathname === "/panier";
    const isBlackListed = pathname === "/auth/login" || pathname === "/auth/register";

    const { data: clientSession, status } = useSession();
    const session = clientSession || initialSession;

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Gestion du scroll pour effet glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Effet glassmorphism
            setScrolled(currentScrollY > 10);

            // Hide/show navbar
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const openMobileMenu = () => {
        setIsMobileMenuOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
    };

    const handleSignOut = async () => {
        closeMobileMenu();
        await signOut({ callbackUrl: "/" });
    };

    useEffect(() => {
        closeMobileMenu();
    }, [pathname]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    // Fermer les menus en cliquant ailleurs
    useEffect(() => {
        const handleClickOutside = () => {
            setIsMobileMenuOpen(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (isBlackListed) {
        return null;
    }

    const isLoading = status === "loading";

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isHomePage ? (isVisible ? "translate-y-0" : "-translate-y-full") : ""
            } ${
                scrolled
                    ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg'
                    : 'bg-white/95 backdrop-blur-sm border-b border-gray-200/30'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo et marque avec Pikachu */}
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden">
                                        <Image
                                            src="/assets/img/minipika.png"
                                            alt="Pikachu PikaVault"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                        PikaVault
                                    </h1>
                                    <p className="text-xs text-gray-500 -mt-1">Cartes Pokémon Premium</p>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation principale - Desktop */}
                        <div className="hidden lg:flex items-center space-x-1">
                            <Link
                                href="/"
                                className="flex items-center px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                            >
                                <FontAwesomeIcon icon={faHome} className="mr-2 text-sm group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Accueil</span>
                            </Link>

                            <Link
                                href="/boutique"
                                className="flex items-center px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                            >
                                <FontAwesomeIcon icon={faStore} className="mr-2 text-sm group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Boutique</span>
                            </Link>

                            <Link
                                href="/resell"
                                className="flex items-center px-4 py-2 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 group"
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2 text-sm group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Revente</span>
                            </Link>

                            <Link
                                href="/contact"
                                className="flex items-center px-4 py-2 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 group"
                            >
                                <FontAwesomeIcon icon={faGamepad} className="mr-2 text-sm group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Contact</span>
                            </Link>
                        </div>

                        {/* Actions utilisateur */}
                        <div className="flex items-center space-x-3">

                            {/* Panier */}
                            {!isLoading && session?.user && <PanierNavbar />}

                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="hidden sm:block w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ) : session?.user ? (
                                <>
                                    {/* Dropdown profil */}
                                    <ProfileDropdown user={session.user} />
                                </>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href="/auth/login"
                                        className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-xl hover:bg-orange-50 transition-all duration-200"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        S&#39;inscrire
                                    </Link>
                                </div>
                            )}

                            {/* Menu mobile toggle */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openMobileMenu();
                                }}
                                className="lg:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                            >
                                <FontAwesomeIcon
                                    icon={isMobileMenuOpen ? faTimes : faBars}
                                    className="text-xl"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menu mobile */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu}></div>
                    <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl">
                        <div className="max-w-md mx-auto p-6 space-y-6">

                            {/* Navigation mobile */}
                            <div className="space-y-2">
                                <Link
                                    href="/"
                                    className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                    onClick={closeMobileMenu}
                                >
                                    <FontAwesomeIcon icon={faHome} className="text-orange-500 mr-4" />
                                    <span className="font-medium">Accueil</span>
                                </Link>

                                <Link
                                    href="/boutique"
                                    className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                    onClick={closeMobileMenu}
                                >
                                    <FontAwesomeIcon icon={faStore} className="text-blue-500 mr-4" />
                                    <span className="font-medium">Boutique</span>
                                </Link>

                                <Link
                                    href="/resell"
                                    className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                    onClick={closeMobileMenu}
                                >
                                    <FontAwesomeIcon icon={faPlus} className="text-green-500 mr-4" />
                                    <span className="font-medium">Revente</span>
                                </Link>

                                <Link
                                    href="/contact"
                                    className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                    onClick={closeMobileMenu}
                                >
                                    <FontAwesomeIcon icon={faGamepad} className="text-purple-500 mr-4" />
                                    <span className="font-medium">Contact</span>
                                </Link>
                            </div>

                            {session?.user && (
                                <>
                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="space-y-2">
                                            {session.user.admin === 1 && (
                                                <Link
                                                    href="/admin"
                                                    className="flex items-center p-4 rounded-xl hover:bg-red-50 transition-colors"
                                                    onClick={closeMobileMenu}
                                                >
                                                    <FontAwesomeIcon icon={faCrown} className="text-red-500 mr-4" />
                                                    <span className="font-medium">Administration</span>
                                                </Link>
                                            )}

                                            <Link
                                                href={`/profile/${session.user.id}`}
                                                className="flex items-center p-4 rounded-xl hover:bg-blue-50 transition-colors"
                                                onClick={closeMobileMenu}
                                            >
                                                <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-4" />
                                                <span className="font-medium">Mon Profil</span>
                                            </Link>

                                            <Link
                                                href="/commandes"
                                                className="flex items-center p-4 rounded-xl hover:bg-purple-50 transition-colors"
                                                onClick={closeMobileMenu}
                                            >
                                                <FontAwesomeIcon icon={faBox} className="text-purple-500 mr-4" />
                                                <span className="font-medium">Mes Commandes</span>
                                            </Link>

                                            <Link
                                                href={`/resell/offers/${session.user.id}`}
                                                className="flex items-center p-4 rounded-xl hover:bg-green-50 transition-colors"
                                                onClick={closeMobileMenu}
                                            >
                                                <FontAwesomeIcon icon={faGem} className="text-green-500 mr-4" />
                                                <span className="font-medium">Mes Offres</span>
                                            </Link>

                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center w-full p-4 rounded-xl hover:bg-red-50 transition-colors"
                                            >
                                                <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 mr-4" />
                                                <span className="font-medium text-red-700">Se Déconnecter</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Spacer pour éviter que le contenu passe sous la navbar */}
            <div className="h-16"></div>
        </>
    );
}