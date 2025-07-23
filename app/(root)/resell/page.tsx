"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faShieldAlt,
    faBolt,
    faCheckCircle,
    faUsers,
    faClock,
    faMoneyBillWave,
    faStar,
    faPhone,
    faQuoteLeft
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// Hook personnalisé pour les animations d'entrée
const useAnimatedEntry = (threshold = 0.1, rootMargin = "0px") => {
    const { ref, inView } = useInView({
        threshold,
        rootMargin,
        triggerOnce: true
    });
    return { ref, inView };
};

export default function ResellPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    // Refs pour chaque section
    const heroRef = useAnimatedEntry(0.1);
    const processRef = useAnimatedEntry(0.2);
    const productsRef = useAnimatedEntry(0.2);
    const testimonialsRef = useAnimatedEntry(0.2);
    const statsRef = useAnimatedEntry(0.2);
    const ctaRef = useAnimatedEntry(0.2);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section avec animations d'entrée */}
            <section ref={heroRef.ref} className="relative bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-24">

                        {/* Contenu principal avec animations échelonnées */}
                        <div className="space-y-8">
                            {/* Badge professionnel - Animation 1 */}
                            <div className={`inline-flex items-center px-4 py-2 bg-green-50 rounded-lg border border-green-200 transition-all duration-700 ${
                                heroRef.inView && isLoaded
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                            }`}>
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                <span className="text-sm font-medium text-green-700">Service de rachat professionnel</span>
                            </div>

                            {/* Titre principal - Animation 2 */}
                            <div className={`space-y-6 transition-all duration-700 delay-200 ${
                                heroRef.inView && isLoaded
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                            }`}>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Vendez vos cartes
                                    <span className="text-green-600 block animate-fade-in-up-delayed"> Pokémon</span>
                                </h1>

                                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                    Obtenez une évaluation professionnelle de votre collection et recevez le meilleur prix du marché en 24h.
                                </p>
                            </div>

                            {/* Statistiques - Animation 3 */}
                            <div className={`flex flex-wrap gap-8 py-6 transition-all duration-700 delay-400 ${
                                heroRef.inView && isLoaded
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                            }`}>
                                <div className="animate-counter-up">
                                    <div className="text-3xl font-bold text-gray-900">€1.2M+</div>
                                    <div className="text-sm text-gray-600">Payé aux collectionneurs</div>
                                </div>
                                <div className="animate-counter-up delay-100">
                                    <div className="text-3xl font-bold text-gray-900">8,000+</div>
                                    <div className="text-sm text-gray-600">Cartes rachetées</div>
                                </div>
                                <div className="animate-counter-up delay-200">
                                    <div className="text-3xl font-bold text-gray-900">24h</div>
                                    <div className="text-sm text-gray-600">Délai d&#34;évaluation</div>
                                </div>
                            </div>

                            {/* Boutons CTA - Animation 4 */}
                            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-600 ${
                                heroRef.inView && isLoaded
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                            }`}>
                                <Link
                                    href="/resell/offers/create"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-bounce-subtle"
                                >
                                    <FontAwesomeIcon icon={faCamera} className="mr-3" />
                                    Commencer l&#34;évaluation
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                                >
                                    <FontAwesomeIcon icon={faPhone} className="mr-3" />
                                    Nous contacter
                                </Link>
                            </div>

                            {/* Garanties professionnelles - Animation 5 */}
                            <div className={`flex flex-wrap gap-6 pt-8 border-t border-gray-200 transition-all duration-700 delay-800 ${
                                heroRef.inView && isLoaded
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                            }`}>
                                <div className="flex items-center gap-2 text-sm text-gray-600 animate-fade-in-left">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                    <span>Transactions sécurisées</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 animate-fade-in-left delay-100">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />
                                    <span>Évaluation experte</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 animate-fade-in-left delay-200">
                                    <FontAwesomeIcon icon={faBolt} className="text-orange-500" />
                                    <span>Paiement rapide</span>
                                </div>
                            </div>
                        </div>

                        {/* Section image avec animation d'entrée sophistiquée */}
                        <div className={`relative transition-all duration-1000 delay-300 ${
                            heroRef.inView && isLoaded
                                ? 'opacity-100 translate-x-0 scale-100'
                                : 'opacity-0 translate-x-8 scale-95'
                        }`}>
                            <div className="relative bg-gray-50 rounded-2xl p-12 overflow-hidden animate-bg-shift">

                                {/* Animation de couleurs de fond */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100 to-blue-100 animate-pulse-slow"></div>
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-emerald-100 to-cyan-100 animate-pulse-slower"></div>
                                </div>

                                {/* Formes géométriques décoratives */}
                                <div className="absolute top-8 right-8 w-16 h-16 bg-green-200 rounded-full opacity-40 animate-float-in-delayed"></div>
                                <div className="absolute bottom-8 left-8 w-12 h-12 bg-blue-200 rounded-full opacity-40 animate-float-in-delayed-2"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-scale-in"></div>

                                {/* Image de la carte */}
                                <div className={`relative z-10 max-w-xs mx-auto transition-all duration-1000 delay-500 ${
                                    heroRef.inView && isLoaded
                                        ? 'opacity-100 translate-y-0 rotate-0'
                                        : 'opacity-0 translate-y-12 rotate-6'
                                }`}>
                                    <Image
                                        src="/assets/cards/280833.jpg"
                                        alt="Carte Pokémon rare à évaluer"
                                        width={280}
                                        height={390}
                                        className="w-full h-auto object-contain rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
                                        unoptimized
                                        priority
                                    />
                                </div>

                                {/* Badge de confiance */}
                                <div className={`absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 z-20 transition-all duration-700 delay-700 ${
                                    heroRef.inView && isLoaded
                                        ? 'opacity-100 translate-y-0 scale-100'
                                        : 'opacity-0 -translate-y-4 scale-90'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={faStar}
                                                    className={`text-yellow-400 text-sm animate-star-fill`}
                                                    style={{ animationDelay: `${i * 100}ms` }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">4.9/5</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">1,200+ avis clients</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Comment ça marche avec animations */}
            <section ref={processRef.ref} className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">

                    {/* En-tête avec animation */}
                    <div className={`text-center mb-16 transition-all duration-700 ${
                        processRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Comment <span className="text-green-600">ça marche</span> ?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Un processus simple en 3 étapes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Étape 1 - Premier à apparaître */}
                        <div className={`text-center space-y-6 transition-all duration-700 delay-100 ${
                            processRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg transform hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faCamera} className="text-white text-2xl" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 text-white rounded-full flex items-center justify-center text-sm font-bold animate-bounce-subtle">
                                    1
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Photographiez</h3>
                                <p className="text-gray-600">
                                    Prenez des photos de vos cartes et créez votre offre en quelques minutes
                                </p>
                            </div>
                        </div>

                        {/* Étape 2 - Deuxième à apparaître */}
                        <div className={`text-center space-y-6 transition-all duration-700 delay-300 ${
                            processRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg transform hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faClock} className="text-white text-2xl" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 text-white rounded-full flex items-center justify-center text-sm font-bold animate-bounce-subtle delay-200">
                                    2
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Nous évaluons</h3>
                                <p className="text-gray-600">
                                    Nos experts évaluent vos cartes et vous proposent un prix équitable sous 24h
                                </p>
                            </div>
                        </div>

                        {/* Étape 3 - Dernier à apparaître */}
                        <div className={`text-center space-y-6 transition-all duration-700 delay-500 ${
                            processRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg transform hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-white text-2xl" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-400 text-white rounded-full flex items-center justify-center text-sm font-bold animate-bounce-subtle delay-400">
                                    3
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Vous recevez</h3>
                                <p className="text-gray-600">
                                    Acceptez notre offre et recevez votre paiement par virement sécurisé
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Ce que nous rachetons avec animations */}
            <section ref={productsRef.ref} className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">

                    {/* En-tête avec animation */}
                    <div className={`text-center mb-16 transition-all duration-700 ${
                        productsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Que <span className="text-green-600">rachetons-nous</span> ?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Tous vos produits Pokémon ont de la valeur
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cartes - Premier à apparaître (gauche) */}
                        <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 delay-100 ${
                            productsRef.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto transform hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-2xl">🎴</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Cartes Pokémon</h3>
                                <p className="text-gray-600">
                                    Cartes à collectionner, holographiques, rares, éditions limitées, PSA gradées
                                </p>
                                <div className="text-green-600 font-bold">Dès 5 CHF</div>
                            </div>
                        </div>

                        {/* Jeux - Deuxième à apparaître (centre) */}
                        <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 delay-300 ${
                            productsRef.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto transform hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-2xl">🎮</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Jeux Pokémon</h3>
                                <p className="text-gray-600">
                                    Jeux Game Boy, DS, Switch et autres consoles, éditions collector
                                </p>
                                <div className="text-blue-600 font-bold">Dès 20 CHF</div>
                            </div>
                        </div>

                        {/* Objets - Dernier à apparaître (droite) */}
                        <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 delay-500 ${
                            productsRef.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto transform hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-2xl">🧸</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Objets de collection</h3>
                                <p className="text-gray-600">
                                    Figurines, peluches, objets promotionnels et produits dérivés rares
                                </p>
                                <div className="text-red-600 font-bold">Dès 10 CHF</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Témoignages avec animations */}
            <section ref={testimonialsRef.ref} className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">

                    {/* En-tête avec animation */}
                    <div className={`text-center mb-16 transition-all duration-700 ${
                        testimonialsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Ils nous font <span className="text-green-600">confiance</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Découvrez les témoignages de nos clients satisfaits
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Témoignage 1 - Marie L. (gauche) - Deuxième à apparaître */}
                        <div className={`bg-gray-50 rounded-2xl p-8 border-2 border-gray-100 transition-all duration-700 transform hover:scale-105 delay-300 ${
                            testimonialsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">M</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Marie L.</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500 text-sm animate-star-fill" style={{ animationDelay: `${i * 100}ms` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-2 -left-2 text-green-200 text-xl" />
                                    <p className="text-gray-600 italic pl-6">
                                        &#34;Service professionnel et prix équitable. J&#34;ai reçu mon paiement le jour même !&#34;
                                    </p>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-200">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">€1,250</div>
                                        <div className="text-sm text-gray-500">Reçu</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-emerald-600">12 cartes</div>
                                        <div className="text-sm text-gray-500">Vendues</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Témoignage 2 - Thomas K. (centre) - Premier à apparaître */}
                        <div className={`bg-gray-50 rounded-2xl p-8 border-2 border-gray-100 transition-all duration-700 transform hover:scale-105 delay-100 ${
                            testimonialsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">T</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Thomas K.</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500 text-sm animate-star-fill" style={{ animationDelay: `${i * 100}ms` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-2 -left-2 text-green-200 text-xl" />
                                    <p className="text-gray-600 italic pl-6">
                                        &#34;Évaluation rapide en 12h. Process transparent et équipe très professionnelle.&#34;
                                    </p>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-200">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">€890</div>
                                        <div className="text-sm text-gray-500">Reçu</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-emerald-600">Collection</div>
                                        <div className="text-sm text-gray-500">Complète</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Témoignage 3 - Sophie M. (droite) - Dernier à apparaître */}
                        <div className={`bg-gray-50 rounded-2xl p-8 border-2 border-gray-100 transition-all duration-700 transform hover:scale-105 delay-500 ${
                            testimonialsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">S</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Sophie M.</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500 text-sm animate-star-fill" style={{ animationDelay: `${i * 100}ms` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-2 -left-2 text-green-200 text-xl" />
                                    <p className="text-gray-600 italic pl-6">
                                        &#34;Prix équitable et paiement instantané. Je recommande PikaVault !&#34;
                                    </p>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-200">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">€650</div>
                                        <div className="text-sm text-gray-500">Reçu</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-emerald-600">8 objets</div>
                                        <div className="text-sm text-gray-500">Vendus</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Statistiques avec animations */}
            <section ref={statsRef.ref} className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">

                    {/* En-tête avec animation */}
                    <div className={`text-center mb-16 transition-all duration-700 ${
                        statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Nos <span className="text-green-600">résultats</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Des chiffres qui parlent d&apos;eux-mêmes
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: faMoneyBillWave, value: "€1.2M", label: "Payé aux vendeurs", delay: "delay-100" },
                            { icon: faUsers, value: "8K+", label: "Objets rachetés", delay: "delay-200" },
                            { icon: faStar, value: "99%", label: "Clients satisfaits", delay: "delay-300" },
                            { icon: faClock, value: "18h", label: "Délai moyen", delay: "delay-400" }
                        ].map((stat, index) => (
                            <div key={index} className={`text-center transition-all duration-700 transform hover:scale-110 ${stat.delay} ${
                                statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={stat.icon} className="text-white text-2xl" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2 animate-counter-up">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final avec animations */}
            <section ref={ctaRef.ref} className="py-20 bg-gradient-to-br from-green-600 to-emerald-700">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className={`space-y-8 transition-all duration-700 ${
                        ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Prêt à vendre vos cartes ?
                        </h2>

                        <p className="text-xl text-green-100">
                            Rejoignez des milliers de collectionneurs satisfaits
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto transition-all duration-700 delay-300 ${
                            ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <Link
                                href="/resell/offers/create"
                                className="bg-white text-green-700 py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Créer mon offre
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-green-500 text-white py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Nous contacter
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}