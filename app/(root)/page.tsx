"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faCoins,
    faArrowRight,
    faShieldAlt,
    faBolt,
    faCheckCircle,
    faStar,
    faGem,
    faRocket,
    faAward
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { HeroAnimation } from "@/components/Animation/HeroAnimation";

// Hook personnalisé pour les animations d'entrée
const useAnimatedEntry = (threshold = 0.1, rootMargin = "0px") => {
    const { ref, inView } = useInView({
        threshold,
        rootMargin,
        triggerOnce: true
    });
    return { ref, inView };
};

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    // Refs pour chaque section
    const typesRef = useAnimatedEntry(0.2);
    const buyRef = useAnimatedEntry(0.2);
    const sellRef = useAnimatedEntry(0.2);
    const ctaRef = useAnimatedEntry(0.2);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section - Simple et épuré */}
            <HeroAnimation>
                <section className="min-h-screen flex items-center justify-center px-4 py-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* Contenu principal */}
                            <div className="text-center lg:text-left space-y-8">
                                {/* Badge */}
                                <div className="hero-subtitle inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-2 rounded-full font-semibold">
                                    <FontAwesomeIcon icon={faStar} className="mr-2" />
                                    #1 en Suisse
                                </div>

                                {/* Titre principal */}
                                <div className="space-y-4">
                                    <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                        Votre collection
                                        <br />
                                        <span className="bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                                Pokémon
                            </span>
                                        <br />
                                        commence ici
                                    </h1>

                                    <p className="hero-description text-lg sm:text-xl text-gray-600 max-w-2xl">
                                        La marketplace de référence pour acheter, vendre et échanger
                                        des cartes Pokémon authentiques en Suisse.
                                    </p>
                                </div>

                                {/* Boutons CTA */}
                                <div className="hero-button flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link
                                        href="/boutique"
                                        className="group px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                            <span>Explorer la boutique</span>
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </div>
                                    </Link>

                                    <Link
                                        href="/resell"
                                        className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <FontAwesomeIcon icon={faCoins} />
                                            <span>Vendre mes cartes</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Garanties simples */}
                                <div className="hero-button flex flex-wrap justify-center lg:justify-start gap-6 pt-8 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                        <span>100% Sécurisé</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />
                                        <span>Cartes authentifiées</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faBolt} className="text-yellow-500" />
                                        <span>Livraison express</span>
                                    </div>
                                </div>
                            </div>

                            {/* Image des cartes */}
                            {/* Image des cartes */}
                            <div className="hero-image relative">
                                <div className="relative mx-auto max-w-md lg:max-w-none">
                                    <Image
                                        src="/assets/img/cards.png"
                                        alt="Collection de cartes Pokémon"
                                        width={600}
                                        height={600}
                                        className="w-full h-auto object-contain drop-shadow-2xl"
                                        unoptimized
                                        priority
                                    />

                                    {/* Badge flottant */}
                                    <div className="hero-badge absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transform">
                                        <span className="font-bold text-sm">Nouveau</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </HeroAnimation>

            {/* Section Types de cartes avec animations */}
            <section ref={typesRef.ref} className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* En-tête avec animation */}
                    <div className={`text-center mb-16 transition-all duration-700 ${
                        typesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Les cartes les plus <span className="text-yellow-600">recherchées</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez notre sélection exclusive des cartes Pokémon les plus convoitées
                        </p>
                    </div>

                    {/* Grille de cartes avec animations échelonnées */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Cartes Iconiques - Premier à apparaître */}
                        <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 group delay-100 ${
                            typesRef.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <Image
                                        src="/assets/img/pikachu.png"
                                        alt="Pikachu"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Cartes Iconiques</h3>
                                <p className="text-gray-600">
                                    Pikachu, Charizard et autres légendes
                                </p>
                                <div className="text-yellow-600 font-bold text-lg">À partir de 15 CHF</div>
                            </div>
                        </div>

                        {/* Cartes Rares - Deuxième à apparaître */}
                        <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 group delay-300 ${
                            typesRef.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <span className="text-white text-2xl">💎</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Cartes Rares</h3>
                                <p className="text-gray-600">
                                    Holographiques, EX, GX et limitées
                                </p>
                                <div className="text-blue-600 font-bold text-lg">À partir de 50 CHF</div>
                            </div>
                        </div>

                        {/* Éditions Spéciales - Dernier à apparaître */}
                        <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 group delay-500 ${
                            typesRef.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <span className="text-white text-2xl">🏆</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Éditions Spéciales</h3>
                                <p className="text-gray-600">
                                    Promotionnelles et PSA gradées
                                </p>
                                <div className="text-red-600 font-bold text-lg">À partir de 100 CHF</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Achat/Vente - Version Épurée avec Couleurs */}
            <section ref={buyRef.ref} className="py-24 bg-white overflow-hidden">
                <div className="w-full px-0">

                    {/* Section Acheter */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-center mb-32">

                        {/* Contenu texte - Gauche (3/5) */}
                        <div className={`lg:col-span-3 px-8 lg:px-16 xl:px-24 py-20 transition-all duration-1000 ${
                            buyRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                        }`}>
                            <div className="max-w-3xl space-y-8">

                                {/* Badge avec couleur */}
                                <div className={`transition-all duration-700 delay-200 ${
                                    buyRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-default shadow-lg">
                                        Marketplace
                                    </div>
                                </div>

                                {/* Titre avec accent coloré */}
                                <div className="space-y-2">
                                    <h2 className={`text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-700 delay-300 ${
                                        buyRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}>
                                        Trouvez la carte
                                    </h2>
                                    <h2 className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight transition-all duration-700 delay-500 ${
                                        buyRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}>
                                        de vos rêves
                                    </h2>
                                </div>

                                {/* Description */}
                                <p className={`text-xl text-gray-600 leading-relaxed max-w-2xl transition-all duration-700 delay-700 ${
                                    buyRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                }`}>
                                    Collection exclusive de cartes Pokémon <span className="text-blue-600 font-semibold">authentifiées</span>.
                                    Chaque carte est vérifiée par nos experts pour garantir
                                    son authenticité et sa <span className="text-purple-600 font-semibold">qualité premium</span>.
                                </p>

                                {/* Features avec points colorés */}
                                <div className="space-y-4">
                                    {[
                                        { text: "Plus de 10,000 cartes disponibles", color: "bg-blue-500" },
                                        { text: "Certification d'authenticité incluse", color: "bg-green-500" },
                                        { text: "Livraison sécurisée en 24h", color: "bg-purple-500" }
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-4 group cursor-default transition-all duration-500 delay-${900 + index * 150} ${
                                                buyRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                            }`}
                                        >
                                            <div className={`w-3 h-3 ${feature.color} rounded-full group-hover:scale-125 transition-all duration-300 shadow-md`}></div>
                                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA avec gradient */}
                                <div className={`pt-6 transition-all duration-700 delay-1200 ${
                                    buyRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <Link
                                        href="/boutique"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
                                    >
                                        <span>Explorer la boutique</span>
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className="text-sm group-hover:translate-x-1 transition-transform duration-300"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Image avec overlay coloré */}
                        <div className={`lg:col-span-2 relative min-h-[600px] lg:min-h-[700px] group overflow-hidden transition-all duration-1000 delay-400 ${
                            buyRef.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <Image
                                src="/assets/bg/bg3.jpg"
                                alt="Collection Pokémon"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                                priority
                                unoptimized
                            />
                            {/* Overlay gradient coloré */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Badge flottant */}
                            <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold shadow-lg">
                                Premium
                            </div>
                        </div>
                    </div>

                    {/* Section Vendre - Inversée avec couleurs complémentaires */}
                    <div ref={sellRef.ref} className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-center">

                        {/* Image avec overlay vert */}
                        <div className={`lg:col-span-2 relative order-2 lg:order-1 min-h-[600px] lg:min-h-[700px] group overflow-hidden transition-all duration-1000 ${
                            sellRef.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <Image
                                src="/assets/bg/bg5.png"
                                alt="Vente de collection"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Badge flottant */}
                            <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 backdrop-blur-sm text-green-700 rounded-full text-sm font-semibold shadow-lg">
                                Expert
                            </div>
                        </div>

                        {/* Contenu texte - Droite (3/5) */}
                        <div className={`lg:col-span-3 px-8 lg:px-16 xl:px-24 py-20 order-1 lg:order-2 transition-all duration-1000 delay-200 ${
                            sellRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                        }`}>
                            <div className="max-w-3xl lg:ml-auto space-y-8">

                                {/* Badge vert */}
                                <div className={`transition-all duration-700 delay-400 ${
                                    sellRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 cursor-default shadow-lg">
                                        Service Premium
                                    </div>
                                </div>

                                {/* Titre avec accent vert */}
                                <div className="space-y-2">
                                    <h2 className={`text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-700 delay-500 ${
                                        sellRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}>
                                        Vendez au
                                    </h2>
                                    <h2 className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight transition-all duration-700 delay-700 ${
                                        sellRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}>
                                        meilleur prix
                                    </h2>
                                </div>

                                {/* Description avec accents colorés */}
                                <p className={`text-xl text-gray-600 leading-relaxed max-w-2xl transition-all duration-700 delay-900 ${
                                    sellRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                }`}>
                                    Évaluation <span className="text-green-600 font-semibold">professionnelle</span> de votre collection par nos experts.
                                    Processus simplifié, paiement <span className="text-emerald-600 font-semibold">sécurisé et immédiat</span>.
                                </p>

                                {/* Features avec couleurs variées */}
                                <div className="space-y-4">
                                    {[
                                        { text: "Évaluation gratuite en 24h", color: "bg-green-500" },
                                        { text: "Paiement immédiat après accord", color: "bg-yellow-500" },
                                        { text: "Commission transparente", color: "bg-emerald-500" }
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-4 group cursor-default transition-all duration-500 delay-${1100 + index * 150} ${
                                                sellRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                                            }`}
                                        >
                                            <div className={`w-3 h-3 ${feature.color} rounded-full group-hover:scale-125 transition-all duration-300 shadow-md`}></div>
                                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA avec gradient vert */}
                                <div className={`pt-6 transition-all duration-700 delay-1400 ${
                                    sellRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <Link
                                        href="/resell"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
                                    >
                                        <span>Commencer à vendre</span>
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className="text-sm group-hover:translate-x-1 transition-transform duration-300"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final avec animations */}
            <section ref={ctaRef.ref} className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className={`space-y-8 transition-all duration-700 ${
                        ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Rejoignez l&apos;aventure <span className="text-yellow-400">PikaVault</span>
                        </h2>

                        <p className="text-xl text-gray-300">
                            Votre collection de rêve vous attend
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto transition-all duration-700 delay-300 ${
                            ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <Link
                                href="/boutique"
                                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Acheter maintenant
                            </Link>
                            <Link
                                href="/resell"
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Vendre mes cartes
                            </Link>
                        </div>

                        {/* Garanties footer avec animation */}
                        <div className={`flex justify-center gap-8 pt-8 text-gray-300 transition-all duration-700 delay-500 ${
                            ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-green-400" />
                                <span>100% Sécurisé</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />
                                <span>Livraison 24h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-400" />
                                <span>Authentifié</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}