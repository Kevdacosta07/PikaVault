import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: Request) {
    try {
        const { email, subject, message } = await req.json();

        // Vérifier si les champs requis sont présents
        if (!email || !subject || !message) {
            console.log("Tous les champs sont requis.")
            return NextResponse.json({ success: false, error: "Tous les champs sont requis." }, { status: 400 });
        }

        // Configuration du transporteur SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Gmail SMTP
            port: 465, // Port sécurisé pour Gmail
            secure: true, // Utiliser SSL
            auth: {
                user: process.env.EMAIL_USER, // E-mail Gmail
                pass: process.env.EMAIL_PASS, // Mot de passe d'application
            },
        });

        const date = new Date(); // Prend la date actuelle

        const formattedDate = new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);


        //const emailHTML = await render(EmailTemplate({email, subject, message}) as ReactElement);
        const emailHTML2 = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
    <!-- En-tête -->
    <div style="background-color: #ff6600; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0;">Nouveau message de support</h1>
    </div>

    <!-- Contenu principal -->
    <div style="background: #ffffff; padding: 20px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #333;">Bonjour,</p>
        <p style="font-size: 14px; color: #555;">
            Vous avez reçu un nouveau message de contact depuis <strong>PikaVault</strong> :
        </p>

        <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #ff6600; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #444;">
                <strong>Email :</strong> ${email} <br>
                <strong>Message :</strong> <br>
                ${message}
            </p>
        </div>

        <p style="font-size: 14px; color: #555;">
            📅 <strong>Date :</strong> ${formattedDate}
        </p>

        <!-- Bouton -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://localhost:3000" style="
                display: inline-block;
                padding: 12px 20px;
                font-size: 16px;
                color: white;
                background: #007bff;
                text-decoration: none;
                border-radius: 5px;
            ">Répondre</a>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

        <!-- Footer -->
        <p style="font-size: 12px; color: #999; text-align: center;">
            © 2024 PikaVault - Tous droits réservés. <br>
            <a href="https://pikavault.com" style="color: #007bff; text-decoration: none;">Accéder au site</a>
        </p>
    </div>
</div>`;

        // Envoi de l'email
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: subject,
            html: emailHTML2,
        });

        return NextResponse.json({ message: "L'email s'est envoyé avec succès !" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Une erreur a eu lieu", error }, { status: 500 });
    }
}
