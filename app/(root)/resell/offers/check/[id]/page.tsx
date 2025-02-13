import {requireAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import CheckOffer from "@/components/Offres/CheckOffer";
import {redirect} from "next/navigation";

type Params = Promise<{ id: string }>

export default async function checkOffers(props : { params: Params }) {

    const session = await requireAuth("/auth/login");

    const params = await props.params;

    const id = params.id;

    if (!session) {
        redirect("/auth/login");
    }

    const offer = await prisma.offers.findFirst({ where: { id: id } });

    if (!offer) {
        redirect(`/admin/resell/offers/${session.user.id}`);
    }

    console.log(offer.image[0]);

    return (
        <div>
            <CheckOffer offer={offer} author={session.user.name as string} />
        </div>
    )
}