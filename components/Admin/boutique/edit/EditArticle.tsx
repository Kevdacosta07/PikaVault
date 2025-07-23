"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faSave,
    faSpinner,
    faCheckCircle,
    faExclamationTriangle,
    faImage,
    faEuroSign,
    faBoxOpen,
    faTag,
    faFileText,
    faChevronLeft,
    faShieldAlt,
    faStar,
    faGem,
    faCloudUploadAlt,
    faExpand
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Schéma de validation Zod
const articleSchema = z.object({
    id: z.string(),
    title: z.string().min(4, "Le titre doit posséder 4 caractères minimum").max(25, "Le titre ne doit pas excéder 25 caractères"),
    description: z.string().min(20, "La description doit contenir au minimum 20 caractères"),
    type: z.string().min(1, "Veuillez choisir un type d'objet"),
    price: z.preprocess((val) => Number(val), z.number().positive("Le prix doit être supérieur à 0").max(999999, "Prix trop élevé")),
    amount: z.preprocess((val) => Number(val), z.number().int("Le stock doit être un entier").nonnegative("Le stock ne peut être négatif")),
    edition: z.string().nullable().optional(),
    image: z.string().min(1, "Une image est obligatoire"),
}).refine((data) => {
    if (data.type !== "accessoires" && data.type !== "exclusivites") {
        return data.edition !== undefined && data.edition !== null && data.edition.trim() !== "";
    }
    return true;
}, {
    message: "L'édition est obligatoire pour cet objet",
    path: ["edition"],
});

type ArticleFormData = z.infer<typeof articleSchema>;

// Configuration des types
const typeConfig = {
    card: {
        label: "Cartes Pokémon",
        icon: faGem,
        color: "from-purple-500 to-pink-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
        description: "Cartes individuelles rares et communes"
    },
    booster: {
        label: "Boosters",
        icon: faBoxOpen,
        color: "from-orange-500 to-red-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        description: "Paquets de cartes surprises"
    },
    accessoires: {
        label: "Accessoires",
        icon: faShieldAlt,
        color: "from-green-500 to-emerald-600",
        bg: "bg-green-50",
        border: "border-green-200",
        description: "Protèges, deck boxes, tapis..."
    },
    exclusivites: {
        label: "Exclusivités",
        icon: faStar,
        color: "from-yellow-500 to-orange-500",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        description: "Articles limités et spéciaux"
    }
};

// Éditions disponibles
const editions = [
    "Base Set", "Jungle", "Fossil", "Team Rocket", "Gym Heroes",
    "Gym Challenge", "Neo Genesis", "Neo Discovery", "Neo Destiny",
    "Neo Revelation", "Expedition", "Aquapolis", "Skyridge",
    "EX Ruby & Sapphire", "EX Sandstorm", "EX Dragon",
    "Diamond & Pearl", "Platinum", "HeartGold & SoulSilver",
    "Black & White", "XY", "Sun & Moon", "Sword & Shield",
    "Scarlet & Violet", "Pokémon GO", "Celebrations", "Hidden Fates"
];

