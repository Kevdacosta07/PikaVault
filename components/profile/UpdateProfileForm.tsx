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
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"flex-col flex items-center justify-center"}>
                <h2 className={"font-bold  text-black text-4xl"}>Modifier l&#39;adresse de livraison</h2>
                <p className={"text-xl font-normal text-orange-800 mt-3"}>Éditez votre adresse de livraison</p>
            </div>
            <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mt-8 m-2 w-full">
                    <label htmlFor="fullname" className="mb-1 mr-5 text-xl font-medium">Nom complet</label>
                    <input
                        className="border text-xl rounded shadow-md border-gray-300 p-2"
                        type="text"
                        name="fullname"
                        placeholder="Prénom & nom"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center m-2 w-full">
                    <label htmlFor="adress" className="mb-1 mr-5 text-xl font-medium">Adresse</label>
                    <input
                        className="border text-xl rounded shadow-md border-gray-300 p-2"
                        type="text"
                        name="adress"
                        placeholder="Adresse de résidence"
                        value={formData.adress}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center m-2 w-full">
                    <label htmlFor="country" className="mb-1 mr-5 text-xl font-medium">Pays</label>
                    <input
                        className="border text-xl rounded shadow-md border-gray-300 p-2"
                        type="text"
                        name="country"
                        placeholder="Pays de résidence"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center m-2 w-full">
                    <label htmlFor="city" className="mb-1 mr-5 text-xl font-medium">Ville</label>
                    <input
                        className="border text-xl rounded shadow-md border-gray-300 p-2"
                        type="text"
                        name="city"
                        placeholder="Ville de résidence"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center m-2 w-full">
                    <label htmlFor="cp" className="mb-1 mr-5 text-xl font-medium">Code postal</label>
                    <input
                        className="border text-xl rounded shadow-md border-gray-300 p-2"
                        type="number"
                        name="cp"
                        placeholder="Code postal"
                        value={formData.cp}
                        onChange={handleChange}
                        disabled={isPending || isUpdated}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-8 p-3 px-6 shadow-md shadow-gray-400 rounded-full text-white text-xl bg-orange-600"
                    disabled={isPending}
                >
                    {buttonText}
                </button>
            </form>
        </div>
            );
            }
