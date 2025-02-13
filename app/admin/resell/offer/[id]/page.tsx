import {requireAdminAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import ShowAdminOffer from "@/components/Admin/offers/showAdminOffer";
import {redirect} from "next/navigation";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import CheckOffer from "@/components/Offres/CheckOffer";

export default async function AdminOfferPage({params}: {params: Promise<{ id: string }>}) {

    const { id } = await params;

    await requireAdminAuth("/auth/login", "/") // On vérifie si il est co + si il est admin

    const offer = await prisma.offers.findFirst({where: {id: id}});

    if (!offer) {redirect("/admin/resell")} // Si aucune offre n'est associée à l'id

    // On récupère l'auteur de la vente
    const offerAuthor = await prisma.user.findFirst({where: {id: offer.user_id}});

    if (!offerAuthor || offerAuthor.name === null) {redirect("/admin/resell")}

    return (
        <div className={"w-full bg-gray-100 flex justify-center"}>
            <CheckOffer offer={offer} author={offerAuthor?.name || ""} />

            <div className={"back fixed bottom-[30px] right-[20px]"}>
                <Link href="/admin/resell" className={"px-5 py-3 bg-black text-white text-xl rounded-full"}><FontAwesomeIcon icon={faArrowLeft} className={"mr-3"}/>Retour</Link>
            </div>
        </div>
    )
}