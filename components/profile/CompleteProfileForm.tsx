"use client";

import { useState } from "react";
import { createProfile } from "@/actions/ProfileActions";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddressAutocomplete from "@/components/profile/AdresseAutoComplete";
import CityAutocomplete from "@/components/profile/CityAutoComplete";

// 🛠 Définition du schéma de validation avec Zod
const profileSchema = z.object({
    name: z.string().min(3, "Le nom complet doit contenir au moins 3 caractères"),
    adress: z.string().min(5, "L'adresse est requise"),
    country: z.string().min(2, "Le pays est requis"),
    city: z.string().min(2, "La ville est requise"),
    cp: z.string().regex(/^\d{4,7}$/, "Le code postal doit être un nombre de 4 à 7 chiffres"),
});

// 🛠 Définition du type basé sur le schéma
type ProfileFormData = z.infer<typeof profileSchema>;

export default function CompleteProfileForm({ id }: { id: string }) {
    const [isUpdated, setIsUpdated] = useState(false);
    const [buttonText, setButtonText] = useState("Compléter votre profil");
    const [buttonClass, setButtonClass] = useState("text-white bg-orange-500 hover:bg-orange-600");

    // Utilisation de React Hook Form avec Zod
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            adress: "",
            country: "",
            city: "",
            cp: "",
        },
    });

    // Gestion de la soumission du formulaire
    const onSubmit = async (data: ProfileFormData) => {
        setButtonText("Mise à jour...");
        setButtonClass("text-gray-700 bg-gray-300 hover:bg-gray-400");

        try {
            await createProfile({
                user_id: id,
                fullname: data.name,
                adress: data.adress,
                country: data.country,
                city: data.city,
                cp: parseInt(data.cp, 10),
            });
            setButtonText("✅ Profile complété avec succès !");
            setButtonClass("text-white bg-green-300 hover:bg-green-400");
            setIsUpdated(true);
            setTimeout(() => redirect(`/profile/${id}`), 1000);
        } catch (error) {
            setButtonText(`❌ Erreur : ${error}`);
            setTimeout(() => setButtonText("Compléter votre profil"), 2000);
        }
    };

    return (
        <div className="flex flex-col w-[650px] justify-center items-start pt-4 px-14 py-8 shadow-lg rounded-md bg-opacity-85 bg-gray-100 shadow-gray-700">
            <div className="flex-col w-full mt-3 flex items-center justify-center">
                <h2 className="font-bold text-black text-4xl">Votre adresse de livraison</h2>
                <h2 className="text-xl text-orange-600 font-medium mt-1">
                    Compléter votre profil avec une adresse
                </h2>
            </div>

            <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                {/* Nom Complet */}
                <div className="flex flex-col items-start mt-8 w-full">
                    <label htmlFor="fullname" className="mb-1 font-medium">Nom complet</label>
                    <input
                        {...register("name")}
                        className={`w-full border shadow-md rounded p-2 outline-none ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        type="text"
                        placeholder="Prénom & nom"
                        disabled={isUpdated}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Adresse */}
                <div className=" flex-col items-start mt-3 w-full">
                    <div className={"flex w-full items-start"}>
                        <label className="text-md font-medium">Adresse</label>
                    </div>
                    <AddressAutocomplete onChange={(value) => setValue("adress", value)}/>
                    <div className={"flex w-full items-start"}>
                        {errors.adress && <p className="text-red-500 text-sm">{errors.adress.message}</p>}
                    </div>
                </div>

                {/* Pays */}
                <div className="flex flex-col items-start mt-3 w-full">
                    <label htmlFor="country" className="mb-1 font-medium">Pays</label>
                    <input
                        {...register("country")}
                        className={`w-full border shadow-md rounded p-2 outline-none ${
                            errors.country ? "border-red-500" : "border-gray-300"
                        }`}
                        type="text"
                        placeholder="Pays de résidence"
                        disabled={isUpdated}
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                </div>

                {/* Ville */}
                <div className="w-full flex-col left-0 gap-2 mt-3">
                    <div className={"w-full flex items-start"}>
                        <label className="text-md font-medium">Ville</label>
                    </div>
                    <CityAutocomplete onChange={(value) => setValue("city", value)}/>
                    <div className={"flex w-full items-start"}>
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>
                </div>

                {/* Code Postal */}
                <div className="flex flex-col items-start mt-3 w-full">
                    <label htmlFor="cp" className="mb-1 font-medium">Code postal</label>
                    <input
                        {...register("cp")}
                        className={`w-full border shadow-md rounded p-2 outline-none ${
                            errors.cp ? "border-red-500" : "border-gray-300"
                        }`}
                        type="text"
                        placeholder="Code postal"
                        disabled={isUpdated}
                    />
                    {errors.cp && <p className="text-red-500 text-sm">{errors.cp.message}</p>}
                </div>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    className={`mt-8 py-3 shadow-md font-semibold rounded-md text-white text-xl transition-colors duration-200 w-full ${buttonClass}`}
                    disabled={isSubmitting}
                >
                    {buttonText}
                </button>
            </form>
        </div>
    );
}
