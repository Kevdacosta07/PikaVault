import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assure-toi d'importer Prisma correctement

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId"); // Récupérer l'ID depuis l'URL

        if (!userId) {
            return NextResponse.json({ error: "ID utilisateur manquant" }, { status: 400 });
        }

        const profile = await prisma.profil.findUnique({
            where: { user_id: userId },
        });

        if (!profile) {
            return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
        }

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du profil :", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}

