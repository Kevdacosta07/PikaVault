"use client";

import { useState, useRef } from "react";
import { updateOffer } from "@/actions/OfferAction";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faUpload,
    faEdit,
    faEuroSign,
    faTag,
    faFileText,
    faImages,
    faSpinner,
    faCheckCircle,
    faExclamationTriangle,
    faSave,
    faCamera,
    faExpand,
    faBolt
} from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import Image from "next/image";

const offerSchema = z.object({
    id: z.string(),
    title: z.string().min(3, "Le titre doit contenir au moins 3 caractères."),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
    price: z.number().positive("Le prix doit être supérieur à 0."),
    image: z.array(z.string()).min(1, "Ajoutez au moins une image."),
});

type OfferFormData = z.infer<typeof offerSchema>;

export default function UpdateOfferForm({ offer, user_id }: { offer: OfferFormData; user_id: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<OfferFormData>({
        id: offer.id || "",
        title: offer.title || "",
        description: offer.description || "",
        price: offer.price || 0,
        image: offer.image || [],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imageUrls, setImageUrls] = useState<string[]>(offer.image || []);
    const [buttonText, setButtonText] = useState("Mettre à jour");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // État pour la modal d'image
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setButtonText("Sauvegarde...");

        try {
            const parsedData = offerSchema.parse({ ...formData, image: imageUrls });
            await updateOffer({ ...parsedData, id: offer.id, user_id });
            setButtonText("Sauvegardé ⚡");
            setTimeout(() => redirect(`/resell/offers/${user_id}`), 1500);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    formattedErrors[err.path[0]] = err.message;
                });
                setErrors(formattedErrors);
            } else {
                console.error("Erreur lors de la modification :", error);
                setErrors((prev) => ({ ...prev, global: "Une erreur est survenue." }));
            }
            setButtonText("Mettre à jour");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = name === "price" ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        try {
            offerSchema.shape[name as keyof OfferFormData].parse(newValue);
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
            }
        }
    };

    const handleFiles = async (files: FileList) => {
        setIsUploadingImage(true);
        const uploadedUrls: string[] = [];

        for (const file of files) {
            const data = new FormData();
            data.append("file", file);

            try {
                const response = await fetch("/api/files", {
                    method: "POST",
                    body: data,
                });

                if (!response.ok) {
                    throw new Error("Échec de l'upload");
                }

                const url = await response.json();
                uploadedUrls.push(url);
            } catch (error) {
                console.error("Erreur lors de l'upload :", error);
            }
        }

        setImageUrls((prev) => [...prev, ...uploadedUrls]);
        setFormData((prev) => ({
            ...prev,
            image: [...prev.image, ...uploadedUrls],
        }));

        setIsUploadingImage(false);
    };

    const handleRemoveImage = (index: number) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
        setFormData((prevState) => ({
            ...prevState,
            image: prevState.image.filter((_, i) => i !== index),
        }));
    };

    const openImageModal = (url: string, index: number) => {
        setSelectedImage(url);
        setSelectedImageIndex(index);
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
        setSelectedImage("");
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        const newIndex = direction === 'prev'
            ? (selectedImageIndex - 1 + imageUrls.length) % imageUrls.length
            : (selectedImageIndex + 1) % imageUrls.length;

        setSelectedImageIndex(newIndex);
        setSelectedImage(imageUrls[newIndex]);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
                {/* Effets de fond Pikachu */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute top-60 right-20 w-24 h-24 bg-orange-300/20 rounded-full blur-xl animate-pulse [animation-delay:1s]"></div>
                    <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl animate-pulse [animation-delay:2s]"></div>
                    <div className="absolute top-1/3 right-10 text-6xl text-yellow-400/20 animate-bounce [animation-delay:0.5s]">⚡</div>
                    <div className="absolute bottom-1/4 left-10 text-4xl text-orange-400/20 animate-bounce [animation-delay:1.5s]">⚡</div>
                </div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">

                    {/* Header thème Pikachu */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                <FontAwesomeIcon icon={faEdit} className="text-white text-lg" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Modifier votre offre
                                    <span className="text-yellow-600"> ⚡</span>
                                </h1>
                                <p className="text-gray-600">Améliorez votre annonce comme un vrai dresseur !</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Container thème Pikachu */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-yellow-200/50 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>

                        <form onSubmit={handleSubmit} className="p-8">

                            {/* Images Section thème Pikachu */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faImages} className="text-yellow-600" />
                                    Photos de vos cartes
                                    <span className="text-yellow-500">⚡</span>
                                </h2>

                                {/* Upload Area thème Pikachu */}
                                <div
                                    className="border-2 border-dashed border-yellow-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-yellow-50/50 transition-all duration-300 bg-gradient-to-br from-yellow-50/30 to-orange-50/30"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg hover:scale-105 transition-transform">
                                            <FontAwesomeIcon icon={faCamera} className="text-white text-2xl" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            Ajoutez vos photos ⚡
                                        </h3>
                                        <p className="text-yellow-700">
                                            Glissez-déposez vos images ou cliquez ici !
                                        </p>
                                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                                            <span>• PNG, JPG, WEBP</span>
                                            <span>• Max 10MB</span>
                                            <span>• Qualité HD</span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        ref={fileInputRef}
                                        onChange={(e) => e.target.files && handleFiles(e.target.files)}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>

                                {/* Upload Progress thème Pikachu */}
                                {isUploadingImage && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                                        <div className="flex items-center gap-3 text-yellow-700">
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-lg" />
                                            <span className="font-bold">Upload en cours... ⚡</span>
                                        </div>
                                    </div>
                                )}

                                {/* Image Gallery thème Pikachu */}
                                {imageUrls.length > 0 && (
                                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {imageUrls.map((url, i) => (
                                            <div key={i} className="relative group">
                                                <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl overflow-hidden border-2 border-yellow-200 hover:border-orange-300 transition-all duration-300 cursor-pointer"
                                                     onClick={() => openImageModal(url, i)}>
                                                    <Image
                                                        src={url}
                                                        alt={`Photo ${i + 1}`}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        unoptimized
                                                    />
                                                    {/* Overlay au hover */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                                                            <button
                                                                type="button"
                                                                className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600 shadow-lg"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openImageModal(url, i);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faExpand} className="text-sm" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemoveImage(i);
                                                                }}
                                                                className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg"
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} className="text-sm" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Badge numéro thème Pikachu */}
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                                                    {i + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {errors.image && (
                                    <div className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                                        <div className="flex items-center gap-2 text-red-600">
                                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-sm" />
                                            <span className="text-sm font-medium">{errors.image}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Form Fields thème Pikachu */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                {/* Title thème Pikachu */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        <FontAwesomeIcon icon={faTag} className="mr-2 text-yellow-600" />
                                        Titre de votre offre ⚡
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-300 font-medium ${
                                            errors.title
                                                ? "border-red-300 bg-red-50"
                                                : "border-yellow-200 hover:border-yellow-300 bg-gradient-to-r from-yellow-50/50 to-orange-50/50"
                                        }`}
                                        placeholder="Ex: Charizard PSA 10 ⚡"
                                        disabled={isLoading}
                                    />
                                    {errors.title && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-xs" />
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Price thème Pikachu */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        <FontAwesomeIcon icon={faEuroSign} className="mr-2 text-green-600" />
                                        Prix en CHF 💰
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-300 font-medium ${
                                            errors.price
                                                ? "border-red-300 bg-red-50"
                                                : "border-yellow-200 hover:border-yellow-300 bg-gradient-to-r from-yellow-50/50 to-orange-50/50"
                                        }`}
                                        placeholder="150.00"
                                        min="0"
                                        step="0.01"
                                        disabled={isLoading}
                                    />
                                    {errors.price && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-xs" />
                                            {errors.price}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Description thème Pikachu */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    <FontAwesomeIcon icon={faFileText} className="mr-2 text-orange-600" />
                                    Description détaillée 📝
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-300 resize-none font-medium ${
                                        errors.description
                                            ? "border-red-300 bg-red-50"
                                            : "border-yellow-200 hover:border-yellow-300 bg-gradient-to-r from-yellow-50/50 to-orange-50/50"
                                    }`}
                                    placeholder="Décrivez l'état, la rareté, l'édition de vos cartes..."
                                    disabled={isLoading}
                                />
                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-xs" />
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Global Error */}
                            {errors.global && (
                                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                    <div className="flex items-center gap-3 text-red-700">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-lg" />
                                        <span className="font-bold">{errors.global}</span>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button thème Pikachu */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                        isLoading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : buttonText.includes("⚡")
                                                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                                : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                                    } text-white`}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            isLoading ? faSpinner :
                                                buttonText.includes("⚡") ? faCheckCircle :
                                                    faSave
                                        }
                                        className={isLoading ? "animate-spin" : ""}
                                    />
                                    {buttonText}
                                </button>
                            </div>

                            {/* Progress Indicator thème Pikachu */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm text-gray-600 font-medium">Progression de votre offre ⚡</span>
                                    <span className="text-sm text-yellow-600 font-bold">
                                        {[imageUrls.length > 0, formData.title, formData.price > 0, formData.description].filter(Boolean).length}/4
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${([imageUrls.length > 0, formData.title, formData.price > 0, formData.description].filter(Boolean).length / 4) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Tips thème Pikachu */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <FontAwesomeIcon icon={faImages} className="text-yellow-600 text-xl" />
                                <h3 className="font-bold text-gray-900">Photos nettes ⚡</h3>
                            </div>
                            <p className="text-sm text-gray-600">Ajoutez plusieurs angles pour rassurer les collectionneurs</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <FontAwesomeIcon icon={faEuroSign} className="text-green-600 text-xl" />
                                <h3 className="font-bold text-gray-900">Prix juste 💰</h3>
                            </div>
                            <p className="text-sm text-gray-600">Vérifiez les prix du marché pour vos cartes</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <FontAwesomeIcon icon={faBolt} className="text-orange-600 text-xl" />
                                <h3 className="font-bold text-gray-900">Description précise ⚡</h3>
                            </div>
                            <p className="text-sm text-gray-600">Mentionnez l'état, l'édition et les défauts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal d'image */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                     onClick={closeImageModal}>
                    <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">

                        {/* Bouton fermer */}
                        <button
                            onClick={closeImageModal}
                            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-xl" />
                        </button>

                        {/* Navigation précédente */}
                        {imageUrls.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage('prev');
                                }}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
                            >
                                <FontAwesomeIcon icon={faImages} className="rotate-180" />
                            </button>
                        )}

                        {/* Navigation suivante */}
                        {imageUrls.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage('next');
                                }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
                            >
                                <FontAwesomeIcon icon={faImages} />
                            </button>
                        )}

                        {/* Image principale */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={selectedImage}
                                alt={`Image ${selectedImageIndex + 1}`}
                                fill
                                className="object-contain"
                                unoptimized
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Indicateur de position */}
                        {imageUrls.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-white font-medium">
                                    {selectedImageIndex + 1} / {imageUrls.length}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}