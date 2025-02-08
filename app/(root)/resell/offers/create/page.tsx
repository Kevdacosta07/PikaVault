import CreateOfferForm from "@/components/Offres/CreateOfferForm";
import {requireAuth} from "@/lib/authUtil";

export default async function CreateOffer() {

    const session = await requireAuth("/auth/login")

    return (
        <div>
            <div className={"title flex w-full justify-center flex-col items-center mt-16"}>
                <h2 className={"text-5xl font-medium"}>Créer une nouvelle offre</h2>
                <p className={"text-xl font-medium text-black mt-3 bg-orange-400 px-3 py-2 rounded-2xl"}>Vous êtes sur le point de vendre un article</p>
            </div>

            <div className={"flex flex-wrap justify-center"}>
                <CreateOfferForm user_id={session.user?.id ?? ""} />
            </div>
        </div>
    )
}