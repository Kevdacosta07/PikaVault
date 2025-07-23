"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faShoppingCart,
    faArrowRight,
    faCheckCircle,
    faShieldAlt,
    faBolt,
    faGem,
    faUsers,
    faTrophy,
    faFire
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import FadeInSection from "@/components/Animation/FadeInSection";
import { HeroAnimation } from "@/components/Animation/HeroAnimation";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-red-50">

            {/* Hero Section - Design Pokémon immersif */}
            <HeroAnimation>
                <section className="relative min-h-screen overflow-hidden">
                    {/* Background Pattern Pokémon */}
                    <div className="absolute inset-0">
                        {/* Pokéballs en arrière-plan */}
                        <div className="absolute top-10 left-10 w-24 h-24 bg-red-500/10 rounded-full"></div>
                        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500/10 rounded-full"></div>
                        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-yellow-500/10 rounded-full"></div>
                        <div className="absolute bottom-40 right-10 w-20 h-20 bg-green-500/10 rounded-full"></div>

                        {/* Éclairs décoratifs */}
                        <div className="absolute top-1/4 left-1/6 text-6xl text-yellow-300/20 animate-pulse">⚡</div>
                        <div className="absolute top-2/3 right-1/5 text-4xl text-orange-300/20 animate-pulse [animation-delay:1s]">⚡</div>
                        <div className="absolute bottom-1/4 left-3/4 text-5xl text-red-300/20 animate-pulse [animation-delay:2s]">⚡</div>
                    </div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

                            {/* Colonne gauche - Contenu */}
                            <div className="space-y-8 z-10">
                                {/* Badge Premium */}
                                <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full px-6 py-3 shadow-lg">
                                    <FontAwesomeIcon icon={faTrophy} className="mr-3 text-lg" />
                                    <span className="font-bold text-lg">Marketplace #1 en Suisse</span>
                                </div>

                                {/* Titre principal avec nouveau texte */}
                                <div className="space-y-6">
                                    <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                                        <span className="text-gray-900">Votre collection</span>
                                        <br />
                                        <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                            Pokémon rêvée
                                        </span>
                                        <br />
                                        <span className="text-gray-700 text-4xl lg:text-5xl">commence ici</span>
                                    </h1>

                                    <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                                        Explorez des milliers de cartes Pokémon authentiques et rares sur la marketplace
                                        de confiance des collectionneurs suisses.
                                        <span className="text-yellow-600 font-semibold"> Achetez</span>,
                                        <span className="text-blue-600 font-semibold"> vendez</span> et
                                        <span className="text-red-600 font-semibold"> échangez</span> en toute sécurité.
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/boutique"
                                        className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative flex items-center justify-center gap-3">
                                            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                                            <span>Explorer la boutique</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>

                                    <Link
                                        href="/resell"
                                        className="group px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-green-400 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <FontAwesomeIcon icon={faCoins} className="text-green-600" />
                                            <span>Vendre mes cartes</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Garanties */}
                                <div className="flex flex-wrap gap-6 pt-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                        <span className="font-medium">100% Sécurisé</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />
                                        <span className="font-medium">Cartes authentifiées</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <FontAwesomeIcon icon={faBolt} className="text-yellow-500" />
                                        <span className="font-medium">Livraison express</span>
                                    </div>
                                </div>
                            </div>

                            {/* Colonne droite - Image des cartes sans fond blanc */}
                            <div className="relative">
                                {/* Container principal avec effet de profondeur */}
                                <div className="relative transform hover:scale-105 transition-transform duration-500">

                                    {/* Effet de lueur autour de l'image */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 rounded-3xl blur-xl scale-110"></div>

                                    {/* Image sans container blanc */}
                                    <div className="relative">
                                        <Image
                                            src="/assets/img/cards.png"
                                            alt="Collection de cartes Pokémon PikaVault"
                                            width={600}
                                            height={600}
                                            className="w-full h-auto object-contain drop-shadow-2xl"
                                            unoptimized
                                            priority
                                        />

                                        {/* Badge "Nouvelle collection" floating */}
                                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12 animate-pulse">
                                            <FontAwesomeIcon icon={faFire} className="mr-1" />
                                            <span className="font-bold text-sm">Nouveau</span>
                                        </div>
                                    </div>

                                    {/* Cartes flottantes décoratives */}
                                    <div className="absolute -top-8 -left-8 w-20 h-20 bg-yellow-400 rounded-xl shadow-lg transform -rotate-12 animate-bounce opacity-80"></div>
                                    <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-400 rounded-xl shadow-lg transform rotate-12 animate-bounce opacity-80 [animation-delay:1s]"></div>
                                    <div className="absolute top-1/2 -left-6 w-12 h-12 bg-red-400 rounded-xl shadow-lg transform -rotate-45 animate-bounce opacity-80 [animation-delay:2s]"></div>
                                </div>

                                {/* Éléments décoratifs supplémentaires */}
                                <div className="absolute top-10 right-10 text-4xl animate-spin-slow">⭐</div>
                                <div className="absolute bottom-20 left-10 text-3xl animate-bounce">💫</div>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </HeroAnimation>

            {/* Section Types de cartes populaires */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4 text-gray-900">
                                Les cartes les plus <span className="text-yellow-600">recherchées</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Découvrez notre sélection exclusive des cartes Pokémon les plus convoitées
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FadeInSection>
                            <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-200/50">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Image
                                            src="/assets/img/pikachu.png"
                                            alt="Pikachu"
                                            width={60}
                                            height={60}
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Cartes Iconiques</h3>
                                    <p className="text-gray-600 mb-4">
                                        Pikachu, Charizard et autres légendes du TCG Pokémon
                                    </p>
                                    <div className="text-yellow-600 font-bold text-lg">À partir de 15 CHF</div>
                                </div>
                            </div>
                        </FadeInSection>

                        <FadeInSection>
                            <div className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200/50">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <FontAwesomeIcon icon={faGem} className="text-white text-3xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Cartes Rares</h3>
                                    <p className="text-gray-600 mb-4">
                                        Holographiques, EX, GX et cartes de collection limitées
                                    </p>
                                    <div className="text-blue-600 font-bold text-lg">À partir de 50 CHF</div>
                                </div>
                            </div>
                        </FadeInSection>

                        <FadeInSection>
                            <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-200/50">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <FontAwesomeIcon icon={faTrophy} className="text-white text-3xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Éditions Spéciales</h3>
                                    <p className="text-gray-600 mb-4">
                                        Cartes promotionnelles, première édition et PSA gradées
                                    </p>
                                    <div className="text-red-600 font-bold text-lg">À partir de 100 CHF</div>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Section Avantages */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4 text-gray-900">
                                Pourquoi choisir <span className="text-blue-600">PikaVault</span> ?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Une plateforme conçue par des dresseurs, pour des dresseurs passionnés
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <FadeInSection>
                            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-white text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Sécurisé</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Paiements protégés par Stripe, authentification professionnelle des cartes et garantie de remboursement.
                                </p>
                            </div>
                        </FadeInSection>

                        <FadeInSection>
                            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon icon={faBolt} className="text-white text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Livraison Express</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Expédition sous 24h partout en Suisse. Emballage sécurisé pour protéger vos cartes précieuses.
                                </p>
                            </div>
                        </FadeInSection>

                        <FadeInSection>
                            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon icon={faUsers} className="text-white text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Communauté Active</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Rejoignez des milliers de collectionneurs passionnés. Support expert et conseils personnalisés.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Section Achat/Vente */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">

                        {/* Achat */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                            <FadeInSection>
                                <div className="text-center lg:text-left">
                                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full px-6 py-3 mb-8 font-semibold">
                                        <FontAwesomeIcon icon={faGem} className="mr-3" />
                                        Collection premium certifiée
                                    </div>

                                    <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                        Trouvez la carte de vos <span className="text-blue-600">rêves</span>
                                    </h2>

                                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                        Explorez notre catalogue exclusif de cartes Pokémon authentiques.
                                        Chaque carte est minutieusement vérifiée et certifiée par nos experts collectionneurs.
                                    </p>

                                    <Link href="/boutique" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        Explorer la boutique
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </FadeInSection>

                            <FadeInSection>
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src="/assets/img/drakofeu.png"
                                            alt="Dracaufeu"
                                            width={400}
                                            height={400}
                                            className="w-full h-auto drop-shadow-2xl"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Vente */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            <FadeInSection>
                                <div className="relative order-2 lg:order-1">
                                    <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src="/assets/img/mew.png"
                                            alt="Mew"
                                            width={400}
                                            height={400}
                                            className="w-full h-auto drop-shadow-2xl"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection>
                                <div className="text-center lg:text-left order-1 lg:order-2">
                                    <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full px-6 py-3 mb-8 font-semibold">
                                        <FontAwesomeIcon icon={faCoins} className="mr-3" />
                                        Évaluation gratuite et rapide
                                    </div>

                                    <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                        Vendez vos cartes au <span className="text-green-600">meilleur prix</span>
                                    </h2>

                                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                        Obtenez une évaluation professionnelle de votre collection.
                                        Processus simplifié, paiement rapide et service client dédié.
                                    </p>

                                    <Link href="/resell" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                        <FontAwesomeIcon icon={faCoins} />
                                        Commencer à vendre
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
                {/* Particules magiques */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400 rounded-full animate-ping [animation-delay:1s]"></div>
                    <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping [animation-delay:2s]"></div>
                    <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-green-400 rounded-full animate-ping [animation-delay:0.5s]"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeInSection>
                        <div className="text-center text-white max-w-4xl mx-auto">
                            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Rejoignez l&#39;aventure PikaVault
                            </h2>

                            <p className="text-2xl text-gray-300 mb-12">
                                Votre collection de rêve vous attend
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto mb-12">
                                <Link href="/boutique" className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                    Acheter maintenant
                                </Link>

                                <Link href="/resell" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                    Vendre mes cartes
                                </Link>
                            </div>

                            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-400 text-3xl mb-3" />
                                    <div className="text-lg font-semibold text-gray-300">100% Sécurisé</div>
                                </div>
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faBolt} className="text-yellow-400 text-3xl mb-3" />
                                    <div className="text-lg font-semibold text-gray-300">Livraison 24h</div>
                                </div>
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-3xl mb-3" />
                                    <div className="text-lg font-semibold text-gray-300">Authentifié</div>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>
        </div>
    );
}