export default function EditArticleForm({ article }: { article: ArticleFormData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: article,
    });

    useEffect(() => {
        if (article) {
            reset(article);
            setPreviewImage(article.image);
        }
    }, [article, reset]);

    const selectedType = watch("type");
    watch("image");
    const onSubmit = async (data: ArticleFormData) => {
        if (data.edition === null) {
            data.edition = undefined;
        }

        setStatus('loading');
        setIsLoading(true);

        try {
            const response = await fetch(`/api/article/update/${article.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour");

            setStatus('success');
            setTimeout(() => router.push("/admin/articles"), 2000);
        } catch (error) {
            setStatus('error');
            console.error(error);
            setTimeout(() => setStatus('idle'), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    // Upload d'image
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-xl border-b border-indigo-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/articles">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <span>Retour</span>
                                </motion.button>
                            </Link>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FontAwesomeIcon icon={faEdit} className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-orange-900 to-red-900 bg-clip-text text-transparent">
                                        Modifier l&#39;article
                                    </h1>
                                    <p className="text-lg text-gray-600 font-medium mt-1">
                                        Modifiez les informations de votre produit
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status indicator */}
                        <AnimatePresence>
                            {status !== 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className={clsx(
                                        "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold shadow-lg",
                                        status === 'loading' && "bg-blue-100 text-blue-800",
                                        status === 'success' && "bg-green-100 text-green-800",
                                        status === 'error' && "bg-red-100 text-red-800"
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
                                        {status === 'loading' && "Mise à jour en cours..."}
                                        {status === 'success' && "Article mis à jour !"}
                                        {status === 'error' && "Erreur de mise à jour"}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Formulaire */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Section Type d'article */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className={clsx(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                errors.type ? "bg-red-500" : "bg-gradient-to-r from-purple-500 to-pink-600"
                            )}>
                                <FontAwesomeIcon icon={faTag} className="text-white text-lg" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Catégorie de l&#39;article</h2>
                                <p className="text-gray-600">Sélectionnez le type de produit</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            {Object.entries(typeConfig).map(([key, config]) => (
                                <motion.button
                                    key={key}
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setValue("type", key);
                                        if (key === "exclusivites" || key === "accessoires") {
                                            setValue("edition", undefined);
                                        }
                                    }}
                                    className={clsx(
                                        "p-6 rounded-2xl border-2 transition-all duration-300 text-left",
                                        selectedType === key
                                            ? `bg-gradient-to-r ${config.color} text-white border-transparent shadow-xl`
                                            : `${config.bg} ${config.border} hover:border-gray-300 hover:shadow-lg`
                                    )}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <FontAwesomeIcon
                                            icon={config.icon}
                                            className={clsx(
                                                "text-xl",
                                                selectedType === key ? "text-white" : "text-gray-600"
                                            )}
                                        />
                                        <span className={clsx(
                                            "font-bold text-lg",
                                            selectedType === key ? "text-white" : "text-gray-900"
                                        )}>
                                            {config.label}
                                        </span>
                                    </div>
                                    <p className={clsx(
                                        "text-sm",
                                        selectedType === key ? "text-white/80" : "text-gray-600"
                                    )}>
                                        {config.description}
                                    </p>
                                </motion.button>
                            ))}
                        </div>

                        {errors.type && (
                            <p className="text-red-500 text-sm mt-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                {errors.type.message}
                            </p>
                        )}
                    </motion.div>

                    {/* Section Édition (conditionnelle) */}
                    {selectedType && selectedType !== "exclusivites" && selectedType !== "accessoires" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={clsx(
                                    "w-12 h-12 rounded-xl flex items-center justify-center",
                                    errors.edition ? "bg-red-500" : "bg-gradient-to-r from-blue-500 to-indigo-600"
                                )}>
                                    <FontAwesomeIcon icon={faStar} className="text-white text-lg" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Édition</h2>
                                    <p className="text-gray-600">Choisissez l&#39;édition de la carte</p>
                                </div>
                            </div>

                            <select
                                {...register("edition")}
                                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white shadow-lg"
                                disabled={isLoading}
                            >
                                <option value="">Sélectionnez une édition</option>
                                {editions.map((edition) => (
                                    <option key={edition} value={edition}>
                                        {edition}
                                    </option>
                                ))}
                            </select>

                            {errors.edition && (
                                <p className="text-red-500 text-sm mt-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    {errors.edition.message}
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Section Informations générales */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <FontAwesomeIcon icon={faFileText} className="text-white text-lg" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Informations générales</h2>
                                <p className="text-gray-600">Détails du produit</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Titre */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FontAwesomeIcon icon={faTag} className="text-purple-500" />
                                    Titre du produit *
                                </label>
                                <input
                                    {...register("title")}
                                    disabled={isLoading}
                                    placeholder="Ex: Carte Pikachu Holo Rare"
                                    className={clsx(
                                        "w-full px-4 py-4 text-lg border-2 rounded-2xl transition-all duration-200 bg-white shadow-lg",
                                        errors.title
                                            ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                            : "border-gray-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500"
                                    )}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm flex items-center gap-2">
                                        <FontAwesomeIcon icon={faExclamationTriangle} />
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Prix et Stock */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <FontAwesomeIcon icon={faEuroSign} className="text-green-500" />
                                        Prix (CHF) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        {...register("price")}
                                        disabled={isLoading}
                                        placeholder="0.00"
                                        className={clsx(
                                            "w-full px-4 py-4 text-lg border-2 rounded-2xl transition-all duration-200 bg-white shadow-lg",
                                            errors.price
                                                ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                                : "border-gray-200 focus:ring-4 focus:ring-green-500/20 focus:border-green-500"
                                        )}
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm flex items-center gap-2">
                                            <FontAwesomeIcon icon={faExclamationTriangle} />
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <FontAwesomeIcon icon={faBoxOpen} className="text-blue-500" />
                                        Stock *
                                    </label>
                                    <input
                                        type="number"
                                        {...register("amount")}
                                        disabled={isLoading}
                                        placeholder="0"
                                        className={clsx(
                                            "w-full px-4 py-4 text-lg border-2 rounded-2xl transition-all duration-200 bg-white shadow-lg",
                                            errors.amount
                                                ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                                : "border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                                        )}
                                    />
                                    {errors.amount && (
                                        <p className="text-red-500 text-sm flex items-center gap-2">
                                            <FontAwesomeIcon icon={faExclamationTriangle} />
                                            {errors.amount.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 mt-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <FontAwesomeIcon icon={faFileText} className="text-indigo-500" />
                                Description détaillée *
                            </label>
                            <textarea
                                {...register("description")}
                                disabled={isLoading}
                                rows={6}
                                placeholder="Décrivez en détail votre produit, son état, ses particularités..."
                                className={clsx(
                                    "w-full px-4 py-4 text-lg border-2 rounded-2xl transition-all duration-200 bg-white shadow-lg resize-none",
                                    errors.description
                                        ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                                        : "border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500"
                                )}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm flex items-center gap-2">
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* Section Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className={clsx(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                errors.image ? "bg-red-500" : "bg-gradient-to-r from-orange-500 to-red-600"
                            )}>
                                <FontAwesomeIcon icon={faImage} className="text-white text-lg" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Image du produit</h2>
                                <p className="text-gray-600">Photo haute qualité recommandée</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Aperçu de l'image */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Aperçu actuel</h3>
                                {previewImage ? (
                                    <div className="relative group">
                                        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
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
                                            className="absolute top-3 right-3 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faExpand} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
                                            <p>Aucune image</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Changer l&#39;image</h3>
                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={isLoading || isUploadingImage}
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                                                <FontAwesomeIcon
                                                    icon={isUploadingImage ? faSpinner : faCloudUploadAlt}
                                                    className={clsx(
                                                        "text-2xl text-orange-600",
                                                        isUploadingImage && "animate-spin"
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {isUploadingImage ? "Upload en cours..." : "Cliquez pour changer l'image"}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    PNG, JPG jusqu&#39;à 5MB
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {errors.image && (
                                    <p className="text-red-500 text-sm flex items-center gap-2">
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
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/admin/articles">
                            <button
                                type="button"
                                className="w-full sm:w-auto px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-2xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                            >
                                Annuler
                            </button>
                        </Link>

                        <motion.button
                            type="submit"
                            disabled={isLoading || isUploadingImage}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className={clsx(
                                "w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3",
                                isLoading
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                            )}
                        >
                            <FontAwesomeIcon
                                icon={isLoading ? faSpinner : faSave}
                                className={isLoading ? "animate-spin" : ""}
                            />
                            <span>
                                {isLoading ? "Mise à jour..." : "Enregistrer les modifications"}
                            </span>
                        </motion.button>
                    </motion.div>
                </form>
            </div>
        </div>
    );
}