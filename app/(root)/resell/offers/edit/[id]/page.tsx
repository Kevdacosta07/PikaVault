import { requireAuth } from "@/lib/authUtil";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UpdateOfferForm from "@/components/Offres/UpdateOfferForm";
import {
    faCheckCircle,
    faClock,
    faTimesCircle,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

export default async function OfferPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await requireAuth("/auth/login");
    const offer = await prisma.offers.findFirst({ where: { id: id } });

    // Vérification de sécurité
    if (!offer || offer.user_id != session.user?.id) {
        redirect(`/resell/offers/${session.user?.id}`);
    }

    // Configuration des statuts
    const getStatusConfig = (status: string) => {
        const statusConfigs = {
            error: {
                bg: "bg-gradient-to-r from-red-50 to-rose-50",
                border: "border-red-200",
                textColor: "text-red-700",
                bgIcon: "bg-gradient-to-br from-red-500 to-red-600",
                icon: faTimesCircle,
                title: "Offre refusée",
                message: "Votre offre a été refusée par notre équipe",
                description: "Consultez les commentaires ou contactez-nous.",
                pulse: false
            },
            waiting: {
                bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
                border: "border-amber-200",
                textColor: "text-amber-700",
                bgIcon: "bg-gradient-to-br from-amber-500 to-yellow-500",
                icon: faClock,
                title: "En cours d'examen",
                message: "Votre offre est en attente de validation",
                description: "Réponse sous 24-48h.",
                pulse: true
            },
            success: {
                bg: "bg-gradient-to-r from-green-50 to-emerald-50",
                border: "border-green-200",
                textColor: "text-green-700",
                bgIcon: "bg-gradient-to-br from-green-500 to-emerald-500",
                icon: faCheckCircle,
                title: "Offre validée",
                message: "Félicitations ! Votre offre a été acceptée",
                description: "Visible par tous les collectionneurs.",
                pulse: false
            },
            default: {
                bg: "bg-gradient-to-r from-gray-50 to-slate-50",
                border: "border-gray-200",
                textColor: "text-gray-700",
                bgIcon: "bg-gradient-to-br from-gray-500 to-slate-500",
                icon: faInfoCircle,
                title: "En cours",
                message: "Votre offre est en cours de traitement",
                description: "Veuillez patienter.",
                pulse: true
            }
        };

        return statusConfigs[status as keyof typeof statusConfigs] || statusConfigs.default;
    };

    return (<UpdateOfferForm offer={offer} user_id={session.user?.id}/>);
}