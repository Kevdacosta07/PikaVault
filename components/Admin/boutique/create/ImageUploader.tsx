"use client";

import { useRef, useState } from "react";

export default function ImageUploader({ imageUrl, setImageUrl, error }: { imageUrl: string, setImageUrl: (url: string) => void, error?: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropzoneRef = useRef<HTMLDivElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false); // ✅ État pour suivre l’upload


    // Gestion du Drag & Drop
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            await handleFiles(files[0]); // Accepte uniquement un fichier
        }
    };

    // Gestion de l'input file (bouton)
    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await handleFiles(e.target.files[0]); // Accepte uniquement un fichier
        }
    };

    // Gestion et upload du fichier
    const handleFiles = async (file: File) => {
        setIsUploading(true); // ✅ Active le mode "chargement"
        setIsImageUploaded(false); // ✅ Reset tant que l'upload est en cours

        try {
            const data = new FormData();
            data.set("file", file);

            const response = await fetch("/api/files", {
                method: "POST",
                body: data,
            });

            const signedURL = await response.json();
            setImageUrl(signedURL); // ✅ Met à jour l'image dans RHF

            setIsImageUploaded(true); // ✅ Indique que l'image est bien chargée
        } catch (error) {
            console.error("Erreur d'upload :", error);
        } finally {
            setIsUploading(false); // ✅ Désactive le mode "chargement"
        }
    };

    return (
        <div className="flex flex-col w-full py-4 mt-8">
            <div className="flex flex-col">
                <p className={`${isImageUploaded ? "bg-green-500" : (error ?"bg-red-500" : "bg-gray-700")} text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5`}>
                    Image
                </p>
                <p className="text-gray-600 text-md mb-5 mt-1">
                    Cliquez ou déposez une image dans le cadre ci-dessous
                </p>
            </div>

            {/* Champ de fichier INVISIBLE mais fonctionnel */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*" // ✅ Autorise uniquement les images
                multiple={false} // ✅ Un seul fichier autorisé
                onChange={handleFileInputChange}
            />

            {/* Zone de drag and drop */}
            <div
                ref={dropzoneRef}
                onDrop={handleDrop}
                onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                }}
                onDragOver={(e) => e.preventDefault()}
                className={`w-full cursor-pointer min-h-[300px] max-h-[500px] bg-white border-2 
                    ${isImageUploaded ? "border-green-500" : (error ? "border-red-500" : "border-gray-700")}
                    mx-auto rounded-md shadow-gray-400 shadow-sm p-2 transition duration-200 
                    hover:border-orange-500 flex justify-center items-center`}
            >
                {isUploading ? (
                    <p className="text-orange-500 text-lg m-auto">Chargement de l&#39;image...</p>
                ) : imageUrl ? (
                    <div className="w-full h-full rounded-md overflow-hidden flex justify-center relative">
                        <img src={imageUrl} alt="Image publiée" className="h-[300px]" />
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg m-auto">Aucune image sélectionnée</p>
                )}
            </div>

            {/* Affichage de l'erreur */}
            {error && !isImageUploaded && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
