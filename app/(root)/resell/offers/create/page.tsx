import CreateOfferForm from "@/components/Offres/CreateOfferForm";
import {requireAuth} from "@/lib/authUtil";

export default async function CreateOffer() {

    const session = await requireAuth("/auth/login")

    return (
        <div className={"min-h-[100vh] flex flex-col justify-center w-full"}>
            <div className={"flex flex-wrap justify-center"}>
                <CreateOfferForm user_id={session.user?.id ?? ""} />
            </div>
        </div>
    )
}