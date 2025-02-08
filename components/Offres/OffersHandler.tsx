"use client";

import OfferRead from "@/components/Offres/OfferRead";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

type Offer = {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string[];
    user_id: string;
    status: string;
    created_at: Date;
};

export default function OffersHandler({ offers }: { offers: Offer[] }) {
    const [offs, setOffs] = useState<Offer[]>(offers); // ✅ Correction ici : `Offer[]`

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
                <div className="flex flex-wrap justify-center items-center flex-col">
                    {offs.map((offer) => (
                        <OfferRead key={offer.id} offer={offer} onDelete={handleDeleteOffer} />
                    ))}

                    <Link
                        href="/resell/offers/create"
                        className="text-white w-fit text-xl rounded-xl shadow-gray-400 shadow-md font-medium py-2 px-3 mt-4 bg-orange-600"
                    >
                        <FontAwesomeIcon className="mr-1" icon={faPlus} /> Nouvelle offre
                    </Link>
                </div>
            ) : (
                <div className="flex justify-center flex-col items-center">
                    <p className="text-red-600 text-xl font-medium mb-8">Aucune offre trouvée..</p>
                    <Link
                        href="/resell/offers/create"
                        className="text-white text-xl rounded-xl shadow-gray-400 shadow-md font-medium py-2 px-3 bg-orange-600"
                    >
                        <FontAwesomeIcon className="mr-1" icon={faPlus} /> Créer une offre
                    </Link>
                </div>
            )}
        </>
    );
}
