import ShowPanier from "@/components/Panier/ShowPanier";
import {requireAuth} from "@/lib/authUtil";

export default async function PanierPage() {

    const session = await requireAuth("/auth/login");

    return <ShowPanier session={session}/>;
}