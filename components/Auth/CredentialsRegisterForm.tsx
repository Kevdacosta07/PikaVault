"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "@/actions/ArticleActions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

// Schéma de validation avec Zod
const registerSchema = z.object({
    email: z.string()
        .min(1, "L'e-mail est requis")
        .email("E-mail invalide"),
    password: z.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    name: z.string()
        .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères")
        .regex(/^\S+$/, "Le nom ne doit pas contenir d'espaces"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function CredentialsRegisterForm() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);

    // Gestion du formulaire avec React Hook Form
    const {
        register,
        handleSubmit,
        setError,
        getFieldState,
        formState: { errors, touchedFields },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange", // Validation dynamique
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);

        const response = await signUp(formData);
        setLoading(false);

        if (!response.success) {
            setServerError(true);
            if (response.errors) {
                setError("email", { message: response.errors[0]?.message });
                setError("password", { message: response.errors[1]?.message });
                setError("name", { message: response.errors[2]?.message });
            } else {
                toast.error("Erreur inconnue lors de l'inscription.");
            }
        } else {
            toast.success("Inscription réussie !");
            window.location.href = "/auth/login";
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] sm:w-[100%] flex flex-col items-center">

            {/* Input Name */}
            <div className="w-[80%] md:w-[90%] xl:w-[100%] my-3 flex flex-col gap-1">
                <input
                    className={`shadow-md shadow-gray-300 text-black outline-none py-2 px-3 border bg-gray-100 rounded w-full 
                        ${errors.name || serverError ? "border-red-500" : ""}
                        ${touchedFields.name && !errors.name && getFieldState("name").isDirty ? "border-green-500" : "border-gray-400"}
                    `}
                    id="name"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    disabled={loading}
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Input Email */}
            <div className="w-[80%] md:w-[90%] xl:w-[100%] my-3 flex flex-col gap-1">
                <input
                    className={`shadow-md shadow-gray-300 text-black outline-none py-2 px-3 border bg-gray-100 rounded w-full 
                        ${errors.email || serverError ? "border-red-500" : ""}
                        ${touchedFields.email && !errors.email && getFieldState("email").isDirty ? "border-green-500" : "border-gray-400"}
                    `}
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    disabled={loading}
                    {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Input Password */}
            <div className="w-[80%] md:w-[90%] xl:w-[100%] my-3 flex flex-col gap-1">
                <input
                    className={`shadow-md shadow-gray-300 text-black outline-none py-2 px-3 border bg-gray-100 rounded w-full 
                        ${errors.password || serverError ? "border-red-500" : ""}
                        ${touchedFields.password && !errors.password && getFieldState("password").isDirty ? "border-green-500" : "border-gray-400"}
                    `}
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    disabled={loading}
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Possède déjà un compte */}
            <div className={"flex flex-col items-center justify-center my-3"}>
                <p className={"text-md text-gray-600"}>Vous possédez déjà un compte ?</p>
                <Link href={"/auth/login"} className={"text-blue-500 font-medium text-md underline"} >Connectez-vous</Link>
            </div>

            {/* Bouton d'inscription */}
            <button
                type="submit"
                disabled={loading}
                className="text-white shadow-md shadow-gray-400 bg-gray-800 hover:shadow-xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 rounded-md w-fit px-4 py-2 text-xl mt-3"
            >
                {loading ? "Création en cours..." : "Créer votre compte"}
            </button>
        </form>
    );
}
