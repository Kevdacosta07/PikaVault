"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faTag,
    faComment,
    faPaperPlane,
    faCheckCircle,
    faExclamationTriangle,
    faBolt
} from "@fortawesome/free-solid-svg-icons";

// Schéma de validation avec Zod
const contactSchema = z.object({
    email: z.string().min(1, "L'e-mail est requis").email("E-mail invalide"),
    subject: z.string().min(4, "L'objet doit contenir au moins 4 caractères"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const [btnText, setBtnText] = useState("Envoyer le message");
    const [btnClass, setBtnClass] = useState("bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600");
    const [btnIcon, setBtnIcon] = useState(faPaperPlane);

    const {
        register,
        handleSubmit,
        reset,
        getFieldState,
        formState: { errors, touchedFields, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ContactFormData) => {
        setBtnText("Envoi en cours...");
        setBtnClass("bg-gradient-to-r from-gray-400 to-gray-500");
        setBtnIcon(faBolt);

        try {
            const response = await fetch("/api/sendmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Email envoyé !");
                setBtnClass("bg-gradient-to-r from-green-500 to-emerald-500");
                setBtnText("Message envoyé ! ⚡");
                setBtnIcon(faCheckCircle);
                setTimeout(() => {
                    setBtnText("Envoyer le message");
                    setBtnClass("bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600");
                    setBtnIcon(faPaperPlane);
                    reset();
                }, 3000);
            } else {
                setBtnClass("bg-gradient-to-r from-red-500 to-red-600");
                setBtnText("Erreur lors de l'envoi !");
                setBtnIcon(faExclamationTriangle);
                setTimeout(() => {
                    setBtnText("Réessayer");
                    setBtnClass("bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600");
                    setBtnIcon(faPaperPlane);
                }, 3000);
            }
        } catch (e) {
            console.log(e);
            setBtnClass("bg-gradient-to-r from-red-500 to-red-600");
            setBtnText("Erreur lors de l'envoi !");
            setBtnIcon(faExclamationTriangle);
            setTimeout(() => {
                setBtnText("Réessayer");
                setBtnClass("bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600");
                setBtnIcon(faPaperPlane);
            }, 3000);
        }
    };

    const getInputClassName = (fieldName: keyof ContactFormData) => {
        const fieldState = getFieldState(fieldName);
        const hasError = errors[fieldName];
        const isTouched = touchedFields[fieldName];
        const isValid = isTouched && !hasError && fieldState.isDirty;

        return `w-full pl-12 pr-4 py-4 text-gray-900 bg-white/70 backdrop-blur-sm border-2 rounded-2xl 
                outline-none transition-all duration-300 placeholder-gray-500
                ${hasError
            ? "border-red-400 focus:border-red-500 bg-red-50/50"
            : isValid
                ? "border-green-400 focus:border-green-500 bg-green-50/50"
                : "border-gray-200 focus:border-yellow-400 hover:border-yellow-300"
        }
                ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}
                focus:shadow-lg hover:shadow-md`;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-w-lg mx-auto">

            {/* Champ Email */}
            <div className="space-y-3">
                <label htmlFor="email" className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
                    Votre adresse e-mail
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className={`transition-colors duration-300 ${
                                errors.email
                                    ? "text-red-500"
                                    : touchedFields.email && !errors.email && getFieldState("email").isDirty
                                        ? "text-green-500"
                                        : "text-gray-400"
                            }`}
                        />
                    </div>
                    <input
                        type="email"
                        id="email"
                        placeholder="dresseur@pikavault.ch"
                        disabled={isSubmitting}
                        className={getInputClassName("email")}
                        {...register("email")}
                    />
                </div>
                {errors.email && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        {errors.email.message}
                    </div>
                )}
            </div>

            {/* Champ Objet */}
            <div className="space-y-3">
                <label htmlFor="subject" className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                    <FontAwesomeIcon icon={faTag} className="text-purple-500" />
                    Objet de votre message
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <FontAwesomeIcon
                            icon={faTag}
                            className={`transition-colors duration-300 ${
                                errors.subject
                                    ? "text-red-500"
                                    : touchedFields.subject && !errors.subject && getFieldState("subject").isDirty
                                        ? "text-green-500"
                                        : "text-gray-400"
                            }`}
                        />
                    </div>
                    <input
                        type="text"
                        id="subject"
                        placeholder="Question sur une carte Pikachu ⚡"
                        disabled={isSubmitting}
                        className={getInputClassName("subject")}
                        {...register("subject")}
                    />
                </div>
                {errors.subject && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        {errors.subject.message}
                    </div>
                )}
            </div>

            {/* Champ Message */}
            <div className="space-y-3">
                <label htmlFor="message" className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                    <FontAwesomeIcon icon={faComment} className="text-green-500" />
                    Votre message
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-4 z-10">
                        <FontAwesomeIcon
                            icon={faComment}
                            className={`transition-colors duration-300 ${
                                errors.message
                                    ? "text-red-500"
                                    : touchedFields.message && !errors.message && getFieldState("message").isDirty
                                        ? "text-green-500"
                                        : "text-gray-400"
                            }`}
                        />
                    </div>
                    <textarea
                        id="message"
                        rows={6}
                        placeholder="Bonjour ! J'aimerais savoir si vous avez des cartes Pikachu rares en stock... ⚡"
                        disabled={isSubmitting}
                        className={`${getInputClassName("message")} resize-none pt-4`}
                        {...register("message")}
                    />
                </div>
                {errors.message && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        {errors.message.message}
                    </div>
                )}
            </div>

            {/* Bouton d'envoi */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                        w-full py-4 px-8 text-white font-bold text-lg rounded-2xl
                        shadow-xl hover:shadow-2xl transition-all duration-300 
                        transform hover:-translate-y-1 active:translate-y-0
                        disabled:cursor-not-allowed disabled:transform-none
                        ${btnClass}
                        ${isSubmitting ? "animate-pulse" : ""}
                    `}
                >
                    <span className="flex items-center justify-center gap-3">
                        <FontAwesomeIcon
                            icon={btnIcon}
                            className={`${isSubmitting ? "animate-spin" : ""}`}
                        />
                        {btnText}
                    </span>
                </button>
            </div>

            {/* Message d'encouragement */}
            <div className="text-center">
                <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                    <span className="text-yellow-500">⚡</span>
                    Notre équipe vous répondra plus vite qu&apos;un Pikachu !
                    <span className="text-yellow-500">⚡</span>
                </p>
            </div>
        </form>
    );
}