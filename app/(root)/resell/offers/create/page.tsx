
import CreateOfferForm from "@/components/Offres/CreateOfferForm";
import { requireAuth } from "@/lib/authUtil";

export default async function CreateOffer() {
    const session = await requireAuth("/auth/login");

    return (
        <CreateOfferForm user_id={session.user?.id ?? ""} />
    );
}