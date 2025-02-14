"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faBox} from "@fortawesome/free-solid-svg-icons";
import {Session} from "next-auth";
import clsx from "clsx";

interface Order {
    id: string;
    items: string;
    destinataire: string;
    adress: string;
    city: string;
    country: string;
    cp: number;
    status: string;
    totalAmount: number;
    createdAt: Date;
}

export default function CommandDetails({order, session}: { order: Order, session: Session }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Gestion des couleurs du badge de statut
    const getStatusBadge = (status: string) => {
        return clsx(
            "px-3 py-1 text-sm font-semibold rounded-full",
            {
                "bg-yellow-100 text-yellow-700": status === "pending",
                "bg-orange-100 text-orange-700": status === "shipped",
                "bg-green-100 text-green-700": status === "paid",
                "bg-red-100 text-red-700": status === "cancelled",
                "bg-gray-100 text-gray-700": !status,
            }
        );
    };

    // Mettre à jour la commande en "expédiée"
    const markAsShipped = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/commandes/shipped/${order.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({status: "shipped"}),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

            router.refresh(); // 🔄 Rafraîchir la page après update
        } catch (error) {
            console.error("Erreur de mise à jour :", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
                {/* Retour */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-orange-600 hover:text-orange-800 transition-all mb-5"
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="mr-2"/>
                    Retour aux commandes
                </button>

                {/* En-tête */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Commande #{order.id}</h1>
                <p className="text-gray-600">Passée le {new Date(order.createdAt).toLocaleDateString("fr-FR")}</p>

                {/* Statut de la commande */}
                <div className="mt-4">
                    <span className={getStatusBadge(order.status)}>
                        {order.status === "pending" ? "En attente" :
                            order.status === "shipped" ? "Expédiée" :
                                order.status === "paid" ? "Payée" :
                                    order.status === "cancelled" ? "Annulée" : "Inconnue"}
                    </span>
                </div>

                {/* Détails de la commande */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                        <FontAwesomeIcon icon={faBox} className="text-gray-500"/>
                        Détails de la commande
                    </h3>

                    <div className="mt-3">
                        <p className="text-gray-800 font-medium">Destinataire :</p>
                        <p className="text-gray-500">{order.destinataire}</p>
                    </div>

                    <div className="mt-3">
                        <p className="text-gray-800 font-medium">Montant total :</p>
                        <p className="text-gray-500">{order.totalAmount} €</p>
                    </div>

                    <div className="mt-3">
                        <p className="text-gray-800 font-medium">Adresse de livraison :</p>
                        <p className="text-gray-500">{order.adress}, {order.cp}, {order.city} ({order.country})</p>
                    </div>
                </div>

                {/* Liste des articles */}
                <div className="mt-6 text-left">
                    <h3 className="text-lg font-semibold text-gray-700">Articles commandés</h3>
                    <div className="mt-2 space-y-3">
                        {JSON.parse(order.items).map((item: { image: string | undefined; title: string, amount: number, price: number}, index : number) => (
                            <div key={index} className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg"/>
                                <div>
                                    <p className="text-lg font-medium">{item.title}</p>
                                    <p className="text-gray-500">{item.amount} x {item.price} €</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Boutons */}
                {order.status === "paid" && session.user.admin === 1 && (
                <div className="mt-8 flex justify-between items-center">
                        <button
                            onClick={markAsShipped}
                            disabled={isLoading}
                            className="px-5 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition disabled:opacity-50"
                        >
                            {isLoading ? "Mise à jour..." : "Marquer comme expédiée 🚚"}
                        </button>
                </div>
                )}
            </div>
        </div>
    );
}
