import {prisma} from "@/lib/prisma";
import {requireAuth} from "@/lib/authUtil";
import {redirect} from "next/navigation";
import OffersHandler from "@/components/Offres/OffersHandler";

export default async function ResellPage({params}: {params: Promise<{ id: string }>}) {

    // On récupère l'ID dans l'URL
    const { id } = await params;

    // On check si il est connecté
    const session = await requireAuth("/auth/login");

    // On vérifie que l'utilisateur n'accède pas à des données qui ne lui appartienne pas
    if (session.user?.id !== id) {redirect("/auth/login")}

    // On récupère les offres de l'utilisateur
    const offers = await prisma.offers.findMany({ where: { user_id: session.user.id }})

    return (
        <OffersHandler offers={offers} />
    )
}