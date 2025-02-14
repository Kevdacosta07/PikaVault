import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id  = (await params).id;
        const body = await req.json();

        // Vérifier si l'ID existe
        if (!id) {
            return NextResponse.json({ message: "ID de l'article requis." }, { status: 400 });
        }

        // Vérifier les données reçues
        if (!body.title || !body.description || !body.price || !body.amount || !body.type || !body.image) {
            return NextResponse.json({ message: "Tous les champs sont requis." }, { status: 400 });
        }

        // Mise à jour de l'article
        const updatedArticle = await prisma.article.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                edition: body.edition || null,
                type: body.type,
                price: body.price,
                amount: body.amount,
                image: body.image,
            },
        });

        return NextResponse.json({ message: "Article mis à jour avec succès", article: updatedArticle }, { status: 200 });
    } catch (error) {
        console.error("Erreur de mise à jour :", error);
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
}

// Fonction pour supprimer un article
export async function DELETE(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        // Vérifier si l'ID est fourni
        if (!id) {
            return NextResponse.json({ message: "ID de l'article requis." }, { status: 400 });
        }

        // Suppression de l'article
        await prisma.article.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Article supprimé avec succès" }, { status: 200 });
    } catch (error) {
        console.error("Erreur de suppression :", error);
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
}
