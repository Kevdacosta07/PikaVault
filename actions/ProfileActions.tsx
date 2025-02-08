"use server"

import {prisma} from "@/lib/prisma";

export async function createProfile(formData: { user_id: string; fullname: string; adress: string; country: string; city: string; cp: number; }) {
    await prisma.profil.create({
        data: {
            user_id: formData.user_id,
            name: formData.fullname,
            country: formData.country,
            adress: formData.adress,
            cp: parseInt(String(formData.cp)),
            city: formData.city,
        }
    })
}

export async function editProfile(formData: { id: string; name: string; adress: string; country: string; city: string; cp: number; user_id: string; }) {
    try {
        await prisma.profil.update({
            where: { id: formData.id },
            data: {
                name: formData.name,
                country: formData.country,
                adress: formData.adress,
                cp: parseInt(String(formData.cp)),
                city: formData.city,
                user_id: formData.user_id,
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export async function editUser(formData: { id: string; name: string; password: string; }) {

    console.log(formData);

    await prisma.user.update({
        where: { id : formData.id as string },
        data: {
            name: formData.name as string,
            password: formData.password as string
        }
    })
}
