"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faHeart,
    faShoppingBag,
    faCoins,
    faUserShield,
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
    const pathname = usePathname();
    const isBlackListed = pathname === "/auth/login" || pathname === "/auth/register";

    return (
        <footer className={`bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-gray-300 ${isBlackListed && "hidden"}`}>
            {/* Section principale du footer */}
            <div className="container mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Colonne 1 - À propos */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <h3 className="font-permanentmarker text-3xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                                PikaVault
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                La marketplace de référence pour les collectionneurs Pokémon.
                                Achetez, vendez et échangez en toute sécurité.
                            </p>
                        </div>

                        {/* Réseaux sociaux - Simplifié sans icônes de marque */}
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-yellow-500/20 rounded-lg flex items-center justify-center transition-colors group">
                                <span className="text-gray-400 group-hover:text-yellow-400 font-bold">D</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-yellow-500/20 rounded-lg flex items-center justify-center transition-colors group">
                                <span className="text-gray-400 group-hover:text-yellow-400 font-bold">I</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-yellow-500/20 rounded-lg flex items-center justify-center transition-colors group">
                                <span className="text-gray-400 group-hover:text-yellow-400 font-bold">Y</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-yellow-500/20 rounded-lg flex items-center justify-center transition-colors group">
                                <span className="text-gray-400 group-hover:text-yellow-400 font-bold">T</span>
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2 - Navigation */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/boutique" className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group">
                                    <FontAwesomeIcon icon={faShoppingBag} className="mr-3 text-sm group-hover:text-yellow-400" />
                                    Boutique
                                </Link>
                            </li>
                            <li>
                                <Link href="/resell" className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group">
                                    <FontAwesomeIcon icon={faCoins} className="mr-3 text-sm group-hover:text-yellow-400" />
                                    Vendre mes cartes
                                </Link>
                            </li>
                            <li>
                                <Link href="/commandes" className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group">
                                    <FontAwesomeIcon icon={faUserShield} className="mr-3 text-sm group-hover:text-yellow-400" />
                                    Mes commandes
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group">
                                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-3 text-sm group-hover:text-yellow-400" />
                                    Contact & Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 - Informations légales */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Informations</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Conditions d&apos;utilisation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Politique de confidentialité
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Mentions légales
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Programme d&apos;affiliation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 - Contact */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faPhone} className="text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">+41 76 553 41 54</p>
                                    <p className="text-gray-400 text-sm">Lun-Ven 9h-18h</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">contact@pikavault.ch</p>
                                    <p className="text-gray-400 text-sm">Support 24/7</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Suisse</p>
                                    <p className="text-gray-400 text-sm">Livraison mondiale</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ligne de séparation */}
            <div className="border-t border-gray-800"></div>

            {/* Section du bas */}
            <div className="container mx-auto px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} PikaVault. Tous droits réservés.
                        </p>
                    </div>

                    {/* Développé par Helveit */}
                    <div className="text-center md:text-right">
                        <p className="text-gray-400 flex items-center justify-center md:justify-end">
                            Développé avec
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="mx-2 text-red-500 animate-pulse"
                            />
                            par
                            <a
                                href="https://helveit.ch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
                            >
                                Helveit
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}