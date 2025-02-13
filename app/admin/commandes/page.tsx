import {requireAdminAuth} from "@/lib/authUtil";
import ShowCommandes from "@/components/Admin/Commandes/ShowCommandes";
import {prisma} from "@/lib/prisma";

export default async function AdminCommandesPage() {

    await requireAdminAuth("/auth/login", `/`);

    const commandes = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc", // Trie par date de création (du plus récent au plus ancien)
        },
    });


    return (
        <div>
            <ShowCommandes commandes={commandes} />
        </div>
    )
}