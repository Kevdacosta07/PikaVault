"use client";

import DeleteOfferButton from "@/components/Offres/DeleteOfferButton";
import Link from "next/link";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AdminAcceptOfferBtn from "@/components/Admin/offers/AcceptOfferButton";
import {useState} from "react";
import AdminDenyOfferBtn from "@/components/Admin/offers/DenyOfferButton";
import AdminPaymentSentButton from "@/components/Admin/offers/PaymentSentOfferButton";

export default function OfferAdminRead({ offer, onDelete }: { offer: { status: string; title: string; price: number; id: string; image: Array<string>; created_at: Date }; onDelete: (offerId: string) => void }) {

    const [offerStatus, setOfferStatus] = useState(offer.status);

    const handleDelete = () => {
        onDelete(offer.id); // Appel de la fonction de suppression en passant l'id de l'offre
    };

    const handleExpeditionOffer = () => {
        setOfferStatus("expedition")
    }

    const handleDenyOffer = () => {
        setOfferStatus("deny")
    }

    const handlePaymentSentOffer = () => {
        setOfferStatus("success")
    }

    let statusClass = "";
    let statusText = "";

    // Déterminez la couleur en fonction du statut
    switch (offerStatus) {
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
            statusClass = "bg-green-500"; // Vert foncé pour "success"
            statusText = "Terminée";
            break;
        default:
            statusClass = "bg-gray-500 text-white"; // Couleur par défaut si aucun statut ne correspond
            statusText = "En attente..";
    }

    return (
        <div className={"w-full flex justify-center"}>
            <div
                className={`title flex px-3 py-2 my-4 ${statusClass} relative justify-between items-center shadow-gray-400 shadow-md h-fit rounded w-3/6`}
            >
                <DeleteOfferButton offer_id={offer.id} onDelete={handleDelete} />
                <div className={"info flex items-center"}>
                    <img className={"h-40 w-40 object-center object-cover mr-5 rounded-xl"} src={offer.image[0]} alt=""/>
                    <div className={"flex flex-col"}>
                        <h2 className={"text-xl font-black"}>{offer?.title}</h2>
                        <p className={"text-xl font-medium italic w-fit mb-4"}>Prix : {offer.price}€</p>
                        <p className={"font-medium italic w-fit mt-8 absolute bottom-2 right-8"}> {new Date(offer.created_at).toLocaleString('fr-FR', {
                            year: 'numeric', // Année complète
                            month: 'long', // Mois abrégé
                            day: 'numeric', // Jour du mois
                            hour: '2-digit', // Heure avec 2 chiffres
                            minute: '2-digit', // Minute avec 2 chiffres
                        })}</p>

                        <div className={""}>
                            <Link href={`/admin/resell/offer/${offer.id}`} className={"text-white w-fit font-medium mr-2 bg-black px-3 py-2 mt-4"}>Consulter l&#39;offre <FontAwesomeIcon className={"ml-2"} icon={faArrowRight}/></Link>
                            {offerStatus === "waiting" && (
                                <>
                                    <AdminAcceptOfferBtn offer_id={offer.id} onAccept={handleExpeditionOffer} />
                                    <AdminDenyOfferBtn offer_id={offer.id} onDeny={handleDenyOffer} />
                                </>
                            )}

                            {offerStatus === "sended" && (
                                <AdminPaymentSentButton offer_id={offer.id} onSentPayment={handlePaymentSentOffer} />
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <p className={"text-xl font-bold text-black mr-5"}>{statusText}</p>
                </div>
            </div>
        </div>
    );
}
