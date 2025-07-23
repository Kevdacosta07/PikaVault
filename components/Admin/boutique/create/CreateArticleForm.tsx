"use client";

import React, { useState, useRef } from "react";
import { createArticle } from "@/actions/ArticleActions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faPlus,
    faSpinner,
    faCheckCircle,
    faExclamationTriangle,
    faImage,
    faEuroSign,
    faBoxOpen,
    faTag,
    faFileText,
    faStar,
    faGem,
    faShieldAlt,
    faCloudUploadAlt,
    faExpand,
    faPalette,
    faBolt,
    faCrown,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Schéma de validation avec Zod
const articleSchema = z.object({
    title: z.string()
        .min(4, "Le titre doit posséder 4 caractères minimum")
        .max(25, "Le titre ne doit pas excéder 25 caractères"),

    description: z.string().min(20, "La description doit contenir au minimum 20 caractères"),

    type: z.string().min(1, "Veuillez choisir un type d'objet"),

    price: z.preprocess((val) => Number(val),
        z.number()
            .positive("Le prix doit être supérieur à 0")
            .max(999999, "Le prix ne doit pas dépasser 6 chiffres")
    ),

    amount: z.preprocess((val) => Number(val),
        z.number()
            .int("Le stock doit être un entier")
            .positive("Le stock doit être un nombre positif")
            .max(999999, "Le stock ne doit pas dépasser 6 chiffres")
    ),

    edition: z.string().optional(),

    image: z.string().min(1, "Une image est obligatoire"),
}).refine((data) => ({
    ...data,
    imageUrl: data.image
})).refine((data) => {
    if (data.type !== "accessoires" && data.type !== "exclusivites") {
        return data.edition !== undefined && data.edition.trim() !== "";
    }
    return true;
}, {
    message: "L'édition est obligatoire pour cet objet",
    path: ["edition"],
});

type ArticleFormData = z.infer<typeof articleSchema>;

// Configuration des types avec design moderne
const typeConfig = {
    card: {
        label: "Cartes",
        icon: faGem,
        gradient: "from-violet-600 via-purple-600 to-indigo-700",
        hoverGradient: "from-violet-500 via-purple-500 to-indigo-600",
        shadowColor: "shadow-violet-500/30",
        glowColor: "shadow-violet-400/50",
        description: "Cartes individuelles et rares",
        emoji: "💎"
    },
    booster: {
        label: "Boosters",
        icon: faBoxOpen,
        gradient: "from-orange-600 via-red-600 to-pink-700",
        hoverGradient: "from-orange-500 via-red-500 to-pink-600",
        shadowColor: "shadow-orange-500/30",
        glowColor: "shadow-orange-400/50",
        description: "Paquets et boîtes",
        emoji: "📦"
    },
    accessoires: {
        label: "Accessoires",
        icon: faShieldAlt,
        gradient: "from-emerald-600 via-green-600 to-teal-700",
        hoverGradient: "from-emerald-500 via-green-500 to-teal-600",
        shadowColor: "shadow-emerald-500/30",
        glowColor: "shadow-emerald-400/50",
        description: "Protections et accessoires",
        emoji: "🛡️"
    },
    exclusivites: {
        label: "Exclusivités",
        icon: faStar,
        gradient: "from-amber-600 via-yellow-600 to-orange-700",
        hoverGradient: "from-amber-500 via-yellow-500 to-orange-600",
        shadowColor: "shadow-amber-500/30",
        glowColor: "shadow-amber-400/50",
        description: "Articles exclusifs",
        emoji: "⭐"
    }
};

// Éditions avec catégories
const editionCategories = {
    "Classiques": ["Base Set", "Jungle", "Fossil", "Team Rocket"],
    "Neo": ["Neo Genesis", "Neo Discovery", "Neo Destiny", "Neo Revelation"],
    "EX": ["EX Ruby & Sapphire", "EX Sandstorm", "EX Dragon"],
    "Modernes": ["Diamond & Pearl", "Platinum", "HeartGold & SoulSilver"],
    "Récentes": ["Black & White", "XY", "Sun & Moon", "Sword & Shield"],
    "Actuelles": ["Scarlet & Violet", "Pokémon GO", "Celebrations"]
};

