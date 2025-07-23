"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faUser,
    faEnvelope,
    faLock,
    faCoins,
    faCheckCircle,
    faExclamationTriangle,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { editUser } from "@/actions/ProfileActions";

type User = {
    id: string;
    name: string | null;
    email: string | null;
    password: string | null;
    image: string | null;
    points: number;
    admin: number;
    emailVerified: Date | null;
};

export default function ProfileForm({ user }: { user: User }) {
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name || "",
        password: "",
    });

    const [inputPasswordType, setInputPasswordType] = useState("password");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordVisibility = () => {
        setInputPasswordType(inputPasswordType === "password" ? "text" : "password");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
            await editUser(formData);
            setStatus('success');

            // Reset form after success
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        } catch (err) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue");

            setTimeout(() => {
                setStatus('idle');
                setErrorMessage("");
            }, 4000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email - Read Only */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                        Adresse e-mail
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={user.email ?? ""}
                            disabled
                            className="w-full px-4 py-3 pl-12 bg-gray-100 border border-gray-300 rounded-xl text-gray-600 cursor-not-allowed focus:outline-none"
                        />
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            {user.emailVerified ? (
                                <div className="flex items-center text-green-600">
                                    <FontAwesomeIcon icon={faCheckCircle} className="mr-1 text-sm" />
                                    <span className="text-xs font-medium">Vérifié</span>
                                </div>
                            ) : (
                                <div className="flex items-center text-amber-600">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1 text-sm" />
                                    <span className="text-xs font-medium">Non vérifié</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        Votre adresse e-mail ne peut pas être modifiée après la création du compte
                    </p>
                </div>

                {/* Points - Read Only */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faCoins} className="mr-2 text-amber-500" />
                        Points de fidélité PikaVault
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="points"
                            value={`${user.points} points`}
                            disabled
                            className="w-full px-4 py-3 pl-12 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl text-gray-700 cursor-not-allowed focus:outline-none font-semibold"
                        />
                        <FontAwesomeIcon
                            icon={faCoins}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500"
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        Gagnez des points en achetant et vendant des cartes sur PikaVault
                    </p>
                </div>

                {/* Nom d'utilisateur - Editable */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                        Nom d&#39;utilisateur *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Entrez votre nom d'utilisateur"
                            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                        />
                        <FontAwesomeIcon
                            icon={faUser}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        Ce nom sera visible par les autres utilisateurs lors de vos transactions
                    </p>
                </div>

                {/* Mot de passe - Editable */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FontAwesomeIcon icon={faLock} className="mr-2 text-red-500" />
                        Nouveau mot de passe
                    </label>
                    <div className="relative">
                        <input
                            type={inputPasswordType}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Entrez un nouveau mot de passe (optionnel)"
                            className="w-full px-4 py-3 pl-12 pr-12 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <FontAwesomeIcon
                            icon={faLock}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <button
                            type="button"
                            onClick={handlePasswordVisibility}
                            disabled={isLoading}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                        >
                            <FontAwesomeIcon
                                icon={inputPasswordType === "password" ? faEye : faEyeSlash}
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">
                        Laissez vide si vous ne souhaitez pas changer votre mot de passe
                    </p>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3" />
                        <div className="text-green-800">
                            <p className="font-semibold">Informations mises à jour avec succès !</p>
                            <p className="text-sm">Vos modifications ont été sauvegardées.</p>
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

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading || !formData.name.trim()}
                        className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
                    >
                        {isLoading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-3" />
                                Mise à jour en cours...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
                                Mettre à jour mes informations
                            </>
                        )}
                    </button>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 mr-3 mt-1" />
                        <div className="text-blue-800">
                            <p className="font-semibold text-sm">Conseils de sécurité</p>
                            <ul className="text-xs mt-2 space-y-1">
                                <li>• Utilisez un mot de passe fort avec au moins 8 caractères</li>
                                <li>• Mélangez lettres majuscules, minuscules, chiffres et symboles</li>
                                <li>• Vérifiez votre adresse e-mail pour recevoir les notifications importantes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}