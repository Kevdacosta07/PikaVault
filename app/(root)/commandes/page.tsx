import CommandesComp from "@/components/Commandes/CommandesComp";
import {prisma} from "@/lib/prisma";
import {requireAuth} from "@/lib/authUtil";

export default async function CommandsPage() {

    const session = await requireAuth("/auth/login");


    const commandes = (await prisma.order.findMany({ where: {userId: session.user?.id}})).map(order => ({
            id: order.id,
            createdAt: order.createdAt.toISOString(),
            totalAmount: order.totalAmount,
            adress: order.adress,
            cp: String(order.cp),
            city: order.city,
            country: order.country,
            status: order.status,
            items: order.items,
        }));


    return (
        <div>
            <CommandesComp commandes={commandes} />
        </div>
    )
}