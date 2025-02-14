import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


interface UpdateUserData {
    name?: string;
    email?: string;
    admin?: number;
    points?: number;
    password?: string;
}

// Supprimer un utilisateur
export async function DELETE(req: Request, {params}: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        if (!id) {
            return NextResponse.json({ message: "ID de l'utilisateur manquant." }, { status: 400 });
        }

        // Vérifie si l'utilisateur existe
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
        }

        // Suppression de l'utilisateur
        await prisma.user.delete({ where: { id } });

        return NextResponse.json({ message: "Utilisateur supprimé avec succès." }, { status: 200 });
    } catch (error) {
        console.error("Erreur suppression utilisateur :", error);
        return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 });
    }
}

// Récupérer un utilisateur
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        return NextResponse.json({ message: "Erreur interne" }, { status: 500 });
    }
}

// Modifier le profil d'un utilisateur
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const { name, email, admin, points, password } = await req.json();

        // Création de l'objet `updateData` sans `any`
        const updateData: UpdateUserData = {
            name,
            email,
            admin,
            points: Number(points),
        };

        // Ne pas modifier le mot de passe si l'utilisateur ne l'a pas changé
        if (password?.trim()) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        // Mise à jour de l'utilisateur
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Erreur de mise à jour :", error);
        return NextResponse.json({ message: "Erreur interne" }, { status: 500 });
    }
}
