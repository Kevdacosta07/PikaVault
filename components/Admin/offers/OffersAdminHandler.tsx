"use client";

import { useState, useEffect } from "react";
import OfferAdminRead from "@/components/Admin/offers/OfferAdminRead";

interface Offer {
    id: string;
    title: string;
    description: string;
    price: number;
    status: string;
    image: Array<string>;
    created_at: Date;
}


export default function OffersAdminHandler({ offers }: { offers: Offer[] }) {
    const [offs, setOffs] = useState(offers);

    useEffect(() => {
        setOffs(offers); // Synchroniser l'état avec les offres initiales (utile si vous avez des mises à jour)
    }, [offers]);

    // Fonction de suppression d'une offre
    const handleDeleteOffer = (offerId: string) => {
        setOffs((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));
    };

    return (
        <>
            {offs.length > 0 ? (
                <div className={"flex flex-wrap justify-center items-center flex-col"}>
                    {offs.map((offer) => (
                        <OfferAdminRead key={offer.id} offer={offer} onDelete={handleDeleteOffer} />
                    ))}
                </div>
            ) : (
                <div className={"flex justify-center flex-col items-center"}>
                    <p className={"text-red-600 text-xl font-medium mt-10 mb-2"}>Aucune offre n&#39;a été répertoriée..</p>
                    <p className={"mb-8 text-xl text-gray-600 italic"}>Revenez plus tard, patience.. :)</p>
                </div>
            )}
        </>
    );
}
