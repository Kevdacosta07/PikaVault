import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Définition du type pour un article de commande
interface OrderItem {
    title: string;
    image: string;
    price: number;
    amount: number;
}

// ✅ Définition du type pour la commande
interface OrderData {
    orderId: string;
    destinataire: string;
    adress: string;
    cp: string;
    city: string;
    country: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
}

// 🔵 Envoi d'un email de confirmation de commande
export async function POST(req: Request) {
    try {
        const { email, subject, command }: { email: string; subject: string; command: OrderData } = await req.json();

        // Vérification des champs requis
        if (!email || !subject || !command) {
            console.log("Tous les champs sont requis.");
            return NextResponse.json({ success: false, error: "Tous les champs sont requis." }, { status: 400 });
        }

        // Création du transporteur SMTP (Gmail)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // SSL
            auth: {
                user: process.env.EMAIL_USER, // Email d'expéditeur
                pass: process.env.EMAIL_PASS, // Mot de passe d'application
            },
        });

        const { orderId, destinataire, adress, cp, city, country, totalAmount, status, items } = command;

        // ✅ Formatage de la date
        const formattedDate = new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date());

        // ✅ Construction dynamique du HTML avec les articles commandés (avec typage strict)
        const itemsHTML = items.map((item: OrderItem) => `
            <div class="item">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <p><strong>${item.title}</strong></p>
                    <p>${item.amount} x ${item.price} €</p>
                </div>
            </div>
        `).join(""); // Permet de fusionner tous les éléments en une seule string

        // ✅ Contenu de l'email
        const emailHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de Commande - PikaVault</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { text-align: center; padding: 10px 0; color: #ffffff; background: #4CAF50; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 20px; text-align: center; }
        .order-details { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: left; }
        .order-details p { margin: 5px 0; }
        .status { color: #4CAF50; font-weight: bold; }
        .items { margin-top: 15px; text-align: left; }
        .item { display: flex; align-items: center; border-bottom: 1px solid #ddd; padding: 10px 0; }
        .item img { width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-right: 10px; }
        .footer { text-align: center; margin-top: 20px; }
        .footer a { display: inline-block; padding: 10px 20px; background: #df9026; color: #754545; text-decoration: none; border-radius: 5px; margin: 5px; }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h1>🎉 Merci pour votre commande !</h1>
        </div>

        <div class="content">
            <p>Bonjour <strong>${destinataire}</strong>,</p>
            <p>Votre commande a été enregistrée avec succès le <strong>${formattedDate}</strong> ! Voici les détails :</p>

            <div class="order-details">
                <p><strong>Numéro de commande :</strong> ${orderId}</p>
                <p><strong>Montant total :</strong> ${totalAmount} €</p>
                <p><strong>Adresse de livraison :</strong> ${adress}, ${cp}, ${city} (${country})</p>
                <p><strong>Statut :</strong> <span class="status">${status}</span></p>
            </div>

            <div class="items">
                <h3>📦 Articles commandés :</h3>
                ${itemsHTML}
            </div>

            <div class="footer">
                <a href="https://${process.env.NEXT_PUBLIC_BASE_URL}/boutique">Aller sur le site</a>
            </div>
        </div>
    </div>

</body>
</html>`;

        // ✅ Envoi de l'email
        await transporter.sendMail({
            from: `Contact Pikavault`,
            to: email,
            subject: subject,
            html: emailHTML,
        });

        console.log("✅ Email envoyé avec succès à :", email);
        return NextResponse.json({ message: "L'email a été envoyé avec succès !" }, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email :", error);
        return NextResponse.json({ message: "Une erreur a eu lieu" }, { status: 500 });
    }
}
