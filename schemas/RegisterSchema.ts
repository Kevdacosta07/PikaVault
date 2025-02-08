import {z} from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string()
        .min(5, "Le nom doit contenir au minimum 5 caractères")
        .regex(/^\S+$/, "Le nom ne doit pas contenir d'espaces"),
    password: z.string()
        .min(6, "Votre mot de passe doit contenir au minimum 5 caractères")
        .regex(/^\S+$/, "Le mot de passe ne doit pas contenir d'espaces"),
})