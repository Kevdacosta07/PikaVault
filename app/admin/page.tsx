import {requireAdminAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import AdminIndex from "@/components/Admin/AdminIndex";

export default async function AdminPage() {

    await requireAdminAuth("/auth/login", `/`);

    const users = await prisma.user.findMany();
    const commands = await prisma.order.findMany({
        where: {
            OR: [
                { status: "paid" },
                { status: "pending" }
            ]
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const offers = await prisma.offers.findMany();


    return (
        <>
            <div className={"bg-gray-100"}>
                <AdminIndex users={users} commands={commands} offers={offers} />
            </div>
        </>
    )
}