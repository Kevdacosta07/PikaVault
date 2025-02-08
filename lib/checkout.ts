import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialise Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
});

type Item = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    try {
        const { items } = req.body; // items = [{ id, name, price, quantity }]

        // Création de la session Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item: Item) => ({
                price_data: {
                    currency: "eur",
                    product_data: { name: item.name },
                    unit_amount: item.price * 100, // Stripe utilise les centimes
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        });

        return res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error("Erreur Stripe :", error);
        return res.status(500).json({ message: "Erreur lors de la création de la session" });
    }
}
