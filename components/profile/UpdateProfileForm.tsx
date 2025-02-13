"use client";

import { useState } from "react";
import { editProfile } from "@/actions/ProfileActions";

type Profile = {
    id: string;
    name: string;
    adress: string;
    country: string;
    user_id: string
    cp: number;
    city: string;
};

export default function UpdateProfileForm({ userProfile }: {userProfile: Profile}) {

    const [formData, setFormData] = useState({
        id: userProfile.id,
        name: userProfile.name || "",
        adress: userProfile.adress || "",
        country: userProfile.country || "",
        city: userProfile.city || "",
        cp: userProfile.cp || 0,
        user_id: userProfile.user_id || "",
    });

    const [isPending, setIsPending] = useState(false)
    const [buttonText, setButtonText] = useState("Mettre à jour l'adresse de livraison");
    const [isUpdated, setIsUpdated] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        setButtonText("Mise à jour..."); // Afficher un message temporaire
        setIsPending(true)
        try {
            await editProfile(formData);
            setButtonText("✅ Profile mis à jour !");
            setIsUpdated(true)

            // Remettre le texte normal après 3 secondes
            setTimeout(function () {
                setButtonText("Mettre à jour l'adresse de livraison");
                setIsUpdated(false);
                setIsPending(false)
            }, 2000);

        }
        catch (error) {

            setButtonText(`❌ Une erreur est survenue : ${error}`);

            // Remettre le texte normal après 3 secondes
            setTimeout(() => setButtonText("Mettre à jour l'adresse de livraison"), 3000);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-[650px] pt-8 px-12 py-8 shadow-lg rounded-md bg-gray-100 bg-opacity-85 shadow-gray-800">

            <div className={"flex-col flex items-center justify-center"}>
                <h2 className={"font-bold  text-black text-4xl"}>Modifier l&#39;adresse de livraison</h2>
                <p className={"text-xl font-normal text-orange-800 mt-1"}>Éditez votre adresse de livraison</p>
            </div>

            <form className="flex flex-col w-full items-start" onSubmit={handleSubmit}>

                {/* Nom complet */}
                <div className="flex flex-col mt-8 items-start w-full">
                    <label htmlFor="fullname" className="mb-1 mr-5 font-medium">Nom complet</label>
                    <input
                        className="border w-full outline-none rounded shadow-md border-gray-300 py-2 px-2"
                        type="text"
                        name="fullname"
                        placeholder="Prénom & nom"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                {/* Adresse postale */}
                <div className="flex flex-col items-start mt-4 w-full">
                    <label htmlFor="adress" className="mb-1 mr-5 font-medium">Adresse</label>
                    <input
                        className="border w-full outline-none rounded shadow-md border-gray-300 py-2 px-2"
                        type="text"
                        name="adress"
                        placeholder="Adresse de résidence"
                        value={formData.adress}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                {/* Pays */}
                <div className="flex flex-col items-start mt-4 w-full">
                    <label htmlFor="country" className="mb-1 font-medium">Pays</label>
                    <input
                        className="border w-full outline-none rounded shadow-md border-gray-300 py-2 px-2"
                        type="text"
                        name="country"
                        placeholder="Pays de résidence"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                {/* Ville */}
                <div className="flex flex-col items-start mt-4 w-full">
                    <label htmlFor="city" className="mb-1 font-medium">Ville</label>
                    <input
                        className="border w-full outline-none rounded shadow-md border-gray-300 py-2 px-2"
                        type="text"
                        name="city"
                        placeholder="Ville de résidence"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                {/* Code postal */}
                <div className="flex flex-col items-start mt-4 w-full">
                    <label htmlFor="cp" className="mb-1 font-medium">Code postal</label>
                    <input
                        className="border w-full outline-none rounded shadow-md border-gray-300 py-2 px-2"
                        type="number"
                        name="cp"
                        placeholder="Code postal"
                        value={formData.cp}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                {/* Bouton de validation */}
                <button
                    type="submit"
                    className="mt-8 w-full p-3 px-6 shadow-md shadow-gray-400 rounded-md text-white text-xl bg-orange-500 font-semibold transition-colors hover:bg-orange-600 duration-200"
                    disabled={isPending}
                >
                    {buttonText}
                </button>
            </form>
        </div>
    );
}
