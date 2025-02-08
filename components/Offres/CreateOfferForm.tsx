"use client";

import { useRef, useState } from "react";
import { createOffer } from "@/actions/OfferAction";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type OfferFormData = {
    user_id: string;
    title: string;
    description: string;
    price: number;
    image: string[];
};

export default function CreateOfferForm({ user_id }: { user_id: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropzoneRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<OfferFormData>({
        user_id: user_id,
        title: "",
        description: "",
        price: 0,
        image: [],
    });

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [buttonText, setButtonText] = useState("Créer une offre");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setButtonText("Création de l'offre...");
        setIsLoading(true);

        try {
            // Mettre à jour formData avec les URLs d'images
            setFormData((prev) => ({ ...prev, image: imageUrls }));

            await createOffer({ ...formData, image: imageUrls });

            setButtonText("Offre créée avec succès !");
            setIsLoading(false);

            setTimeout(() => {
                redirect(`/resell/offers/${user_id}`);
            }, 2000);
        } catch (error) {
            setButtonText(`Une erreur a eu lieu : ${String(error)}`);
            setIsLoading(false);
        }
    };

    // Gérer les changements dans les champs texte
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    // Fonction de gestion des fichiers déposés (drag and drop)
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        await handleFiles(files);
    };

    // Fonction pour gérer les fichiers
    const handleFiles = async (files: FileList) => {
        setIsUploadingImage(true);
        const fileArray = Array.from(files);
        const newImageUrls: string[] = [];

        for (const file of fileArray) {
            const data = new FormData();
            data.set("file", file);

            const response = await fetch("/api/files", {
                method: "POST",
                body: data,
            });

            const signedURL = await response.json();
            newImageUrls.push(signedURL);
        }

        setImageUrls((prev) => [...prev, ...newImageUrls]);

        setFormData((prevState) => ({
            ...prevState,
            image: [...prevState.image, ...newImageUrls],
        }));

        setIsUploadingImage(false);
    };

    // Gérer la suppression d'une image
    const handleRemoveImage = (index: number) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
        setFormData((prevState) => ({
            ...prevState,
            image: prevState.image.filter((_, i) => i !== index),
        }));
    };

    // Gérer l'événement de sélection de fichiers via input
    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            await handleFiles(e.target.files);
        }
    };

    return (
        <>
            <form className="flex flex-col mt-3 w-3/4 items-center" onSubmit={handleSubmit}>
                <div className="flex justify-center flex-col items-center shadow-md shadow-gray-400 py-2 w-2/4 my-5">
                    <div className="my-5 flex justify-center flex-col items-center">
                        <p className="w-fit font-bold text-xl my-2 px-4 py-1 bg-orange-600 text-white rounded-2xl">
                            Photos
                        </p>
                        <p className="text-gray-600 font-medium">
                            Vous pouvez glisser déposer les images dans le cadre ci-dessous
                        </p>
                    </div>

                    {/* Champ de fichier */}
                    <input
                        className="upload absolute right-[999999px]"
                        type="file"
                        multiple
                        disabled={isLoading}
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                    />

                    {/* Zone de drag and drop */}
                    <div
                        ref={dropzoneRef}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="w-[80%] min-h-[300px] max-h-[500px] flex flex-wrap gap-1 bg-white border-2 border-gray-700 mx-auto rounded-md shadow-gray-400 shadow-sm"
                    >
                        {imageUrls.map((url, i) => (
                            <div key={url} className="relative flex-1 basis-[50px] h-[200px]">
                                <img src={url} alt="Image publiée" className="w-full h-full object-cover" />
                                <button
                                    className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center"
                                    onClick={() => handleRemoveImage(i)}
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="text-white text-3xl rotate-45" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Bouton d'ajout d'image */}
                    <button
                        className="bg-orange-600 px-3 my-10 py-2 rounded w-fit h-fit text-xl mt-10 font-medium text-white shadow-gray-400 shadow-md"
                        onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current?.click();
                        }}
                    >
                        {isUploadingImage ? "Ajout de l'image..." : (
                            <>
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Ajouter une image
                            </>
                        )}
                    </button>
                </div>

                {/* Champs de formulaire */}
                {["title", "description", "price"].map((field) => (
                    <div key={field} className="flex flex-col m-4 justify-between items-center w-2/4">
                        <label htmlFor={field} className="w-fit font-bold text-xl mt-5 mb-2 px-4 py-1 bg-orange-600 text-white rounded-2xl">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            className="border text-xl rounded shadow-md w-full border-gray-300 p-1.5 bg-white outline-0"
                            type={field === "price" ? "number" : "text"}
                            name={field}
                            placeholder={`Entrez ${field}`}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <button type="submit" disabled={isLoading} className="my-3 mb-10 px-5 py-3 rounded-full font-bold text-xl text-white bg-black shadow-gray-400 shadow-md">
                    {buttonText}
                </button>
            </form>
        </>
    );
}
