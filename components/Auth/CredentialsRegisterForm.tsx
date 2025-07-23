
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "@/actions/ArticleActions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner, faCheck, faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

// Schéma de validation avec Zod
const registerSchema = z.object({
    email: z.string()
        .min(1, "E-mail requis")
        .email("E-mail invalide"),
    password: z.string()
        .min(6, "Min. 6 caractères")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Maj, min et chiffre requis"),
    name: z.string()
        .min(4, "Min. 4 caractères")
        .max(20, "Max. 20 caractères")
        .regex(/^[a-zA-Z0-9_]+$/, "Lettres, chiffres et _ uniquement"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function CredentialsRegisterForm() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Gestion du formulaire avec React Hook Form
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, touchedFields },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        setServerError(false);

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
                toast.error("Erreur lors de l'inscription.");
            }
        } else {
            toast.success("Inscription réussie !");
            window.location.href = "/auth/login";
        }
    };

    // Validation en temps réel
    const getFieldStatus = (fieldName: keyof RegisterFormData) => {
        const fieldState = touchedFields[fieldName];
        const hasError = errors[fieldName];
        const fieldValue = watch(fieldName);

        if (!fieldState) return "default";
        if (hasError) return "error";
        if (fieldValue && !hasError) return "success";
        return "default";
    };

    const getFieldIcon = (fieldName: keyof RegisterFormData, defaultIcon: any) => {
        const status = getFieldStatus(fieldName);
        if (status === "success") return faCheck;
        return defaultIcon;
    };

    const getFieldIconColor = (fieldName: keyof RegisterFormData) => {
        const status = getFieldStatus(fieldName);
        if (status === "success") return "text-green-500";
        if (status === "error") return "text-red-500";
        return "text-gray-400";
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Nom d'utilisateur */}
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom d'utilisateur
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon
                            icon={getFieldIcon("name", faUser)}
                            className={`${getFieldIconColor("name")} text-base`}
                        />
                    </div>
                    <input
                        id="name"
                        type="text"
                        placeholder="votrenom"
                        disabled={loading}
                        {...register("name")}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-colors duration-200 font-medium text-base ${
                            getFieldStatus("name") === "error"
                                ? "border-red-400 bg-red-50 text-red-900"
                                : getFieldStatus("name") === "success"
                                    ? "border-green-400 bg-green-50"
                                    : "border-gray-200 bg-white focus:bg-gray-50"
                        }`}
                    />
                </div>
                {errors.name && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{errors.name.message}</p>
                )}
            </div>

            {/* Input Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse e-mail
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon
                            icon={getFieldIcon("email", faEnvelope)}
                            className={`${getFieldIconColor("email")} text-base`}
                        />
                    </div>
                    <input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        disabled={loading}
                        {...register("email")}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-colors duration-200 font-medium text-base ${
                            getFieldStatus("email") === "error"
                                ? "border-red-400 bg-red-50 text-red-900"
                                : getFieldStatus("email") === "success"
                                    ? "border-green-400 bg-green-50"
                                    : "border-gray-200 bg-white focus:bg-gray-50"
                        }`}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</p>
                )}
            </div>

            {/* Input Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon
                            icon={getFieldIcon("password", faLock)}
                            className={`${getFieldIconColor("password")} text-base`}
                        />
                    </div>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={loading}
                        {...register("password")}
                        className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-colors duration-200 font-medium text-base ${
                            getFieldStatus("password") === "error"
                                ? "border-red-400 bg-red-50 text-red-900"
                                : getFieldStatus("password") === "success"
                                    ? "border-green-400 bg-green-50"
                                    : "border-gray-200 bg-white focus:bg-gray-50"
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-base" />
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</p>
                )}

                {/* Indicateur de force du mot de passe */}
                {watch("password") && (
                    <div className="mt-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className={`flex items-center gap-2 ${
                                watch("password")?.length >= 6 ? "text-green-600" : "text-gray-400"
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    watch("password")?.length >= 6 ? "bg-green-500" : "bg-gray-300"
                                }`}></div>
                                6+ caractères
                            </div>
                            <div className={`flex items-center gap-2 ${
                                /[A-Z]/.test(watch("password") || "") ? "text-green-600" : "text-gray-400"
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    /[A-Z]/.test(watch("password") || "") ? "bg-green-500" : "bg-gray-300"
                                }`}></div>
                                Majuscule
                            </div>
                            <div className={`flex items-center gap-2 ${
                                /[a-z]/.test(watch("password") || "") ? "text-green-600" : "text-gray-400"
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    /[a-z]/.test(watch("password") || "") ? "bg-green-500" : "bg-gray-300"
                                }`}></div>
                                Minuscule
                            </div>
                            <div className={`flex items-center gap-2 ${
                                /\d/.test(watch("password") || "") ? "text-green-600" : "text-gray-400"
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    /\d/.test(watch("password") || "") ? "bg-green-500" : "bg-gray-300"
                                }`}></div>
                                Chiffre
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Conditions d'utilisation */}
            <div className="pt-3">
                <label className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        required
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                        J'accepte les{" "}
                        <button type="button" className="text-yellow-600 hover:text-yellow-700 font-semibold underline">
                            conditions d'utilisation
                        </button>{" "}
                        et la{" "}
                        <button type="button" className="text-yellow-600 hover:text-yellow-700 font-semibold underline">
                            politique de confidentialité
                        </button>
                    </span>
                </label>
            </div>

            {/* Bouton d'inscription */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3.5 px-6 rounded-xl font-bold text-base hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:transform-none shadow-lg hover:shadow-xl"
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-3">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
                        Création en cours...
                    </div>
                ) : (
                    "Créer mon compte"
                )}
            </button>
        </form>
    );
}