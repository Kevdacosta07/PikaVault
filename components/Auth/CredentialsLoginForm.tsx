
"use client";

import { signIn } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";

// Schéma de validation avec Zod
const loginSchema = z.object({
    email: z.string().min(1, "L'e-mail est requis").email("E-mail invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function CredentialsLoginForm() {
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Hook pour gérer le formulaire
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // Vérifie en temps réel si l'utilisateur tape pour enlever l'erreur d'authentification
    useEffect(() => {
        if (watch("email") || watch("password")) {
            setAuthError(false);
        }
    }, [watch("email"), watch("password")]);

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (result?.error) {
            toast.error("Identifiants incorrects !");
            setAuthError(true);
            setError("email", { message: "Identifiants incorrects" });
            setError("password", { message: "Vérifiez votre mot de passe" });
        } else {
            toast.success("Connexion réussie !");
            setTimeout(() => (window.location.href = `/boutique`), 1500);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse e-mail
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    disabled={loading}
                    {...register("email")}
                    className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-colors duration-200 font-medium text-lg ${
                        errors.email || authError
                            ? "border-red-400 bg-red-50 text-red-900"
                            : "border-gray-200 bg-white focus:bg-gray-50"
                    }`}
                />
                {errors.email && (
                    <p className="text-red-600 text-sm mt-2 font-medium">{errors.email.message}</p>
                )}
            </div>

            {/* Input Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe
                </label>
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={loading}
                        {...register("password")}
                        className={`w-full px-4 py-3.5 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-colors duration-200 font-medium text-lg ${
                            errors.password || authError
                                ? "border-red-400 bg-red-50 text-red-900"
                                : "border-gray-200 bg-white focus:bg-gray-50"
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-lg" />
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-600 text-sm mt-2 font-medium">{errors.password.message}</p>
                )}
            </div>

            {/* Options et actions */}
            <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-gray-600 font-medium">Se souvenir de moi</span>
                </label>
                <button type="button" className="text-yellow-600 hover:text-yellow-700 font-semibold underline decoration-2 underline-offset-2">
                    Mot de passe oublié ?
                </button>
            </div>

            {/* Bouton de connexion */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:transform-none shadow-lg hover:shadow-xl"
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-3">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-lg" />
                        Connexion en cours...
                    </div>
                ) : (
                    "Se connecter"
                )}
            </button>
        </form>
    );
}