"use client";

import { useRef, useState } from "react";
import { updateOffer } from "@/actions/OfferAction";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Offer = {
    id: string;
    user_id: string;
    title: string;
    description: string;
    price: number;
    image: string[];
    status: string;
    created_at: Date; // Ou `Date` si c'est un objet `Date`
};

export default function UpdateOfferForm({ offer, user_id }: { offer: Offer, user_id: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        id: offer.id,
        user_id: offer.user_id || "",
        title: offer.title || "",
        description: offer.description || "",
        price: offer.price || 0,
        image: offer.image || [],
    });

    const [imageUrls, setImageUrls] = useState<string[]>(offer.image);

    const [buttonText, setButtonText] = useState("Modifier votre offre");
    const [buttonColor, setButtonColor] = useState("bg-black");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Si l'offre est acceptée ou refusée, on ne laisse pas l'utilisateur modifier
        if (offer.status !== "waiting") {
            setButtonText("Vous ne pouvez plus modifier cette offre !");
            setTimeout(() => {
                redirect(`/resell/offers/${user_id}`);
            }, 1000);
            return;
        }

        setButtonColor("bg-orange-500");
        setButtonText("Modification de l'offre...");
        setIsLoading(true);

        try {
            // Mettre à jour formData avec les URLs d'images
            formData.image = imageUrls;
            await updateOffer(formData);
            setButtonColor("bg-green-700");
            setButtonText("Offre modifiée avec succès !");
            setIsLoading(false);
            setTimeout(() => {
                redirect(`/resell/offers/${user_id}`);
            }, 2000);
        } catch (e) {
            setButtonColor("bg-red-500");
            setButtonText(`Une erreur a eu lieu : ${e}`);
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Gérer la suppression d'une image
    const handleRemoveImage = async (index: number) => {
        const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updatedImageUrls);
        setFormData((prevState) => ({
            ...prevState,
            image: updatedImageUrls,
        }));
    };

    return (
        <>
            <form className={"flex flex-col mt-1 w-3/4 items-center"} onSubmit={handleSubmit}>
                <div className={"w-2/4 my-5"}>
                    <input
                        className={"upload absolute right-[999999px]"}
                        type="file"
                        disabled={isLoading}
                        ref={fileInputRef}
                        onChange={async (e) => {
                            const file = e.target.files?.[0] as File;

                            setIsUploadingImage(true);

                            const data = new FormData();
                            data.set("file", file);

                            const response = await fetch("/api/files", {
                                method: "POST",
                                body: data,
                            });

                            const signedURL = await response.json();

                            // Mettre à jour imageUrls en premier
                            setImageUrls((prev) => {
                                const updatedUrls = [...prev, signedURL];
                                // Mettre à jour formData avec la nouvelle image
                                setFormData((prevState) => ({
                                    ...prevState,
                                    image: updatedUrls, // Sauvegarde l'image dans formData
                                }));
                                return updatedUrls;
                            });

                            setIsUploadingImage(false);
                        }}
                    />

                    <div className={"flex flex-col justify-center items-center shadow-md shadow-gray-400 p-2 w-full relative"}>
                        <div className={"w-full flex flex-col items-center"}>
                            <h2 className={"w-fit font-bold text-xl mt-5 mb-2 px-4 py-1 bg-orange-600 text-white rounded-2xl"}>Photos</h2>
                            <p className={"mb-4 text-gray-600"}>Les photos seront visible dans leur format d&#39;origine par nos équipes</p>
                        </div>

                        <div className={"w-[80%] min-h-[300px] max-h-[500px] flex flex-wrap gap-1 bg-white border-2 border-gray-700 mx-auto rounded-md shadow-gray-400 shadow-sm"}>
                            {imageUrls.map((url, i) => (
                                <div key={url} className={"relative flex-1 basis-[50px] h-[200px]"}>
                                    <img src={url} alt="Image publiée" className={"w-full h-full object-cover"} />

                                    {/* Croix de suppression */}
                                    <button
                                        className={"absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center"}
                                        onClick={() => handleRemoveImage(i)} // Appel de la fonction de suppression
                                    >
                                        <FontAwesomeIcon icon={faPlus} className={"text-white text-3xl rotate-45"} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Button ajouter une image */}
                        <button
                            className={"bg-orange-600 px-3 my-10 py-2 rounded w-fit h-fit text-xl mt-10 font-medium text-white shadow-gray-400 shadow-md"}
                            onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current?.click();
                            }}
                        >
                            {isUploadingImage ? ("Ajout de l'image...") : (<><FontAwesomeIcon icon={faPlus} className={"mr-2"} /> Ajouter une image</>)}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col m-4 justify-between items-center w-2/4">
                    <label htmlFor="title" className={"w-fit font-bold text-xl mt-5 mb-2 px-4 py-1 bg-orange-600 text-white rounded-2xl"}>Titre</label>
                    <p className={"mb-4 text-gray-600 font-medium"}>Choisissez un titre qui défini ce que vous souhaiter revendre</p>
                    <input
                        className="border text-xl rounded shadow-md ml-5 w-full border-gray-300 p-1.5 bg-white outline-0"
                        type="text"
                        name="title"
                        placeholder="Titre de l'offre"
                        onChange={handleChange}
                        defaultValue={offer.title}
                    />
                </div>
                <div className="flex flex-col m-4 justify-between items-center w-2/4">
                    <label htmlFor="description"
                           className={"w-fit font-bold text-xl mt-5 mb-2 px-4 py-1 bg-orange-600 text-white rounded-2xl"}>Description</label>
                    <p className={"mb-4 text-gray-600 font-medium"}>Veuillez décrire vos articles avec précision</p>
                    <textarea
                        className="border rounded shadow-md ml-5 border-gray-300 p-1.5 bg-white outline-0 resize-none w-full h-52"
                        name="description"
                        placeholder="Description de l'offre"
                        onChange={handleChange}
                        defaultValue={offer.description}
                    />
                </div>
                <div className="flex flex-col m-4 justify-between items-center w-2/4">
                    <label htmlFor="price" className={"w-fit font-bold text-xl mt-5 mb-1 px-4 py-1 bg-orange-600 text-white rounded-2xl"}>Prix</label>
                    <p className={"mb-4 text-gray-600 font-medium"}>Ce prix pourrait être amené à être négocié</p>
                    <input
                        className="border rounded appearance-none text-xl shadow-md ml-5 border-gray-300 p-1.5 bg-white outline-0 resize-none w-full"
                        type="number"
                        name="price"
                        placeholder="Prix"
                        onChange={handleChange}
                        defaultValue={offer.price}
                    />
                </div>
                <button
                    type={"submit"}
                    disabled={isLoading}
                    className={`my-3 mb-10 px-5 py-3 rounded-full font-medium text-xl text-white ${buttonColor} shadow-gray-400 shadow-md`}
                >
                    {buttonText}
                </button>
            </form>
        </>
    );
}