export default function CreateArticleForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            amount: 0,
            edition: "",
            type: "",
            image: "",
        },
    });

    const selectedType = watch("type");
    const watchedFields = watch();

    const onSubmit = async (data: ArticleFormData) => {
        setStatus('loading');
        setIsLoading(true);

        try {
            await createArticle({
                ...data,
                imageUrl: data.image,
            });
            setStatus('success');
            setTimeout(() => {
                router.push("/admin/articles");
            }, 2000);
        } catch (error) {
            setStatus('error');
            console.error(error);
            setTimeout(() => setStatus('idle'), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    // Upload d'image optimisé
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert("Veuillez sélectionner une image valide");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("L'image doit faire moins de 5MB");
            return;
        }

        setIsUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Erreur upload");

            const imageUrl = await response.json();
            setValue("image", imageUrl);
            setPreviewImage(imageUrl);
        } catch (error) {
            console.error("Erreur upload :", error);
            alert("Erreur lors de l'upload de l'image");
        } finally {
            setIsUploadingImage(false);
        }
    };

    // Vérifier la progression du formulaire
    const getFormProgress = () => {
        let progress = 0;
        if (watchedFields.type) progress += 20;
        if (watchedFields.title && watchedFields.title.length >= 4) progress += 20;
        if (watchedFields.description && watchedFields.description.length >= 20) progress += 20;
        if (watchedFields.price && watchedFields.price > 0) progress += 20;
        if (watchedFields.image) progress += 20;
        return progress;
    };

    const formProgress = getFormProgress();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
            {/* Header avec navigation et titre */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/admin/articles">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                                    <span className="font-medium">Retour</span>
                                </motion.button>
                            </Link>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FontAwesomeIcon icon={faBolt} className="text-white text-xl" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Créer un nouvel article</h1>
                                    <p className="text-gray-600">Ajoutez un produit à votre boutique</p>
                                </div>
                            </div>
                        </div>

                        {/* Indicateur de progression */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600">Progression</span>
                                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${formProgress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <span className="text-sm font-bold text-indigo-600">{formProgress}%</span>
                            </div>

                            {/* Status indicator */}
                            <AnimatePresence>
                                {status !== 'idle' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className={clsx(
                                            "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm",
                                            status === 'loading' && "bg-blue-100 text-blue-700",
                                            status === 'success' && "bg-green-100 text-green-700",
                                            status === 'error' && "bg-red-100 text-red-700"
                                        )}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                status === 'loading' ? faSpinner :
                                                    status === 'success' ? faCheckCircle :
                                                        faExclamationTriangle
                                            }
                                            className={status === 'loading' ? "animate-spin" : ""}
                                        />
                                        <span>
                                            {status === 'loading' && "Création..."}
                                            {status === 'success' && "Créé !"}
                                            {status === 'error' && "Erreur"}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Section 1: Type de produit */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <FontAwesomeIcon icon={faPalette} className="text-white text-xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Catégorie du produit</h2>
                                <p className="text-gray-600 text-lg">Sélectionnez le type d'article que vous souhaitez ajouter</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Object.entries(typeConfig).map(([key, config]) => (
                                <motion.button
                                    key={key}
                                    type="button"
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setValue("type", key);
                                        if (key === "exclusivites" || key === "accessoires") {
                                            setValue("edition", undefined);
                                        }
                                    }}
                                    className={clsx(
                                        "relative p-8 rounded-3xl border-2 transition-all duration-300 group",
                                        selectedType === key
                                            ? `bg-gradient-to-br ${config.gradient} text-white border-transparent shadow-2xl ${config.glowColor}`
                                            : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-xl text-gray-700"
                                    )}
                                >
                                    <div className="text-center space-y-4">
                                        <div className="text-4xl mb-3">{config.emoji}</div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-2">{config.label}</h3>
                                            <p className={clsx(
                                                "text-sm",
                                                selectedType === key ? "text-white/90" : "text-gray-500"
                                            )}>
                                                {config.description}
                                            </p>
                                        </div>
                                    </div>

                                    {selectedType === key && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                                        >
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {errors.type && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm mt-6 flex items-center gap-2 bg-red-50 p-4 rounded-xl"
                            >
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                {errors.type.message}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Section 2: Édition (conditionnelle) */}
                    {selectedType && selectedType !== "exclusivites" && selectedType !== "accessoires" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FontAwesomeIcon icon={faCrown} className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Édition de la carte</h2>
                                    <p className="text-gray-600 text-lg">Sélectionnez l'édition correspondante</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {Object.entries(editionCategories).map(([category, editions]) => (
                                    <div key={category}>
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            {category}
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {editions.map((edition) => (
                                                <motion.button
                                                    key={edition}
                                                    type="button"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setValue("edition", edition)}
                                                    className={clsx(
                                                        "p-4 rounded-xl text-left transition-all duration-200 text-sm font-medium",
                                                        watch("edition") === edition
                                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                                                            : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300"
                                                    )}
                                                >
                                                    {edition}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errors.edition && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-sm mt-6 flex items-center gap-2 bg-red-50 p-4 rounded-xl"
                                >
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    {errors.edition.message}
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {/* Section 3: Informations du produit */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <FontAwesomeIcon icon={faFileText} className="text-white text-xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Informations du produit</h2>
                                <p className="text-gray-600 text-lg">Détails et caractéristiques de votre article</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Titre */}
                            <div className="lg:col-span-2 space-y-4">
                                <label className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                    <FontAwesomeIcon icon={faTag} className="text-purple-500" />
                                    Nom du produit
                                </label>
                                <input
                                    {...register("title")}
                                    disabled={isLoading}
                                    placeholder="Ex: Pikachu Illustrator PSA 10"
                                    className={clsx(
                                        "w-full px-6 py-4 text-lg rounded-2xl border-2 transition-all duration-200 bg-white",
                                        errors.title
                                            ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                            : "border-gray-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500"
                                    )}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl">
                                        <FontAwesomeIcon icon={faExclamationTriangle} />
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Prix et Stock */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                        <FontAwesomeIcon icon={faEuroSign} className="text-green-500" />
                                        Prix (CHF)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        {...register("price")}
                                        disabled={isLoading}
                                        placeholder="0.00"
                                        className={clsx(
                                            "w-full px-6 py-4 text-lg rounded-2xl border-2 transition-all duration-200 bg-white",
                                            errors.price
                                                ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                                : "border-gray-200 focus:ring-4 focus:ring-green-500/20 focus:border-green-500"
                                        )}
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl">
                                            <FontAwesomeIcon icon={faExclamationTriangle} />
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                        <FontAwesomeIcon icon={faBoxOpen} className="text-blue-500" />
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        {...register("amount")}
                                        disabled={isLoading}
                                        placeholder="0"
                                        className={clsx(
                                            "w-full px-6 py-4 text-lg rounded-2xl border-2 transition-all duration-200 bg-white",
                                            errors.amount
                                                ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                                : "border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                                        )}
                                    />
                                    {errors.amount && (
                                        <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl">
                                            <FontAwesomeIcon icon={faExclamationTriangle} />
                                            {errors.amount.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-8 space-y-4">
                            <label className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                <FontAwesomeIcon icon={faFileText} className="text-indigo-500" />
                                Description détaillée
                            </label>
                            <textarea
                                {...register("description")}
                                disabled={isLoading}
                                rows={6}
                                placeholder="Décrivez votre produit de manière détaillée..."
                                className={clsx(
                                    "w-full px-6 py-4 text-lg rounded-2xl border-2 transition-all duration-200 bg-white resize-none",
                                    errors.description
                                        ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                        : "border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500"
                                )}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl">
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* Section 4: Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <FontAwesomeIcon icon={faImage} className="text-white text-xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Image du produit</h2>
                                <p className="text-gray-600 text-lg">Photo haute résolution de votre article</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Aperçu */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900">Aperçu</h3>
                                {previewImage ? (
                                    <div className="relative group">
                                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-lg">
                                            <Image
                                                src={previewImage}
                                                alt="Aperçu"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => window.open(previewImage, '_blank')}
                                            className="absolute top-4 right-4 w-12 h-12 bg-black/70 hover:bg-black/80 text-white rounded-2xl flex items-center justify-center transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faExpand} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            <FontAwesomeIcon icon={faImage} className="text-6xl mb-4" />
                                            <p className="text-lg font-medium">Aucune image sélectionnée</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Upload */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900">Ajouter une image</h3>
                                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-orange-400 transition-colors">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={isLoading || isUploadingImage}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full"
                                        disabled={isLoading || isUploadingImage}
                                    >
                                        <div className="space-y-6">
                                            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl flex items-center justify-center mx-auto">
                                                <FontAwesomeIcon
                                                    icon={isUploadingImage ? faSpinner : faCloudUploadAlt}
                                                    className={clsx(
                                                        "text-3xl text-orange-600",
                                                        isUploadingImage && "animate-spin"
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-gray-900 mb-2">
                                                    {isUploadingImage ? "Upload en cours..." : "Sélectionner une image"}
                                                </p>
                                                <p className="text-gray-600">
                                                    PNG, JPG jusqu'à 5MB
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                {errors.image && (
                                    <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl">
                                        <FontAwesomeIcon icon={faExclamationTriangle} />
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Boutons d'action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                    >
                        <Link href="/admin/articles">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-bold text-lg transition-all duration-200"
                            >
                                Annuler
                            </motion.button>
                        </Link>

                        <motion.button
                            type="submit"
                            disabled={isLoading || isUploadingImage || formProgress < 100}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className={clsx(
                                "w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg",
                                isLoading || formProgress < 100
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50"
                            )}
                        >
                            <FontAwesomeIcon
                                icon={isLoading ? faSpinner : faPlus}
                                className={isLoading ? "animate-spin" : ""}
                            />
                            <span>
                                {isLoading ? "Création en cours..." : "Créer l'article"}
                            </span>
                        </motion.button>
                    </motion.div>
                </form>
            </div>
        </div>
    );
}