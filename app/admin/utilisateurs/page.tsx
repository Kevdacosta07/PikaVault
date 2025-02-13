import {requireAdminAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import ShowUsers from "@/components/Admin/utilisateurs/ShowUsers";

export default async function UserAdminPage() {

    await requireAdminAuth("/auth/login", "/")

    const users = await prisma.user.findMany({});

    return (
        <div>
            <ShowUsers initusers={users} />
        </div>
    )
}