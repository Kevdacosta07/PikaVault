"use client";

import { useRef, useState } from "react";
import { createOffer } from "@/actions/OfferAction";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";

// Définition du schéma de validation avec Zod
const offerSchema = z.object({
    title: z.string().min(3, "Le titre doit contenir au moins 3 caractères."),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
    price: z.number().positive("Le prix doit être supérieur à 0."),
    image: z.array(z.string()).min(1, "Ajoutez au moins une image."),
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
    const [buttonText, setButtonText] = useState("Créer une offre");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadMessage, setUploadMessage] = useState<string | null>(null);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setButtonText("Création de l'offre...");

        try {
            const parsedData = offerSchema.parse({ ...formData, image: imageUrls });

            await createOffer({ ...parsedData, user_id });

            setButtonText("Offre créée avec succès !");
            setTimeout(() => redirect(`/resell/offers/${user_id}`), 2000);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    formattedErrors[err.path[0]] = err.message;
                });
                setErrors(formattedErrors);
            }
            setButtonText("Créer une offre");
        } finally {
            setIsLoading(false);
        }
    };

    // Gérer les changements dans les champs texte
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
        setUploadMessage("Ajout de l’image en cours...");

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
                    throw new Error("Échec de l’upload de l’image");
                }

                const url = await response.json(); // L'API retourne directement l'URL

                uploadedUrls.push(url); // Ajouter l'URL retournée par Pinata
            } catch (error) {
                console.error("Erreur lors de l'upload :", error);
            }
        }

        setImageUrls((prev) => [...prev, ...uploadedUrls]); // Mettre à jour les images
        setFormData((prev) => ({
            ...prev,
            image: [...prev.image, ...uploadedUrls], // Mettre à jour le formulaire
        }));

        setIsUploadingImage(false);
        setUploadMessage(null);
    };


    // 🔹 Supprimer une image
    const handleRemoveImage = (index: number) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
        setFormData((prevState) => ({
            ...prevState,
            image: prevState.image.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-1">Créer une nouvelle offre</h2>
            <h2 className="font-normal text-gray-600 text-center mb-6">
                Assurez-vous d&#39;insérer toutes les informations nécessaires
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Zone de d&d */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <FontAwesomeIcon icon={faUpload} className="text-gray-400 text-3xl" />
                        <p className="text-gray-600 mt-2">
                            Glissez-déposez vos images ici ou{" "}
                            <span className="text-orange-500 font-semibold cursor-pointer">cliquez pour parcourir</span>
                        </p>
                        <input type="file" multiple ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} className="hidden" />
                    </div>

                    {/* Affichage du message de chargement */}
                    {isUploadingImage && <p className="mt-3 text-center text-orange-600 font-semibold animate-pulse">{uploadMessage}</p>}

                    {/* Aperçu des images */}
                    {imageUrls.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {imageUrls.map((url, i) => (
                                <div key={i} className="relative">
                                    <img src={url} alt="Image uploadée" className="w-full h-24 object-cover rounded-lg shadow-md" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Titre */}
                <div>
                    <label htmlFor={"title"} className="block text-lg font-medium text-gray-700">Titre</label>
                    <input id="title" name="title" type="text" placeholder="Entrez un titre" className="p-3 w-full border border-gray-300 rounded-lg" onChange={handleChange} />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Prix */}
                <div>
                    <label htmlFor={"price"} className="block text-lg font-medium text-gray-700">Prix (€)</label>
                    <input id="price" name="price" type="text" placeholder="Entrez un prix" className="p-3 w-full border border-gray-300 rounded-lg" onChange={handleChange}/>
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>


                {/* Description */}
                <div>
                    <label htmlFor={"description"} className="block text-lg font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" placeholder="Entrez une description détaillée..." className="p-3 w-full border border-gray-300 rounded-lg h-32 resize-none" onChange={handleChange} />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>


                <button type="submit" disabled={isLoading} className="w-full py-3 text-xl bg-orange-500 text-white rounded-lg">
                    {isLoading ? "Création en cours..." : buttonText}
                </button>
            </form>
        </div>
    );
}
