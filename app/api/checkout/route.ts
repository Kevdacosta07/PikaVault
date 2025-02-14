import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.email || !body.userId) {
            return NextResponse.json({ message: "Email et userId sont requis." }, { status: 400 });
        }

        if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
            return NextResponse.json({ message: "Mauvais format des données" }, { status: 400 });
        }

        const totalAmount = body.items.reduce(
            (acc: number, item: { price: number; amount: number }) => acc + item.price * item.amount, 0
        );

        // Vérification avant la création de la commande
        if (!totalAmount || totalAmount <= 0) {
            return NextResponse.json({ message: "Montant total invalide." }, { status: 400 });
        }

        // Création de la commande AVANT paiement
        const order = await prisma.order.create({
            data: {
                userId: body.userId,
                email: body.email,
                destinataire: body.destinataire,
                adress: body.adress,
                city: body.city,
                country: body.country,
                cp: parseInt(String(body.cp)),
                totalAmount: totalAmount,
                items: JSON.stringify(body.items),
            },
        });

        const lineItems = body.items.map((item: { title: string; price: number; amount: number }) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.title,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.amount,
        }));

        // Création de la session Stripe
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: body.email,
            line_items: lineItems,
            success_url: `${req.nextUrl.origin}/boutique/success/${order.id}`,
            cancel_url: `${req.nextUrl.origin}/boutique`,
        });

        return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la création de la session Stripe", error);
        return NextResponse.json({ message: "Erreur interne du serveur", error: (error as Error).message }, { status: 500 });
    }
}
