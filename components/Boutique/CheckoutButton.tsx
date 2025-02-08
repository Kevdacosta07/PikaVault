"use client";

import { useState } from "react";

export default function CheckoutButton() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: [
                    { id: 1, name: "Carte Pokémon Rare", price: 25, quantity: 1 },
                ],
            }),
        });

        const { sessionId } = await res.json();
        if (sessionId) {
            window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            disabled={loading}
        >
            {loading ? "Chargement..." : "Payer avec Stripe"}
        </button>
    );
}
