import {requireAdminAuth} from "@/lib/authUtil";

export default async function AdminPage() {

    const session = await requireAdminAuth("/auth/login", `/`);


    return (
        <div className={"flex justify-center mt-8"}>
            <h1 className={"text-4xl"}>Soyez le bienvenue <span className={"font-black px-3 py-1  bg-yellow-200 rounded text-orange-800 shadow-gray-400 shadow-sm"}>{session.user?.name}</span></h1>
        </div>
    )
}