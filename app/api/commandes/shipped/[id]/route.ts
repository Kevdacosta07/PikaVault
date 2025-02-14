import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        if (!id) {
            return NextResponse.json({ message: "ID de commande manquant." }, { status: 400 });
        }

        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            return NextResponse.json({ message: "Commande non trouvée." }, { status: 404 });
        }

        if (existingOrder.status === "shipped") {
            return NextResponse.json({ message: "Commande déjà expédiée." }, { status: 400 });
        }

        // Mise à jour du statut de la commande
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status: "shipped" },
        });

        // Configuration du transporteur SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Ton email Gmail
                pass: process.env.EMAIL_PASS, // Mot de passe d'application
            },
        });

        // Création de l'email HTML avec des variables correctement insérées
        const emailHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre commande est en route 🚚</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            margin: 0;
        }

        .container {
            max-width: 600px;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }

        .header {
            text-align: center;
            background: #ff9800;
            color: white;
            padding: 20px;
            border-radius: 12px 12px 0 0;
            font-size: 22px;
            font-weight: bold;
        }

        .content {
            text-align: center;
            padding: 20px;
            font-size: 16px;
            color: #333;
        }

        .content p {
            margin: 10px 0;
        }

        .details {
            background: #ffe0c1;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
            margin-top: 15px;
            text-align: left;
            font-size: 15px;
        }

        .details p {
            margin: 8px 0;
            font-weight: bold;
            color: #444;
        }

        .details span {
            font-weight: normal;
            color: #666;
        }

        .btn-container {
            text-align: center;
            margin-top: 20px;
        }

        .btn {
        display: block !important;
        text-align: center !important;
        background-color: #ff9800 !important;
        color: white !important;
        text-decoration: none !important;
        padding: 12px 20px !important;
        font-size: 16px !important;
        font-weight: bold !important;
        border-radius: 6px !important;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1) !important;
        transition: background 0.3s ease-in-out !important;
        }
        
        .btn:hover {
            background-color: #e68900 !important;
        }


        .footer {
            text-align: center;
            margin-top: 25px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- En-tête -->
        <div class="header">
            🎉 Bonne nouvelle !
        </div>

        <!-- Corps du message -->
        <div class="content">
            <p>Bonjour <strong>${existingOrder.destinataire}</strong>,</p>
            <p>Votre commande <strong>#${existingOrder.id}</strong> est en route ! 🚚</p>
            <p>Voici les détails de votre commande :</p>

            <!-- Détails de la commande -->
            <div class="details">
                <p>💰 Montant total : <span>${existingOrder.totalAmount} €</span></p>
                <p>📍 Adresse de livraison : <span>${existingOrder.adress}, ${existingOrder.cp}, ${existingOrder.city} (${existingOrder.country})</span></p>
                <p>📦 Statut : <span style="color: #8e5800;">Expédiée</span></p>
            </div>

            <!-- Lien de suivi -->
            <div class="btn-container">
                <a href="https://pikaVault.com/commandes/${existingOrder.id}"  style="display: block; text-align: center; background-color: #ff9800; color: white; text-decoration: none; padding: 12px 20px; font-size: 16px; font-weight: bold; border-radius: 6px; box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1); transition: background 0.3s ease-in-out;">Suivre ma commande</a>
            </div>
        </div>

        <!-- Remerciement -->
        <div class="footer">
            <p>Merci pour votre confiance !</p>
            <p><strong>PikaVault</strong></p>
        </div>
    </div>
</body>
</html>`;


        // Envoi de l'email au client
        await transporter.sendMail({
            from: "contact@pikavault.com",
            to: existingOrder.email,
            subject: `📦 Votre commande est en route !`,
            html: emailHTML,
        });

        return NextResponse.json({ message: "Commande expédiée et email envoyé avec succès.", order: updatedOrder }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        return NextResponse.json({ message: "Erreur interne du serveur", error: (error as Error).message }, { status: 500 });
    }
}
