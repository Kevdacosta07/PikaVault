"use server"
import {prisma} from "@/lib/prisma";
import {registerSchema} from "@/schemas/RegisterSchema";

export async function createArticle(formData: { title: string; description: string; imageUrl: string; edition: string; type: string; amount: number; price: number; image: string; }) {
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

        const validateData = registerSchema.parse({email: email, name: name, password: password})

        await prisma.user.create({
            data: {
                email: validateData.email.toLowerCase(),
                name: validateData.name.toLowerCase(),
                password: validateData.password.toLowerCase()
            }
        })

        return { success: true };
    }

    catch (error)
    {
        console.error("Une erreur a eu lieu lors de la création de votre compte :", error);

        // Return a failure response with error details
        return { success: false };
    }
}