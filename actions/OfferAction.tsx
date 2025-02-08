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

// Mettre à jour une offre
export async function updateOffer(formData: { id: string, user_id: string; title: string; description: string; price: number; image: Array<string>; }) {

    await prisma.offers.update(
    {
        where: {id: formData.id},
        data: {
            title: formData.title,
            description: formData.description,
            price: parseInt(String(formData.price)),
            image: formData.image,
        }
    })
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