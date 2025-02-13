import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await auth();

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 });
        }

        const profile = await prisma.profil.findUnique({
            where: { user_id: session.user.id },
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
