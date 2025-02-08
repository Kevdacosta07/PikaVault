"use client";

import { useState, useTransition } from "react";
import { createProfile } from "@/actions/ProfileActions";
import {redirect} from "next/navigation";

export default function CompleteProfileForm({ id }: { id: string }) {

    const [formData, setFormData] = useState({
        user_id: id,
        fullname: "",
        adress: "",
        country: "",
        city: "",
        cp: 0,
    });

    const [isPending, startTransition] = useTransition();
    const [buttonText, setButtonText] = useState("Compléter votre profil");
    const [isUpdated, setIsUpdated] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Empêcher le rechargement de la page

        startTransition(async () => {
            setButtonText("Mise à jour..."); // Afficher un message temporaire
            try {
                await createProfile(formData);
                setButtonText("✅ Profile complété avec succès !");
                setIsUpdated(true)

                // Redirige après 1 seconde
                setTimeout(() => redirect(`/profile/${id}`), 1000);
            } catch (error) {
                setButtonText(`❌ Une erreur est survenue : ${error}`);

                // Remettre le texte normal après 2 secondes
                setTimeout(() => setButtonText("Compléter votre profile"), 2000);
            }
        });
    };

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"flex-col mt-3 flex items-center justify-center"}>
                <h2 className={"font-bold text-black text-4xl"}>Adresse de livraison</h2>
                <h2 className={"text-2xl text-orange-800 font-normal mt-3"}>Compléter votre profil avec une adresse</h2>
            </div>
            <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mt-8 m-1 w-full">
                    <label htmlFor="fullname" className="mb-1 mr-5 text-xl font-medium">Nom complet</label>
                    <input
                        className="text-xl border-b-2 border-b-gray-500 p-2 outline-0"
                        type="text"
                        name="fullname"
                        placeholder="Prénom & nom"
                        value={formData.fullname}
                        onChange={handleChange}
                        disabled={isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center mt-8 m-1 w-full">
                    <label htmlFor="adress" className="mb-1 mr-5 text-xl font-medium">Adresse</label>
                    <input
                        className="border-0 text-xl border-b-2 border-b-gray-500 border-gray-300 p-2 outline-0"
                        type="text"
                        name="adress"
                        placeholder="Adresse de résidence"
                        value={formData.adress}
                        onChange={handleChange}
                        disabled={isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center mt-8 m-1 w-full">
                    <label htmlFor="country" className="mb-1 mr-5 text-xl font-medium">Pays</label>
                    <input
                        className="border-0 text-xl border-b-2 border-b-gray-500 p-2 outline-0"
                        type="text"
                        name="country"
                        placeholder="Pays de résidence"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center mt-8 m-1 w-full">
                    <label htmlFor="city" className="mb-1 mr-5 text-xl font-medium">Ville</label>
                    <input
                        className="border-0 text-xl border-b-2 border-b-gray-500 border-gray-300 p-2 outline-0"
                        type="text"
                        name="city"
                        placeholder="Ville de résidence"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={isUpdated}
                    />
                </div>

                <div className="flex justify-between items-center mt-8 m-1 w-full">
                    <label htmlFor="cp" className="mb-1 mr-5 text-xl font-medium">Code postal</label>
                    <input
                        className="border-0 border-b-2 border-b-gray-500 text-xl outline-0 rounded p-2"
                        type="number"
                        name="cp"
                        placeholder="Code postal"
                        value={formData.cp}
                        onChange={handleChange}
                        disabled={isUpdated || isUpdated}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-8 p-3 px-6 shadow-md shadow-gray-300 rounded-full text-white text-xl bg-orange-600"
                    disabled={isPending}
                >
                    {buttonText}
                </button>
            </form>
        </div>
            );
            }
