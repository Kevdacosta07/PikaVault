"use client";

import { useRef, useState } from "react";
import { createOffer } from "@/actions/OfferAction";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faImage,
    faSpinner,
    faCheckCircle,
    faExclamationTriangle,
    faPlus,
    faTags,
    faEuroSign,
    faFileText,
    faCloudUploadAlt,
    faMagic,
    faRocket,
    faGift,
    faShieldAlt,
    faBullhorn,
    faCamera,
    faExpand
} from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import clsx from "clsx";

// Définition du schéma de validation avec Zod
const offerSchema = z.object({
    title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
    price: z.number().positive("Le prix doit être supérieur à 0"),
    image: z.array(z.string()).min(1, "Ajoutez au moins une image"),
});

type OfferFormData = z.infer<typeof offerSchema>;

export default function CreateOfferForm({ user_id }: { user_id: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<OfferFormData>({
        title: "",
        description: "",
        price: 0,
        image: [],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // État pour la modal d'agrandissement d'image
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrors({});

        try {
            const parsedData = offerSchema.parse({ ...formData, image: imageUrls });

            await createOffer({ ...parsedData, user_id });

            setStatus('success');

            // Redirection après succès
            setTimeout(() => {
                redirect(`/resell/offers/${user_id}`);
            }, 2000);
        } catch (error) {
            setStatus('error');

            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    formattedErrors[err.path[0] as string] = err.message;
                });
                setErrors(formattedErrors);
                setErrorMessage("Veuillez corriger les erreurs dans le formulaire");
            } else {
                setErrorMessage("Une erreur est survenue lors de la création de l&apos;offre");
            }

            // Reset status après l'erreur
            setTimeout(() => {
                setStatus('idle');
                setErrorMessage("");
            }, 4000);
        }
    };

    // Gérer les changements dans les champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = name === "price" ? (value === "" ? 0 : Number(value)) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        // Validation en temps réel
        try {
            if (name === "image") return; // Skip validation pour les images

            const fieldSchema = offerSchema.shape[name as keyof Omit<OfferFormData, 'image'>];
            fieldSchema?.parse(newValue);

            setErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
            }
        }
    };

    // Gérer le drag & drop
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    // Gérer l'upload des fichiers
    const handleFiles = async (files: FileList) => {
        setIsUploadingImage(true);
        const uploadedUrls: string[] = [];

        for (const file of files) {
            // Vérifier le type de fichier
            if (!file.type.startsWith('image/')) {
                continue;
            }

            // Vérifier la taille (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage("Les images doivent faire moins de 5MB");
                continue;
            }

            const data = new FormData();
            data.append("file", file);

            try {
                const response = await fetch("/api/files", {
                    method: "POST",
                    body: data,
                });

                if (!response.ok) {
                    throw new Error("Échec de l&apos;upload de l&apos;image");
                }

                const url = await response.json();
                uploadedUrls.push(url);
            } catch (error) {
                console.error("Erreur lors de l&apos;upload :", error);
                setErrorMessage("Erreur lors de l&apos;upload d&apos;une image");
            }
        }

        setImageUrls((prev) => [...prev, ...uploadedUrls]);
        setFormData((prev) => ({
            ...prev,
            image: [...prev.image, ...uploadedUrls],
        }));

        setIsUploadingImage(false);

        // Clear image errors if we now have images
        if (uploadedUrls.length > 0) {
            setErrors((prev) => ({ ...prev, image: "" }));
        }
    };

    // Supprimer une image
    const handleRemoveImage = (index: number) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
        setFormData((prev) => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index),
        }));
    };

    // Agrandir une image
    const handleEnlargeImage = (imageUrl: string, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setEnlargedImage(imageUrl);
    };

    // Fermer la modal d'agrandissement
    const handleCloseEnlargedImage = () => {
        setEnlargedImage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* En-tête motivationnel */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full mb-4">
                        <FontAwesomeIcon icon={faMagic} className="text-orange-600 mr-2" />
                        <span className="text-orange-800 font-semibold text-sm">Nouvelle offre</span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🎯 Créer une nouvelle offre
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Vendez vos cartes Pokémon en quelques clics et touchez des milliers d&apos;acheteurs
                    </p>

                    {/* Avantages */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <FontAwesomeIcon icon={faRocket} className="text-blue-600 text-2xl mb-2" />
                            <div className="text-sm font-semibold text-gray-800">Publication rapide</div>
                            <div className="text-xs text-gray-600">En ligne en moins de 2 minutes</div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-green-600 text-2xl mb-2" />
                            <div className="text-sm font-semibold text-gray-800">Paiement sécurisé</div>
                            <div className="text-xs text-gray-600">Protection intégrée</div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <FontAwesomeIcon icon={faGift} className="text-purple-600 text-2xl mb-2" />
                            <div className="text-sm font-semibold text-gray-800">Commission réduite</div>
                            <div className="text-xs text-gray-600">Plus de profit pour vous</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Zone d'upload d'images */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                            <FontAwesomeIcon icon={faCamera} className="text-blue-500" />
                            Photos de vos cartes *
                        </h3>

                        <div
                            className={clsx(
                                "border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer",
                                dragActive
                                    ? "border-blue-400 bg-blue-50"
                                    : errors.image
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
                            )}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="text-center">
                                <FontAwesomeIcon
                                    icon={isUploadingImage ? faSpinner : faCloudUploadAlt}
                                    className={clsx(
                                        "text-4xl mb-4",
                                        isUploadingImage ? "text-blue-500 animate-spin" : "text-gray-400"
                                    )}
                                />
                                <p className="text-lg font-medium text-gray-700 mb-2">
                                    {isUploadingImage ? "Upload en cours..." : "Ajoutez vos photos"}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Glissez-déposez vos images ici ou{" "}
                                    <span className="text-blue-600 font-semibold">cliquez pour parcourir</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Formats acceptés : JPG, PNG, WEBP • Taille max : 5MB par image
                                </p>
                            </div>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                                className="hidden"
                                disabled={isUploadingImage || status === 'loading'}
                            />
                        </div>

                        {errors.image && (
                            <div className="flex items-center text-red-600 text-sm mt-2">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                                {errors.image}
                            </div>
                        )}

                        {/* Aperçu des images */}
                        {imageUrls.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faImage} />
                                    Aperçu des images ({imageUrls.length})
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imageUrls.map((url, i) => (
                                        <div key={i} className="relative group">
                                            <div
                                                className="relative cursor-pointer"
                                                onClick={(e) => handleEnlargeImage(url, e)}
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Image ${i + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                                                />
                                                {/* Overlay avec icône d'agrandissement */}
                                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                                    <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                                                        <FontAwesomeIcon
                                                            icon={faExpand}
                                                            className="text-gray-800 text-lg"
                                                        />
                                                    </div>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    Cliquer pour agrandir
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveImage(i);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                                title="Supprimer cette image"
                                            >
                                                <FontAwesomeIcon icon={faTimes} className="text-xs" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Informations de l'offre */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                            <FontAwesomeIcon icon={faBullhorn} className="text-orange-500" />
                            Détails de votre offre
                        </h3>

                        <div className="space-y-6">
                            {/* Titre */}
                            <div>
                                <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faTags} className="mr-2 text-blue-500" />
                                    Titre de l&apos;offre *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    disabled={status === 'loading' || status === 'success'}
                                    placeholder="Ex: Dracaufeu Shiny 1ère édition - État parfait"
                                    className={clsx(
                                        "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                        errors.title
                                            ? "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    )}
                                />
                                {errors.title && (
                                    <div className="flex items-center text-red-600 text-sm mt-1">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                                        {errors.title}
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Soyez précis et descriptif pour attirer les acheteurs
                                </p>
                            </div>

                            {/* Prix */}
                            <div>
                                <label htmlFor="price" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faEuroSign} className="mr-2 text-green-500" />
                                    Prix de vente *
                                </label>
                                <div className="relative">
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price || ""}
                                        onChange={handleChange}
                                        disabled={status === 'loading' || status === 'success'}
                                        placeholder="0.00"
                                        className={clsx(
                                            "w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                            errors.price
                                                ? "border-red-300 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-green-500"
                                        )}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <span className="text-gray-500 font-medium">€</span>
                                    </div>
                                </div>
                                {errors.price && (
                                    <div className="flex items-center text-red-600 text-sm mt-1">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                                        {errors.price}
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Consultez les prix du marché pour être compétitif
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faFileText} className="mr-2 text-purple-500" />
                                    Description détaillée *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    disabled={status === 'loading' || status === 'success'}
                                    rows={5}
                                    placeholder="Décrivez l'état de vos cartes, leur rareté, leur histoire... Plus votre description est détaillée, plus vous aurez de chances de vendre !"
                                    className={clsx(
                                        "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed",
                                        errors.description
                                            ? "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-purple-500"
                                    )}
                                />
                                {errors.description && (
                                    <div className="flex items-center text-red-600 text-sm mt-1">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                                        {errors.description}
                                    </div>
                                )}
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-xs text-gray-500">
                                        Mentionnez l&apos;état, la rareté, l&apos;édition, etc.
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {formData.description.length} caractères
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages de statut */}
                    {status === 'success' && (
                        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
                            <div className="flex items-center text-green-600">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl mr-4" />
                                <div>
                                    <h4 className="font-semibold text-lg">Offre créée avec succès !</h4>
                                    <p className="text-sm text-green-700">
                                        Votre offre est maintenant en ligne. Redirection en cours...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                            <div className="flex items-center text-red-600">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl mr-4" />
                                <div>
                                    <h4 className="font-semibold text-lg">Erreur lors de la création</h4>
                                    <p className="text-sm text-red-700">
                                        {errorMessage || "Une erreur inattendue s&apos;est produite"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bouton de soumission */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <button
                            type="submit"
                            disabled={
                                status === 'loading' ||
                                status === 'success' ||
                                isUploadingImage ||
                                !formData.title.trim() ||
                                !formData.description.trim() ||
                                formData.price <= 0 ||
                                imageUrls.length === 0
                            }
                            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-orange-500 disabled:hover:to-amber-500"
                        >
                            {status === 'loading' ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-3" />
                                    Création de l&apos;offre en cours...
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
                                    Offre créée avec succès !
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPlus} className="mr-3" />
                                    Publier mon offre
                                </>
                            )}
                        </button>

                        {/* Conseils */}
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h5 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faShieldAlt} />
                                Conseils pour une vente réussie
                            </h5>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li>• Prenez des photos nettes et bien éclairées</li>
                                <li>• Décrivez précisément l&apos;état de vos cartes</li>
                                <li>• Fixez un prix juste en consultant le marché</li>
                                <li>• Répondez rapidement aux questions des acheteurs</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modal d'agrandissement d'image */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                    onClick={handleCloseEnlargedImage}
                >
                    {/* Conteneur de l'image */}
                    <div className="relative max-w-5xl max-h-full bg-white rounded-2xl overflow-hidden shadow-2xl">
                        {/* Bouton de fermeture */}
                        <button
                            onClick={handleCloseEnlargedImage}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full z-10 transition-all duration-200 backdrop-blur-sm"
                            title="Fermer (Échap)"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-lg" />
                        </button>

                        {/* Image agrandie */}
                        <img
                            src={enlargedImage}
                            alt="Image agrandie"
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}