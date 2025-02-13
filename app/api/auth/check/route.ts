import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authUtil"; // ✅ Utilisation correcte du middleware d'authentification

export async function GET() {
    try {
        await requireAuth("/auth/login"); // ✅ Vérifie la session utilisateur
        return NextResponse.json({ authenticated: true });
    } catch (error) {
        return NextResponse.json({ authenticated: false, error: String(error) });
    }
}
