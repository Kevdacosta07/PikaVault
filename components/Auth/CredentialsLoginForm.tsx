"use client";

import { signIn } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

// Schéma de validation avec Zod
const loginSchema = z.object({
    email: z.string().min(1, "L'e-mail est requis").email("E-mail invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function CredentialsLoginForm() {
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(false); // État pour gérer l'erreur d'authentification

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
            setAuthError(true); // Active la bordure rouge
            setError("email", { message: "Identifiants incorrects" });
            setError("password", { message: "Vérifiez votre mot de passe" });
        } else {
            toast.success("Connexion réussie !");
            setTimeout(() => (window.location.href = `/boutique`), 1500);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4 p-5 pt-0 rounded-lg"
        >
            {/* Input Email */}
            <div className="w-[280px]">
                <input
                    type="email"
                    placeholder="Votre e-mail"
                    disabled={loading}
                    {...register("email")}
                    className={`border p-2 rounded-md shadow-md w-full outline-none
                        ${errors.email || authError ? "border-red-500" : "border-gray-300"}
                    `}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Input Password */}
            <div className="w-[280px]">
                <input
                    type="password"
                    placeholder="Votre mot de passe"
                    disabled={loading}
                    {...register("password")}
                    className={`border p-2 rounded-md shadow-md text-lg w-full outline-none
                        ${errors.password || authError ? "border-red-500" : "border-gray-300"}
                    `}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="my-6 flex flex-col justify-center text-center items-center gap-8">
                <p className={"flex flex-col"}>
                    Vous n&#39;avez pas de compte ? {" "}
                    <Link className="text-blue-500 underline hover:text-blue-600 duration-200" href="/auth/register">
                        Inscrivez-vous
                    </Link>
                </p>
            </div>

            {/* Bouton de connexion */}
            <button
                type="submit"
                className="text-xl py-2 px-6 text-gray-100 bg-gray-700 rounded-md transition-all duration-300 hover:scale-105 hover:bg-gray-800 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Connexion..." : "Se connecter"}
            </button>
        </form>
    );
}
