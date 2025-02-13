import {requireAdminAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import OffersAdminHandler from "@/components/Admin/offers/OffersAdminHandler";

export default async function AdminResell() {

    // On vérifie que l'utilisateur soit connecté et administrateur
    await requireAdminAuth("/auth/login", "/");

    const offers = await prisma.offers.findMany({
        orderBy: {
            created_at: 'desc', // Trie les offres en décroissant
        },
    });

    return (
        <div className={"flex w-full"}>
            <div className={"flex flex-col justify-center w-full"}>

                <OffersAdminHandler offers={offers}/>
            </div>
        </div>
    )

}