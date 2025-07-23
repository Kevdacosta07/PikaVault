"use client";

import { useState } from "react";
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
    faSave,
    faEdit,
    faShieldAlt
} from "@fortawesome/free-solid-svg-icons";
import { editProfile } from "@/actions/ProfileActions";

type Profile = {
    id: string;
    name: string;
    adress: string;
    country: string;
    user_id: string;
    cp: number;
    city: string;
};

export default function UpdateProfileForm({ userProfile }: { userProfile: Profile }) {
    const [formData, setFormData] = useState({
        id: userProfile.id,
        name: userProfile.name || "",
        adress: userProfile.adress || "",
        country: userProfile.country || "",
        city: userProfile.city || "",
        cp: userProfile.cp || 0,
        user_id: userProfile.user_id || "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'cp' ? parseInt(value) || 0 : value,
        });

        // Reset status when user types
        if (status !== 'idle') {
            setStatus('idle');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');

        try {
            await editProfile(formData);
            setStatus('success');

            // Reset status after success
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue");

            setTimeout(() => {
                setStatus('idle');
                setErrorMessage("");
            }, 4000);
        } finally {
            setIsLoading(false);
        }
    };

    // Liste des pays européens populaires
    const popularCountries = [
        "France", "Allemagne", "Belgique", "Suisse", "Italie",
        "Espagne", "Pays-Bas", "Autriche", "Portugal", "Luxembourg"
    ];

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section Nom complet */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                        Nom complet *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Prénom et nom de famille"
                            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                        />
                        <FontAwesomeIcon
                            icon={faUser}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        Nom qui apparaîtra sur vos étiquettes d&#39;expédition
                    </p>
                </div>

                {/* Section Adresse */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-500" />
                        Adresse complète *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="adress"
                            value={formData.adress}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Numéro et nom de rue, appartement..."
                            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                        />
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        Adresse exacte pour la livraison de vos commandes
                    </p>
                </div>

                {/* Section Ville et Code postal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ville */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <FontAwesomeIcon icon={faCity} className="mr-2 text-purple-500" />
                            Ville *
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={isLoading}
                                placeholder="Nom de votre ville"
                                className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            />
                            <FontAwesomeIcon
                                icon={faCity}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Code postal */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <FontAwesomeIcon icon={faMailBulk} className="mr-2 text-orange-500" />
                            Code postal *
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="cp"
                                value={formData.cp || ''}
                                onChange={handleChange}
                                disabled={isLoading}
                                placeholder="Code postal"
                                className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                                min="1"
                                max="99999"
                            />
                            <FontAwesomeIcon
                                icon={faMailBulk}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Pays */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faGlobe} className="mr-2 text-indigo-500" />
                        Pays *
                    </label>
                    <div className="relative">
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                            required
                        >
                            <option value="">Sélectionnez votre pays</option>
                            {popularCountries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                            <option value="other">Autre pays...</option>
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
                    <p className="text-xs text-gray-500">
                        Nous livrons dans toute l&#39;Europe
                    </p>
                </div>

                {/* Champ de saisie libre pour "Autre pays" */}
                {formData.country === "other" && (
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <FontAwesomeIcon icon={faEdit} className="mr-2 text-gray-500" />
                            Spécifiez votre pays
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country === "other" ? "" : formData.country}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Entrez le nom de votre pays"
                            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                        />
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                )}

                {/* Messages de statut */}
                {status === 'success' && (
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3" />
                        <div className="text-green-800">
                            <p className="font-semibold">Adresse mise à jour avec succès !</p>
                            <p className="text-sm">Vos informations de livraison ont été sauvegardées.</p>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mr-3" />
                        <div className="text-red-800">
                            <p className="font-semibold">Erreur lors de la mise à jour</p>
                            <p className="text-sm">{errorMessage || "Une erreur inattendue s'est produite."}</p>
                        </div>
                    </div>
                )}

                {/* Bouton de soumission */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading || !formData.name.trim() || !formData.adress.trim() || !formData.city.trim() || !formData.country || !formData.cp}
                        className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-emerald-600"
                    >
                        {isLoading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-3" />
                                Mise à jour en cours...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faSave} className="mr-3" />
                                Mettre à jour l&#39;adresse de livraison
                            </>
                        )}
                    </button>
                </div>

                {/* Section informative */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-3 mt-1" />
                        <div className="text-blue-800">
                            <p className="font-semibold text-sm">Informations de livraison sécurisées</p>
                            <ul className="text-xs mt-2 space-y-1">
                                <li>• Vos données sont chiffrées et protégées</li>
                                <li>• Utilisées uniquement pour la livraison de vos commandes</li>
                                <li>• Partagées exclusivement avec nos transporteurs de confiance</li>
                                <li>• Vous pouvez modifier ces informations à tout moment</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Aperçu de l'adresse */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-600" />
                        Aperçu de votre adresse de livraison
                    </h4>
                    <div className="text-sm text-gray-700 space-y-1">
                        <div className="font-medium">{formData.name || "Nom complet"}</div>
                        <div>{formData.adress || "Adresse"}</div>
                        <div>
                            {formData.cp ? `${formData.cp} ` : "Code postal "}
                            {formData.city || "Ville"}
                        </div>
                        <div className="font-medium">{formData.country || "Pays"}</div>
                    </div>
                </div>
            </form>
        </div>
    );
}