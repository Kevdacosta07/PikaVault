"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faCamera,
    faEuroSign,
    faBolt,
    faShieldAlt,
    faCheckCircle,
    faArrowRight,
    faClock,
    faGem,
    faStar,
    faHandHoldingUsd,
    faUpload,
    faMagic,
    faMoneyBillWave,
    faLightbulb,
    faTrophy,
    faFire,
    faRocket,
    faSparkles,
    faHeart,
    faZap,
    faThumbsUp,
    faAward,
    faShoppingBag,
    faGift,
    faUsers,
    faPlusCircle,
    faQuoteLeft,
    faLeaf,
    faGamepad,
    faPhone
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResellPage() {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [statsAnimated, setStatsAnimated] = useState(false);

    const cardsData = [
        {
            id: 1,
            image: "/assets/img/pikachu.png",
            name: "Cartes Pokémon",
            price: "€2,450",
            type: "Collection rare",
            status: "Vendu en 3h",
            profit: "Prix équitable"
        },
        {
            id: 2,
            image: "/assets/img/mew.png",
            name: "Jeux Pokémon",
            price: "€890",
            type: "Jeu vintage",
            status: "Vendu en 2h",
            profit: "Évaluation rapide"
        },
        {
            id: 3,
            image: "/assets/img/lugia.webp",
            name: "Figurines & Objets",
            price: "€650",
            type: "Objets de collection",
            status: "Vendu en 1h",
            profit: "Paiement rapide"
        }
    ];

    const testimonials = [
        {
            name: "Marie L.",
            avatar: "/assets/img/default-profile.png",
            rating: 5,
            text: "J'ai vendu ma collection Pokémon en 24h ! PikaVault offre un service professionnel et des prix équitables.",
            amount: "€2,340",
            items: "15 cartes"
        },
        {
            name: "Thomas K.",
            avatar: "/assets/img/default-profile.png",
            rating: 5,
            text: "Service ultra-rapide et transparent. Mes jeux ont été évalués en 2h et j'ai reçu mon paiement le jour même !",
            amount: "€890",
            items: "8 jeux"
        },
        {
            name: "Sophie M.",
            avatar: "/assets/img/default-profile.png",
            rating: 5,
            text: "Prix équitable et paiement instantané. Je recommande PikaVault à tous les collectionneurs !",
            amount: "€1,250",
            items: "Collection complète"
        }
    ];

    const features = [
        {
            icon: faRocket,
            title: "Évaluation Express",
            description: "Notre équipe d'experts évalue vos objets Pokémon en moins de 24 heures",
            color: "from-green-500 to-emerald-500",
            bgColor: "from-green-50 to-emerald-50"
        },
        {
            icon: faTrophy,
            title: "Prix Équitables",
            description: "Nous proposons des prix justes basés sur la valeur réelle du marché",
            color: "from-green-600 to-teal-600",
            bgColor: "from-green-50 to-teal-50"
        },
        {
            icon: faShieldAlt,
            title: "100% Sécurisé",
            description: "Paiement garanti sous 24h après acceptation, transactions cryptées",
            color: "from-emerald-500 to-green-500",
            bgColor: "from-emerald-50 to-green-50"
        },
        {
            icon: faZap,
            title: "Service Premium",
            description: "Support dédié et suivi personnalisé de votre dossier de vente",
            color: "from-teal-500 to-green-500",
            bgColor: "from-teal-50 to-green-50"
        }
    ];

    const processSteps = [
        {
            step: "01",
            icon: faCamera,
            title: "Soumettez votre collection",
            description: "Créez une offre avec photos et description détaillée de vos cartes, jeux ou objets Pokémon.",
            color: "from-green-600 to-emerald-600"
        },
        {
            step: "02",
            icon: faMagic,
            title: "Évaluation par nos experts",
            description: "Notre équipe spécialisée évalue votre collection et vous propose un prix équitable sous 24h.",
            color: "from-emerald-600 to-teal-600"
        },
        {
            step: "03",
            icon: faMoneyBillWave,
            title: "Paiement sécurisé",
            description: "Acceptez notre offre et recevez votre paiement par virement bancaire sécurisé.",
            color: "from-teal-600 to-green-600"
        }
    ];

    const acceptedItems = [
        {
            icon: faGift,
            title: "Cartes Pokémon",
            description: "Cartes à collectionner, holographiques, rares, éditions limitées",
            examples: ["Cartes Base Set", "Cartes EX/GX", "Cartes japonaises", "Cartes promo"]
        },
        {
            icon: faGamepad,
            title: "Jeux Pokémon",
            description: "Jeux vidéo Game Boy, DS, Switch et autres consoles",
            examples: ["Pokémon Rouge/Bleu", "Pokémon Diamant/Perle", "Pokémon Épée/Bouclier", "Éditions spéciales"]
        },
        {
            icon: faGift,
            title: "Objets de collection",
            description: "Figurines, peluches, objets promotionnels et produits dérivés",
            examples: ["Figurines Tomy", "Peluches officielles", "Objets promo", "Accessoires rares"]
        }
    ];

    // Animation automatique des cartes
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCardIndex((prev) => (prev + 1) % cardsData.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [cardsData.length]);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setStatsAnimated(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Arrière-plan avec thème vert */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.3),transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.2),transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.2),transparent)]"></div>
                </div>

                {/* Particules vertes flottantes */}
                <div className="absolute inset-0">
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-green-400 rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                x: [0, Math.random() * 10 - 5, 0],
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Contenu principal */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="text-center lg:text-left space-y-8"
                        >
                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-6 py-3 shadow-lg"
                            >
                                <FontAwesomeIcon icon={faLeaf} className="mr-3 animate-pulse" />
                                <span className="font-bold">Rachat immédiat par PikaVault</span>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                                    Vendez votre
                                    <br />
                                    <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                        collection Pokémon
                                    </span>
                                    <br />
                                    <span className="text-3xl lg:text-4xl font-light text-gray-300">
                                        directement à PikaVault
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className="text-xl lg:text-2xl text-gray-300 leading-relaxed"
                            >
                                <strong className="text-green-400">Cartes</strong>, <strong className="text-emerald-400">jeux</strong>, <strong className="text-teal-400">objets de collection</strong> - Nous rachetons tout l'univers Pokémon au prix juste.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <Link
                                    href="/resell/offers/create"
                                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative flex items-center justify-center gap-3">
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                        Créer une offre
                                        <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>

                                <Link
                                    href="/contact"
                                    className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <FontAwesomeIcon icon={faPhone} />
                                    Nous contacter
                                </Link>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6"
                            >
                                {[
                                    { icon: faShieldAlt, text: "Transactions sécurisées", color: "text-green-400" },
                                    { icon: faBolt, text: "Évaluation sous 24h", color: "text-emerald-400" },
                                    { icon: faUsers, text: "Service personnalisé", color: "text-teal-400" }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={item.icon} className={`${item.color} text-lg`} />
                                        <span className="text-gray-300 font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Carousel de cartes */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative h-[600px] flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeCardIndex}
                                        initial={{ rotateY: 90, opacity: 0 }}
                                        animate={{ rotateY: 0, opacity: 1 }}
                                        exit={{ rotateY: -90, opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="relative"
                                    >
                                        <div className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-sm">
                                            <div className="relative bg-white rounded-2xl p-4 shadow-xl border-2 border-green-200">
                                                <Image
                                                    src={cardsData[activeCardIndex].image}
                                                    alt={cardsData[activeCardIndex].name}
                                                    width={280}
                                                    height={280}
                                                    className="w-full h-auto rounded-xl"
                                                    unoptimized
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-100/30 to-transparent rounded-xl opacity-50" />
                                            </div>

                                            {/* Badge prix */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                                                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl shadow-xl"
                                            >
                                                <div className="text-center">
                                                    <div className="text-xs font-medium opacity-90">Racheté</div>
                                                    <div className="text-lg font-bold">{cardsData[activeCardIndex].price}</div>
                                                    <div className="text-xs text-green-200 font-bold">{cardsData[activeCardIndex].profit}</div>
                                                </div>
                                            </motion.div>

                                            {/* Badge statut */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                                            >
                                                <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                                                {cardsData[activeCardIndex].status}
                                            </motion.div>

                                            {/* Badge type */}
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                                            >
                                                <FontAwesomeIcon icon={faGem} className="mr-1" />
                                                {cardsData[activeCardIndex].type}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Indicateurs */}
                            <div className="flex justify-center mt-8 space-x-3">
                                {cardsData.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setActiveCardIndex(index)}
                                        className={`h-3 rounded-full transition-all duration-300 ${
                                            index === activeCardIndex
                                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 w-8 shadow-lg'
                                                : 'bg-white/30 hover:bg-white/50 w-3'
                                        }`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>

                            {/* Stats en temps réel */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-8 grid grid-cols-3 gap-4 text-center"
                            >
                                {[
                                    { value: "€25K", label: "Racheté ce mois", color: "from-green-400 to-emerald-400" },
                                    { value: "180", label: "Offres traitées", color: "from-emerald-400 to-teal-400" },
                                    { value: "12h", label: "Temps moyen", color: "from-teal-400 to-green-400" }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                    >
                                        <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-300 text-sm">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section Objets Acceptés */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Que <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">rachetons-nous</span> ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Nous sommes spécialisés dans le rachat de tous les produits Pokémon
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {acceptedItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-full"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-green-100 group-hover:border-green-200 h-full flex flex-col">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <FontAwesomeIcon icon={item.icon} className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                                    <p className="text-gray-600 text-center mb-6 leading-relaxed flex-grow">{item.description}</p>

                                    <div className="space-y-2 mt-auto">
                                        <h4 className="font-semibold text-green-700 text-sm uppercase tracking-wide">Exemples :</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {item.examples.map((example, i) => (
                                                <div key={i} className="bg-green-50 rounded-lg px-3 py-2 text-sm text-green-800 font-medium">
                                                    {example}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Fonctionnalités */}
            <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent)]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Pourquoi choisir <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">PikaVault</span> ?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            La solution de confiance pour vendre vos objets Pokémon
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/20">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <FontAwesomeIcon icon={feature.icon} className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                                    <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Processus - CORRIGÉE */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Comment <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">ça marche</span> ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Un processus simple et transparent pour vendre votre collection
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative group"
                                >
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                                        <div className="text-center flex-grow">
                                            <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                <FontAwesomeIcon icon={step.icon} className="text-white text-2xl" />
                                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                    {step.step}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Connecteurs repositionnés */}
                        <div className="hidden lg:block absolute top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2">
                            <div className="flex items-center">
                                <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full -ml-1.5"></div>
                            </div>
                        </div>
                        <div className="hidden lg:block absolute top-1/2 right-1/3 transform -translate-y-1/2 translate-x-1/2">
                            <div className="flex items-center">
                                <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                                <div className="w-3 h-3 bg-emerald-400 rounded-full -ml-1.5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Témoignages */}
            <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Ils nous font <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">confiance</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez les témoignages de nos clients satisfaits
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-100 h-full flex flex-col"
                            >
                                <div className="flex items-center mb-6">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <div className="flex items-center gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} className="text-green-500 text-sm" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex-grow">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-2 -left-2 text-green-200 text-2xl" />
                                    <p className="text-gray-600 italic mb-6 pl-6">{testimonial.text}</p>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{testimonial.amount}</div>
                                        <div className="text-sm text-gray-500">Montant reçu</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-emerald-600">{testimonial.items}</div>
                                        <div className="text-sm text-gray-500">Objets vendus</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Statistiques */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Nos <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">résultats</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Des chiffres qui témoignent de notre fiabilité
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: "€1.2M", label: "Payé aux vendeurs", icon: faMoneyBillWave, color: "from-green-500 to-emerald-500" },
                            { value: "8K+", label: "Objets rachetés", icon: faShoppingBag, color: "from-emerald-500 to-teal-500" },
                            { value: "99%", label: "Clients satisfaits", icon: faHeart, color: "from-teal-500 to-green-500" },
                            { value: "18h", label: "Délai moyen", icon: faClock, color: "from-green-600 to-emerald-600" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <FontAwesomeIcon icon={stat.icon} className="text-white text-2xl" />
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white rounded-full px-6 py-3 shadow-lg">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-3 text-green-200" />
                            <span className="font-bold">Service professionnel depuis 2020</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                            Prêt à vendre votre
                            <br />
                            <span className="text-green-200">collection Pokémon</span> ?
                        </h2>

                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Rejoignez les milliers de collectionneurs qui ont fait confiance à PikaVault pour{' '}
                            <strong className="text-green-200">vendre leurs objets Pokémon</strong> au prix juste.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                            <Link
                                href="/resell/offers/create"
                                className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-full font-black text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center gap-3">
                                    <FontAwesomeIcon icon={faRocket} />
                                    Créer une offre
                                    <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>

                            <Link
                                href="/contact"
                                className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <FontAwesomeIcon icon={faPhone} />
                                Une question ?
                            </Link>
                        </div>

                        <div className="flex justify-center items-center gap-6 pt-6">
                            {[
                                { icon: faShieldAlt, text: "Paiement sécurisé" },
                                { icon: faCheckCircle, text: "Évaluation gratuite" },
                                { icon: faBolt, text: "Processus rapide" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={item.icon} className="text-white text-lg" />
                                    <span className="text-white font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}