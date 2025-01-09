'use server';

import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";

export async function createArticleAction (article: {name: string, price: number, category: string, edition: string, quantity: string })
{
    // On crée un nouvelle article dans la BDD
    const newArticle = await prisma.article.create({
        data: {
            name: article.name,
            price: article.price,
            category: article.category,
            edition: article.edition,
            quantity: Number(article.quantity)
        },
    });

    // On vérifie si l'article a été créé puis on redirige
    if (newArticle)
    {
        redirect("/boutique/new/success/" + newArticle.id);
    }

    // On retourne l'article
    return newArticle;
}