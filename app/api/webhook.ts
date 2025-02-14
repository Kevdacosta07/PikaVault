import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
});

export const config = {
    api: {
        bodyParser: false,
    },
};

async function buffer(req: NextApiRequest) {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).send("Méthode non autorisée");
    }

    const sig = req.headers["stripe-signature"] as string;
    let event;

    try {
        const rawBody = await buffer(req);
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.error("⚠️ Erreur de signature du webhook :", err);
        return res.status(400).send(`Webhook Error: ${err}`);
    }

    // 🔥 Gestion des événements Stripe
    switch (event.type) {
        case "checkout.session.completed":
            console.log("💰 Paiement réussi :", event.data.object);
            break;
        case "checkout.session.expired":
            console.log("⌛ Paiement expiré :", event.data.object);
            break;
        default:
            console.log("ℹ️ Événement reçu :", event.type);
    }

    res.status(200).json({ received: true });
}
