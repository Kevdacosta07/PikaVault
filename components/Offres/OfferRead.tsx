"use client";

import DeleteOfferButton from "@/components/Offres/DeleteOfferButton";
import Link from "next/link";
import {faPen, faTruck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Offer = {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string[];
    user_id: string;
    status: string;
    created_at: Date; // Ou `Date` si c'est un objet `Date`
};

export default function OfferRead({ offer, onDelete }: { offer: Offer; onDelete: (offerId: string) => void }) {

    const handleDelete = () => {
        onDelete(offer.id); // Appel de la fonction de suppression en passant l'id de l'offre
    };

    let statusClass = "";
    let statusText = "";

    // Déterminez la couleur en fonction du statut
    switch (offer.status) {
        case "deny":
            statusClass = "bg-red-500"; // Rouge pour "error"
            statusText = "Refusée";
            break;
        case "waiting":
            statusClass = "bg-yellow-500"; // Jaune pour "waiting"
            statusText = "En attente..";
            break;
        case "expedition":
            statusClass = "bg-orange-400"; // Orange pour "Expedition"
            statusText = "Expédition en attente..";
            break;
        case "sended":
            statusClass = "bg-orange-300"; // Orange pale pour "sended"
            statusText = "Paiement en attente..";
            break;
        case "success":
            statusClass = "bg-green-600"; // Vert foncé pour "success"
            statusText = "Terminée";
            break;
        default:
            statusClass = "bg-gray-500 text-white"; // Couleur par défaut si aucun statut ne correspond
            statusText = "En attente..";
    }

    return (
        <div className={"w-full flex justify-center"}>
            <div
                className={`title flex px-3 bg-l py-2 my-4 ${statusClass} relative justify-between items-center shadow-gray-400 shadow-md h-fit rounded w-3/6`}
            >
                <DeleteOfferButton offer_id={offer.id} onDelete={handleDelete} />
                <div className={"info flex items-center"}>
                    <img className={"h-40 w-40 object-center object-cover mr-5 rounded-xl"} src={offer.image[0]} alt=""/>
                    <div className={"flex flex-col"}>
                        <h2 className={"text-xl font-black"}>{offer?.title}</h2>
                        <p className={"text-xl font-medium italic w-fit"}>Prix : {offer.price}€</p>
                        <p className={"font-medium italic w-fit mt-8 absolute bottom-2 right-8"}> {new Date(offer.created_at).toLocaleString('fr-FR', {
                            year: 'numeric', // Année complète
                            month: 'long', // Mois abrégé
                            day: 'numeric', // Jour du mois
                            hour: '2-digit', // Heure avec 2 chiffres
                            minute: '2-digit', // Minute avec 2 chiffres
                        })}</p>

                        {offer.status === "expedition" && (<Link href={`/resell/offers/expedition/${offer.id}`} className={"text-white w-fit font-medium bg-black shadow-sm shadow-gray-900 rounded-xl px-3 py-2 mt-4"}>Expédier le colis <FontAwesomeIcon className={"ml-2"} icon={faTruck}/></Link>)}
                        {offer.status === "waiting" && (<Link href={`/resell/offers/edit/${offer.id}`} className={"text-white w-fit font-medium bg-black px-3 py-2 mt-4"}>Modifier l&#39;offre <FontAwesomeIcon className={"ml-2"} icon={faPen}/></Link>)}
                    </div>
                </div>
                <div>
                    <p className={"text-xl font-bold text-black mr-5"}>{statusText}</p>
                </div>
            </div>
        </div>
    );
}
