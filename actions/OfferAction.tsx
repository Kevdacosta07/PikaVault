"use server"

import {prisma} from "@/lib/prisma";

// Supprimer une offre
export async function createOffer(formData: { user_id: string; title: string; description: string; price: number; image: Array<string>; }) {

    await prisma.offers.create({
        data: {
            user_id: formData.user_id,
            title: formData.title,
            description: formData.description,
            price: parseInt(String(formData.price)),
            image: formData.image,
        }
    })
}


export async function updateOffer(formData: { id: string, user_id: string; title: string; description: string; price: number; image: Array<string>; }) {
    try {
        // 🔐 Vérification de l'existence de l'offre et de l'utilisateur
        const existingOffer = await prisma.offers.findUnique({
            where: { id: formData.id }
        });

        if (!existingOffer) {
            throw new Error("Offre introuvable !");
        }

        if (existingOffer.user_id !== formData.user_id) {
            throw new Error("Vous n'êtes pas autorisé à modifier cette offre !");
        }

        // Mise à jour de l'offre
        const updatedOffer = await prisma.offers.update({
            where: { id: formData.id },
            data: {
                title: formData.title,
                description: formData.description,
                price: parseInt(String(formData.price)),
                image: formData.image,
            }
        });

        return updatedOffer; // Retourner l'offre mise à jour

    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'offre :", error);
        throw new Error("Impossible de mettre à jour l'offre !");
    }
}




// Supprimer une offre
export async function deleteOffer({offer_id}: { offer_id: string }) {

    await prisma.offers.delete({
        where: { id: offer_id },
    });

}

// Accepter une offre
export async function expeditionOffer({offer_id}: { offer_id: string }) {
    await prisma.offers.update({
        where: { id: offer_id },
        data: { status: "expedition" }
    })
}


// Refuser une offre
export async function denyOffer({offer_id}: { offer_id: string }) {
    await prisma.offers.update({
        where: {id: offer_id},
        data: {status: "deny"}
    })
}

// Refuser une offre
export async function paymentSent({offer_id}: { offer_id: string }) {
    await prisma.offers.update({
        where: {id: offer_id},
        data: {status: "success"}
    })
}

// Ajouter un numéro de tracklist
export async function addTrackNumber(formData: { id: string, tracknumber: string; }) {
    await prisma.offers.update({
        where: {id: formData.id},
        data: {tracknumber: formData.tracknumber, status: "sended"}
    })
}