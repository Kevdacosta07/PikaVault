import {z} from "zod";

export const registerSchema = z.object({
    email: z.string().email("Veuillez saisir une adresse email valide."),
    name: z.string()
        .min(4, "Le nom d'utilisateur doit contenir au minimum 4 caractères")
        .regex(/^\S+$/, "Le nom d'utilisateur ne doit pas contenir d'espaces"),
    password: z.string()
        .min(6, "Votre mot de passe doit contenir au minimum 6 caractères")
        .regex(/^\S+$/, "Le mot de passe ne doit pas contenir d'espaces"),
})