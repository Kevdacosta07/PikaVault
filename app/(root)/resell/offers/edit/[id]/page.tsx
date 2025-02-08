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
            statusClass = "bg-red-500"; // Rouge pour "error"
            statusText = "Votre offre a été refusée !";
            break;
        case "waiting":
            statusClass = "bg-yellow-500"; // Jaune pour "waiting"
            statusText = "Votre offre est actuellement en attente !";
            break;
        case "success":
            statusClass = "bg-green-500"; // Vert pour "success"
            statusText = "Votre offre a été acceptée !";
            break;
        default:
            statusClass = "bg-gray-500 text-white"; // Couleur par défaut si aucun statut ne correspond
            statusText = "Votre offre est actuellement en attente !";
    }

    return (
        <div className={"flex flex-wrap flex-col items-center justify-center"}>

            <div className="title flex items-center flex-col">
                <h2 className={"font-bold text-5xl mb-4"}>Modifier votre offre</h2>
                <p className={"text-gray-600 font-bold text-xl"}>Vous avez commis une erreur ?</p>
                <p className={"text-gray-600 font-normal text-xl italic"}>Pas de problème vous pouvez <span className={"bg-yellow-400 italic px-1"}>modifier votre offre</span></p>
            </div>

            <div className={"status"}>
                <p className={`${statusClass} rounded-full px-3 py-2 text-xl mt-7 font-bold`}>{statusText}</p>
            </div>

            <UpdateOfferForm offer={offer} user_id={session.user?.id} />
        </div>
    );
}