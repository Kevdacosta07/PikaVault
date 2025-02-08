"use client";

import {paymentSent} from "@/actions/OfferAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function AdminPaymentSentButton({offer_id, onSentPayment}: {offer_id: string; onSentPayment: () => void}) {

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        setIsLoading(true);

        try {
            await paymentSent({offer_id: offer_id})
            onSentPayment();
        }

        catch (e)
        {
            console.log(e);
        }
    }


    return (
        <>
            <button className="text-white w-fit font-medium bg-green-600 px-3 py-2 mt-4" disabled={isLoading} onClick={handleClick}>Paiement envoyé <FontAwesomeIcon className="ml-2" icon={faCheck} /></button>
        </>
    )
}