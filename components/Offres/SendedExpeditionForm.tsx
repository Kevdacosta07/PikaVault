"use client";

import {useState} from "react";
import {addTrackNumber} from "@/actions/OfferAction";
import {useRouter} from "next/navigation";

export default function SendedExpeditionForm({ offerid, userid }: { offerid: string, userid: string } ) {

    const [btnText, setBtnText] = useState("J'ai envoyé le colis");

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const [formData, setFormData] = useState({
        id: offerid,
        tracknumber: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {

            setBtnText("Mise à jour..")
            await addTrackNumber(formData)

        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }

        setBtnText("Votre commande a été mise à jour !")

        setTimeout(() => {
            setIsLoading(false);
            router.push(`/resell/offers/${userid}`);
        }, 1500)

    }

    return (
        <div className={"absolute top-[50%] right-[180px] transform translate-y-[-50%]"}>
            <form onSubmit={handleSubmit} className={"flex flex-col items-center"}>
                <div className={"flex flex-col items-center send-infos"}>
                    <label className={"text-xl font-bold"} htmlFor="tracknumber">Numéro de suivi</label>
                    <input type="text" className={"p-2 font-medium bg-gray-200 text-xl text-black outline-none"} name="tracknumber" placeholder={"Numéro de suivi"} disabled={isLoading} onChange={handleChange} />
                </div>
                <button className={"bg-orange-300 px-3 py-2 my-5 font-bold text-orange-900 text-xl shadow-sm shadow-gray-500 rounded"} type={"submit"}>
                    {btnText}
                </button>
            </form>
        </div>
    )
}