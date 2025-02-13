"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation avec Zod
const contactSchema = z.object({
    email: z.string().min(1, "L'e-mail est requis").email("E-mail invalide"),
    subject: z.string().min(4, "L'objet doit contenir au moins 4 caractères"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const [btnText, setBtnText] = useState("Envoyer le message");
    const [btnClass, setBtnClass] = useState("bg-orange-500 hover:bg-orange-600");

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
        setBtnClass("bg-gray-500");

        try {
            const response = await fetch("/api/sendmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Email envoyé !");
                setBtnClass("bg-green-500");
                setBtnText("Email envoyé !");
                setTimeout(() => {
                    setBtnText("Envoyer le message");
                    setBtnClass("bg-orange-500 hover:bg-orange-600");
                    reset();
                }, 2000);
            } else {
                setBtnClass("bg-red-600");
                setBtnText("Erreur lors de l'envoi !");
            }
        } catch (e) {
            console.log(e);
            setBtnClass("bg-red-600");
            setBtnText("Erreur lors de l'envoi !");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex rounded flex-col items-center gap-4 px-4 py-10 mt-8 shadow-md shadow-gray-500 bg-opacity-90 bg-gray-200 w-[700px]"
        >
            <div className="flex flex-col items-center gap-1">
                <h2 className="text-4xl font-bold text-gray-800">Formulaire de contact</h2>
                <p className="text-md text-gray-600">Veuillez remplir le formulaire ci-dessous</p>
            </div>

            {/* Input Email */}
            <div className="w-[70%] flex flex-col items-start gap-2">
                <label htmlFor="email" className="text-md font-medium">E-mail</label>
                <input
                    className={`w-full outline-none shadow-md rounded text-md p-2 border 
                        ${errors.email ? "border-red-500" : ""}
                        ${touchedFields.email && !errors.email && getFieldState("email").isDirty ? "border-green-500" : "border-gray-300"}
                    `}
                    type="email"
                    id="email"
                    placeholder="Votre adresse e-mail"
                    disabled={isSubmitting}
                    {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Input Subject */}
            <div className="w-[70%] flex flex-col items-start gap-2 mt-5">
                <label htmlFor="subject" className="text-md font-medium">Objet</label>
                <input
                    className={`w-full outline-none shadow-md rounded text-md p-2 border opacity-100
                        ${errors.subject ? "border-red-500" : ""}
                        ${touchedFields.subject && !errors.subject && getFieldState("subject").isDirty ? "border-green-500" : "border-gray-300"}
                    `}
                    type="text"
                    id="subject"
                    placeholder="Votre objet"
                    disabled={isSubmitting}
                    {...register("subject")}
                />
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
            </div>

            {/* Input Message */}
            <div className="w-[70%] flex flex-col items-start gap-2 mt-5">
                <label htmlFor="message" className="text-md font-medium">Votre message</label>
                <textarea
                    className={`w-full h-[200px] shadow-md outline-none resize-none rounded-md p-2 border
                        ${errors.message ? "border-red-500" : ""}
                        ${touchedFields.message && !errors.message && getFieldState("message").isDirty ? "border-green-500" : "border-gray-300"}
                    `}
                    id="message"
                    placeholder="Votre message"
                    disabled={isSubmitting}
                    {...register("message")}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            {/* Bouton d'envoi */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`px-3 py-2 ${btnClass} mt-3 w-[70%] font-semibold text-md text-white transition-colors duration-200 shadow-md`}
            >
                {btnText}
            </button>
        </form>
    );
}
