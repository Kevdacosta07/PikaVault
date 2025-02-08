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

                <div className={"txt-title w-full flex-col flex justify-center items-center pt-10 py-6"}>
                    <h2 className={"font-bold text-5xl"}>Offres en cours</h2>
                    <p className={"mt-3 font-medium text-xl"}>Consultez toutes les offres actives actuellement</p>
                </div>

                <OffersAdminHandler offers={offers}/>
            </div>
        </div>
    )

}