"use client";

import {denyOffer} from "@/actions/OfferAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function AdminDenyOfferBtn({offer_id, onDeny}: {offer_id: string; onDeny: () => void}) {

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        setIsLoading(true);

        try {
            await denyOffer({offer_id: offer_id})
            onDeny();
        }

        catch (e)
        {
            console.log(e);
        }
    }


    return (
        <>
            <button className="text-white w-fit font-medium bg-red-600 px-3 py-2 mt-4 ml-2" disabled={isLoading} onClick={handleClick}>Refuser <FontAwesomeIcon className="ml-2" icon={faX} /></button>
        </>
    )
}