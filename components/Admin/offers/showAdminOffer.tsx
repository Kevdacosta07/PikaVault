"use client";

import { Key } from "react";

interface Author {
    id: string;
    name: string | null;
    image: string | null;
    email: string | null;
    password: string | null;
    admin: number;
    points: number;
    emailVerified: Date | null;

}

interface Offer {
    id: string;
    title: string;
    description: string;
    price: number;
    user_id: string;
    tracknumber: string | null;
    image: Array<string>;
    created_at: Date;
}

export default function ShowAdminOffer({offer, author}: { offer: Offer, author: Author | null}) {

    const handleClickImage = (e: React.MouseEvent<HTMLImageElement>, url: string) => {
        e.preventDefault();
        window.open(url, "_blank"); // Ouvre l'image dans un nouvel onglet
    };

    return (
        <div className="flex justify-center w-full flex-col items-center">
            <div
                className="px-10 bg-gray-200 shadow-gray-400 m-5 flex flex-col items-center justify-center rounded-md shadow-md p-6">
                <h1 className={"text-4xl"}>
                <span className={"mr-2 font-black px-2 shadow-sm shadow-gray-400 py-1 bg-green-300 rounded"}>
                    {offer.title} par {author?.name}
                </span>
                </h1>

                <div
                    className={"mt-12 mb-3 flex flex-col items-center justify-center bg-white rounded-md shadow-md p-6"}>
                    <p className={"text-2xl font-semibold"}>Prix total <span
                        className={"bg-orange-500 px-3 py-2 text-white text-2xl font-bold shadow shadow-gray-400 rounded"}>{offer.price}€</span>
                    </p>
                </div>

                <div className={"flex flex-col items-center justify-center mt-8"}>
                    <h2 className="bg-orange-500 px-3 py-2 text-white text-2xl font-semibold mb-5 shadow shadow-gray-400 rounded">Description
                        de l&#39;offre</h2>
                    <p className={"text-xl font-medium w-[80%] p-3"}>{offer.description}</p>
                </div>

                <div className={"images flex flex-col justify-center flex-wrap mt-12"}>
                    <div className={"mb-5 flex justify-center items-center flex-col"}>
                        <p className={"bg-orange-500 rounded px-3 py-2 text-white font-semibold text-2xl shadow shadow-gray-400"}>
                            Photos du produit
                        </p>
                        <p className={"mt-2 text-gray-600 font-medium text-xl"}>Cliquez sur les photos pour les afficher
                            à leur format original</p>
                    </div>
                    <div className={"flex flex-wrap justify-center"}>
                        {offer.image.map((url: string | undefined, index: Key | null | undefined) => (
                            <img
                                className={"m-3 w-[200px] h-auto cursor-pointer"} // Ajout de cursor-pointer pour montrer que c'est cliquable
                                key={index}
                                src={url}
                                alt={"image publiée"}
                                onClick={(e) => handleClickImage(e, url ?? "")} // Correction ici
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
