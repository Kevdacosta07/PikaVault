import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Fonction qui permet de vérifier si l'utilisateur à une session active et renvoie la session
export async function requireAuth(link: string) {
    const session = await auth();

    if (!session) {
        redirect(link);
    }

    return session;
}

export async function requireAdminAuth(NoSession: string, NoAdmin: string) {
    const session = await auth();

    if (!session) {
        redirect(NoSession);
    }

    if (session.user.admin === 0) {
        redirect(NoAdmin);
    }

    return session;
}