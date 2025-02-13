import {requireAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import UpdateOfferForm from "@/components/Offres/UpdateOfferForm";

export default async function OfferPage({params}: {params: Promise<{ id: string }>}) {

    const { id } = await params;

    const session = await requireAuth("/auth/login")

    const offer = await prisma.offers.findFirst({ where: { id: id } });

    // Vérification de sécurité
    if (!offer || offer.user_id != session.user?.id) {redirect(`/resell/offers/${session.user?.id}`)}

    let statusClass = "";
    let statusText = "";

    // Déterminez la couleur en fonction du statut
    switch (offer.status) {
        case "error":
            statusClass = "bg-red-300 text-red-800"; // Rouge pour "error"
            statusText = "Votre offre a été refusée !";
            break;
        case "waiting":
            statusClass = "bg-yellow-200 text-orange-800"; // Jaune pour "waiting"
            statusText = "Votre offre est actuellement en attente !";
            break;
        case "success":
            statusClass = "bg-green-300 text-green-800"; // Vert pour "success"
            statusText = "Votre offre a été acceptée !";
            break;
        default:
            statusClass = "bg-gray-300 text-gray-800"; // Couleur par défaut si aucun statut ne correspond
            statusText = "Votre offre est actuellement en attente !";
    }

    return (
        <div className={"flex flex-wrap flex-col items-center justify-center min-h-screen"}>

            <div className="title flex items-center flex-col">
                <h2 className={"font-bold text-5xl"}>Modifier votre offre</h2>
                <p className={`${statusClass} rounded-full px-3 py-2 text-xl mt-2 font-medium mb-3`}>{statusText}</p>
            </div>

            <UpdateOfferForm offer={offer} user_id={session.user?.id} />
        </div>
    );
}