import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params } : { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const { status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ message: "ID de l'offre ou statut manquant." }, { status: 400 });
        }

        // Vérifie si l'offre existe
        const existingOffer = await prisma.offers.findFirst({
            where: { id },
        });

        if (!existingOffer) {
            return NextResponse.json({ message: "Offre non trouvée." }, { status: 404 });
        }

        // Met à jour uniquement le statut de l'offre
        const updatedOffer = await prisma.offers.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json({ message: "Statut mis à jour avec succès.", offer: updatedOffer }, { status: 200 });
    } catch (error) {
        console.error("Erreur de mise à jour :", error);
        return NextResponse.json({ message: "Erreur interne du serveur", error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    console.log("Suppression de l'offre avec l'ID :", id);

    if (!id) {
        return NextResponse.json({ error: "L'ID de l'offre est requis" }, { status: 400 });
    }

    try {
        // Vérifier si l'offre existe avant de la supprimer
        const existingOffer = await prisma.offers.findUnique({
            where: { id },
        });

        if (!existingOffer) {
            return NextResponse.json({ error: "Offre non trouvée" }, { status: 404 });
        }

        // Suppression de l'offre
        const deletedOffer = await prisma.offers.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Offre supprimée avec succès", deletedOffer }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'offre :", error);
        return NextResponse.json({ error: "Impossible de supprimer l'offre" }, { status: 500 });
    }
}
