"use client";

import { useRef } from "react";

export default function ImageUploader({ imageUrl, setImageUrl }: { imageUrl: string, setImageUrl: (url: string) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropzoneRef = useRef<HTMLDivElement>(null);

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

        try {
            const data = new FormData();
            data.set("file", file);

            const response = await fetch("/api/files", {
                method: "POST",
                body: data,
            });

            const signedURL = await response.json();
            setImageUrl(signedURL); // Stocke uniquement UNE image
        } catch (error) {
            console.error("Erreur d'upload :", error);
        }
    };

    return (
        <div className="flex flex-col w-full items-center justify-center py-4 mt-8">
            <div className="flex flex-col items-center">
                <p className="w-fit font-bold my-2 px-4 py-1 text-2xl bg-orange-500 text-white rounded-xl shadow-md shadow-gray-400">
                    Photos
                </p>
                <p className="text-gray-600 text-xl font-medium mb-5">
                    Cliquez ou déposez une image dans le cadre ci-dessous
                </p>
            </div>

            {/* Champ de fichier INVISIBLE mais fonctionnel */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*" // Autorise uniquement les images
                multiple={false} // Un seul fichier autorisé
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
                className="w-full cursor-pointer min-h-[300px] max-h-[500px] bg-white border-2 border-gray-700 mx-auto rounded-md shadow-gray-400 shadow-sm p-2 transition duration-200 hover:border-orange-500 flex justify-center items-center"
            >
                {imageUrl ? (
                    <div className="w-full h-full rounded-md overflow-hidden flex justify-center relative">
                        <img src={imageUrl} alt="Image publiée"
                             className="h-[300px]"/>
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg m-auto">Aucune image sélectionnée</p>
                )}
            </div>


        </div>
    );
}
