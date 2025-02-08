"use client";

import {expeditionOffer} from "@/actions/OfferAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function AdminAcceptOfferBtn({offer_id, onAccept}: {offer_id: string; onAccept: () => void}) {

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        setIsLoading(true);

        try {
            await expeditionOffer({offer_id: offer_id})
            onAccept();
        }

        catch (e)
        {
            console.log(e);
        }
    }


    return (
        <>
            <button className="text-white w-fit font-medium bg-green-600 px-3 py-2 mt-4" disabled={isLoading} onClick={handleClick}>Accepter <FontAwesomeIcon className="ml-2" icon={faCheck} /></button>
        </>
    )
}