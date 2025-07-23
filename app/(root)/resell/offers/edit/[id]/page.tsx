import { requireAuth } from "@/lib/authUtil";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UpdateOfferForm from "@/components/Offres/UpdateOfferForm";

export default async function OfferPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await requireAuth("/auth/login");
    const offer = await prisma.offers.findFirst({ where: { id: id } });

    // Vérification de sécurité
    if (!offer || offer.user_id != session.user?.id) {
        redirect(`/resell/offers/${session.user?.id}`);
    }

    // Configuration des statuts
    return (<UpdateOfferForm offer={offer} user_id={session.user?.id}/>);
}