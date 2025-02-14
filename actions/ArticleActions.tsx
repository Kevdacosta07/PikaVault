"use server"
import {prisma} from "@/lib/prisma";
import {registerSchema} from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";

export async function createArticle(formData: { title: string; description: string; imageUrl: string; edition?: string; type: string; amount: number; price: number; image: string; }) {
    await prisma.article.create({
        data: {
            title: formData.title,
            description: formData.description,
            edition: formData.edition,
            type: formData.type,
            price: Number(formData.price),
            amount: Number(formData.amount),
            image: formData.image,
        }
    })
}

export async function deleteArticle({article_id}: { article_id: string }) {
    await prisma.article.delete({
        where: {id: article_id}
    })
}

export async function signUp(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        let admin = 0;


        const validateData = registerSchema.safeParse({
            email: email,
            name: name,
            password: password
        });

        if (!validateData.success) {
            return { success: false, errors: validateData.error.errors };
        }

        // Vérifier si c'est le premier utilisateur
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            admin = 1;
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(validateData.data.password, 10);

        // Enregistrer l'utilisateur en base
        await prisma.user.create({
            data: {
                email: validateData.data.email.toLowerCase(),
                name: validateData.data.name.toLowerCase(),
                password: hashedPassword,
                admin: admin
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return { success: false };
    }
}