"use client";

import { Key } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faEuroSign, faUser, faCalendarAlt, faTag } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

type Offer = {
    id: string;
    title: string;
    description: string;
    price: number;
    user_id: string;
    tracknumber: string | null;
    image: Array<string>;
    status: string;
    created_at: Date;
}

export default function CheckOffer({ offer, author }: { offer: Offer; author: string }) {
    const handleClickImage = (e: React.MouseEvent<HTMLImageElement>, url: string) => {
        e.preventDefault();
        window.open(url, "_blank");
    };

    // 🏷️ Définition des badges de statut
    const getStatusBadge = (status: string) => {
        const statusClasses: Record<string, string> = {
            deny: "bg-red-200 text-red-600", // Refusée
            waiting: "bg-yellow-200 text-orange-700", // En attente..
            expedition: "bg-orange-300 text-orange-700", // Expédition en attente..
            sended: "bg-green-300 text-gray-700", // Paiement en attente..
            success: "bg-green-600 text-white", // Terminée
        };

        const statusTexts: Record<string, string> = {
            deny: "Refusée",
            waiting: "En attente",
            expedition: "Expédition en attente",
            sended: "Paiement en attente",
            success: "Terminée",
        };

        return (
            <span
                className={clsx(
                    "px-3 py-1 text-sm font-semibold rounded-full shadow-md",
                    statusClasses[status] || "bg-gray-500 text-white"
                )}
            >
                {statusTexts[status] || "En attente.."}
            </span>
        );
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10 px-6">
            {/* Conteneur principal */}

            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 md:p-10">
                {/* Titre et Auteur */}
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-orange-500" />
                        {offer.title}
                    </h1>
                    <p className="text-lg text-gray-600 mt-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                        {author || "Utilisateur inconnu"}
                    </p>
                </div>

                {/* Informations de l'offre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Prix */}
                    <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faEuroSign} className="text-orange-500 text-2xl mr-3" />
                        <p className="text-xl font-semibold text-orange-800">{offer.price} €</p>
                    </div>

                    {/* Date de création */}
                    <div className="bg-gray-100 border-l-4 border-gray-500 p-4 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-600 text-2xl mr-3" />
                        <p className="text-lg text-gray-700">
                            {new Date(offer.created_at).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                {/* Statut de la commande */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex justify-between items-center gap-3 w-full bg-gray-100 shadow-md shadow-gray-200 px-4 py-3 rounded-lg">
                        <div className={"flex items-center gap-2"}>
                            <FontAwesomeIcon icon={faTag} className="text-gray-700 text-lg" />
                            <p className="text-lg font-medium text-gray-700">Statut de la commande :</p>
                        </div>
                        {getStatusBadge(offer.status)}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                    <p className="text-gray-600 bg-gray-100 p-4 rounded-lg shadow-sm">{offer.description}</p>
                </div>

                {/* Galerie d'images */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Images du produit</h2>
                    <p className="text-gray-600 text-sm mb-4">
                        Cliquez sur une image pour l&#39;afficher en grand format.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {offer.image.map((url: string | undefined, index: Key | null | undefined) => (
                            <div
                                key={index}
                                className="relative w-full h-28 md:h-40 cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition"
                                onClick={(e) => handleClickImage(e as React.MouseEvent<HTMLImageElement>, url ?? "")}
                            >
                                <Image
                                    src={url || "/placeholder.png"}
                                    alt="Image publiée"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}