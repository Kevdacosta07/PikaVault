
"use client";

import { useState } from "react";
import { createProfile } from "@/actions/ProfileActions";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faMapMarkerAlt,
    faGlobe,
    faCity,
    faMailBulk,
    faCheckCircle,
    faExclamationTriangle,
    faSpinner,
    faPlus,
    faShieldAlt,
    faRocket,
    faStar,
    faAward
} from "@fortawesome/free-solid-svg-icons";

// Définition du schéma de validation avec Zod
const profileSchema = z.object({
    name: z.string().min(3, "Le nom complet doit contenir au moins 3 caractères"),
    adress: z.string().min(5, "L'adresse est requise"),
    country: z.string().min(2, "Le pays est requis"),
    city: z.string().min(2, "La ville est requise"),
    cp: z.string().regex(/^\d{4,7}$/, "Le code postal doit être un nombre de 4 à 7 chiffres"),
});

// Définition du type basé sur le schéma
type ProfileFormData = z.infer<typeof profileSchema>;

export default function CompleteProfileForm({ id }: { id: string }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    // Utilisation de React Hook Form avec Zod
    const {
        register,
        handleSubmit,
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
        setStatus('loading');

        try {
            await createProfile({
                user_id: id,
                fullname: data.name,
                adress: data.adress,
                country: data.country,
                city: data.city,
                cp: parseInt(data.cp, 10),
            });
            setStatus('success');

            // Redirection après succès
            setTimeout(() => {
                redirect(`/profile/${id}`);
            }, 2000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue");

            setTimeout(() => {
                setStatus('idle');
                setErrorMessage("");
            }, 4000);
        }
    };

    // Liste des pays européens populaires
    const popularCountries = [
        "France", "Allemagne", "Belgique", "Suisse", "Italie",
        "Espagne", "Pays-Bas", "Autriche", "Portugal", "Luxembourg"
    ];

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header motivationnel */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-4">
                    <FontAwesomeIcon icon={faRocket} className="text-blue-600 mr-2" />
                    <span className="text-blue-800 font-semibold text-sm">Dernière étape</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Complétez votre profil PikaVault
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Ajoutez votre adresse de livraison pour commencer à acheter et vendre
                </p>

                {/* Avantages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl mb-2" />
                        <div className="text-sm font-semibold text-green-800">Livraisons rapides</div>
                        <div className="text-xs text-green-600">Expédition sous 24h</div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 text-2xl mb-2" />
                        <div className="text-sm font-semibold text-blue-800">100% sécurisé</div>
                        <div className="text-xs text-blue-600">Données protégées</div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <FontAwesomeIcon icon={faStar} className="text-amber-600 text-2xl mb-2" />
                        <div className="text-sm font-semibold text-amber-800">Points bonus</div>
                        <div className="text-xs text-amber-600">+50 points offerts</div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nom complet */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                        Nom complet *
                    </label>
                    <div className="relative">
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Prénom et nom de famille"
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full px-4 py-3 pl-12 bg-white border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.name
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                        />
                        <FontAwesomeIcon
                            icon={faUser}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                    {errors.name && (
                        <div className="flex items-center text-red-600 text-sm">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            {errors.name.message}
                        </div>
                    )}
                </div>

                {/* Adresse simple */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-500" />
                        Adresse complète *
                    </label>
                    <div className="relative">
                        <input
                            {...register("adress")}
                            type="text"
                            placeholder="Numéro, rue, appartement..."
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full px-4 py-3 pl-12 bg-white border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.adress
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-green-500"
                            }`}
                        />
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                    {errors.adress && (
                        <div className="flex items-center text-red-600 text-sm">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            {errors.adress.message}
                        </div>
                    )}
                    <p className="text-xs text-gray-500">
                        Exemple: 123 Rue de la Paix, Appartement 4B
                    </p>
                </div>

                {/* Pays */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faGlobe} className="mr-2 text-indigo-500" />
                        Pays *
                    </label>
                    <div className="relative">
                        <select
                            {...register("country")}
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full px-4 py-3 pl-12 bg-white border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none ${
                                errors.country
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-indigo-500"
                            }`}
                        >
                            <option value="">Sélectionnez votre pays</option>
                            {popularCountries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        <FontAwesomeIcon
                            icon={faGlobe}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {errors.country && (
                        <div className="flex items-center text-red-600 text-sm">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            {errors.country.message}
                        </div>
                    )}
                </div>

                {/* Ville simple */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faCity} className="mr-2 text-purple-500" />
                        Ville *
                    </label>
                    <div className="relative">
                        <input
                            {...register("city")}
                            type="text"
                            placeholder="Nom de votre ville"
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full px-4 py-3 pl-12 bg-white border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.city
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-purple-500"
                            }`}
                        />
                        <FontAwesomeIcon
                            icon={faCity}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                    {errors.city && (
                        <div className="flex items-center text-red-600 text-sm">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            {errors.city.message}
                        </div>
                    )}
                </div>

                {/* Code postal */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faMailBulk} className="mr-2 text-orange-500" />
                        Code postal *
                    </label>
                    <div className="relative">
                        <input
                            {...register("cp")}
                            type="text"
                            placeholder="Code postal"
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full px-4 py-3 pl-12 bg-white border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.cp
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500"
                            }`}
                        />
                        <FontAwesomeIcon
                            icon={faMailBulk}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                    {errors.cp && (
                        <div className="flex items-center text-red-600 text-sm">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            {errors.cp.message}
                        </div>
                    )}
                </div>

                {/* Messages de statut */}
                {status === 'success' && (
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3" />
                        <div className="text-green-800">
                            <p className="font-semibold">Profil complété avec succès !</p>
                            <div className="flex items-center text-sm mt-1">
                                <FontAwesomeIcon icon={faAward} className="mr-1" />
                                Vous avez gagné 50 points PikaVault ! Redirection en cours...
                            </div>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mr-3" />
                        <div className="text-red-800">
                            <p className="font-semibold">Erreur lors de la création du profil</p>
                            <p className="text-sm">{errorMessage || "Une erreur inattendue s'est produite."}</p>
                        </div>
                    </div>
                )}

                {/* Bouton de soumission */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || status === 'loading' || status === 'success'}
                        className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
                    >
                        {status === 'loading' ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-3" />
                                Création du profil en cours...
                            </>
                        ) : status === 'success' ? (
                            <>
                                <FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
                                Profil créé avec succès !
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                                Compléter mon profil PikaVault
                            </>
                        )}
                    </button>
                </div>

                {/* Section informative */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-3 mt-1" />
                        <div className="text-blue-800">
                            <p className="font-semibold text-sm">Pourquoi nous avons besoin de ces informations ?</p>
                            <ul className="text-xs mt-2 space-y-1">
                                <li>• <strong>Livraisons</strong> : Pour expédier vos achats à la bonne adresse</li>
                                <li>• <strong>Vérification</strong> : Pour valider votre identité lors des ventes</li>
                                <li>• <strong>Sécurité</strong> : Pour protéger vos transactions</li>
                                <li>• <strong>Communication</strong> : Pour vous tenir informé de vos commandes</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Récompense */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faAward} className="text-amber-500 mr-3 text-xl" />
                        <div>
                            <p className="font-semibold text-amber-800">Bonus de bienvenue</p>
                            <p className="text-sm text-amber-700">
                                Recevez <strong>50 points PikaVault</strong> gratuits en complétant votre profil !
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}