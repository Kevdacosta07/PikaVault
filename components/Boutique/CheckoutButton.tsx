import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

// Charger Stripe avec la clé publique
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

interface CheckoutButtonProps {
    items: {
        id: string;
        title: string;
        description: string;
        image: string;
        edition: string | null;
        type: string;
        price: number;
        amount: number;
    };
}


const CheckoutButton: React.FC<CheckoutButtonProps> = ({ items }) => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        if (!stripe) {
            console.error("Stripe n'a pas pu être chargé.");
            return;
        }

        try {
            console.log("Données envoyées :", [items]); // Ajoute un log pour vérifier les données envoyées

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: [items] }),
            });

            const responseData = await response.json();

            if (response.ok) {
                const { sessionId } = responseData;
                // Redirection vers Stripe Checkout
                await stripe.redirectToCheckout({ sessionId });
            } else {
                console.error("Erreur lors de la création de la session Stripe :", responseData);
            }
        } catch (error) {
            console.error("Erreur :", error);
        }
    };


    return (
        <>
            {items.amount > 0 ?
            (
                <button
                    className="bg-orange-500 font-semibold text-lg transition-colors hover:bg-orange-600 duration-300 w-full text-white px-4 py-2 rounded"
                    onClick={handleCheckout}
                >
                    Consulter l&#39;article
                </button>
            ) : (
                <p className={"py-2 w-full bg-red-400 hover:text-white  transition-all " +
                                "duration-400 text-center text-black  font-bold text-xl rounded-sm cursor-pointer hover:bg-red-500"}>
                    <FontAwesomeIcon icon={faX} className={"mr-2"} /> Rupture de stock
                </p>
                )}
        </>
    );
};

export default CheckoutButton;