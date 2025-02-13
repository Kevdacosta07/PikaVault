
import { redirect } from "next/navigation";
import {auth} from "@/lib/auth";

interface SessionGuardProps {
    redirectTo: string; // Lien vers lequel rediriger si la session n'existe pas
    children: React.ReactNode; // Contenu à afficher si la session existe
}

export default async function SessionGuard({ redirectTo, children }: SessionGuardProps) {
    const session = await auth();

    if (!session) {
        redirect(redirectTo); // Redirige si la session est absente
    }

    return <>{children}</>; // Rendu du contenu si la session existe
}
