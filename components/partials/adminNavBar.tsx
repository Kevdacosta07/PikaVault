import Link from "next/link";
import "./adminNavbar.css";
import ProfileDropdown from "@/components/partials/ProfileDropdown";
import PanierNavbar from "@/components/partials/PanierNavbar";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function AdminNavBar()
{
    const session = await auth();

    if (!session)
    {
        redirect("/auth/login");
    }

    return (
        <nav className="flex align-middle items-center justify-between p-3">
            <div className={"left flex flex-row"}>
                <Link href={"/admin"} className={"text-6xl navtitle text-red-600"}>Admin</Link>
            </div>
            <ul className={"flex justify-center items-center"}>
                <Link href={"/admin/utilisateurs"} className={"font-medium text-xl mr-3"}>Utilisateurs</Link>
                <Link href={"/admin/articles"} className={"font-medium text-xl mr-3"}>Boutique</Link>
                <Link href={"/admin/resell"} className={"font-medium text-xl mr-3"}>Offres</Link>
                <Link href={"/admin/commandes"} className={"font-medium text-xl mr-3"}>Commandes</Link>
                <Link href={"/"} className={"font-medium text-xl px-3 py-1 bg-blue-200 hover:bg-blue-300 transition-colors duration-300 text-blue-900 rounded-md mr-3"}>Client</Link>
                <PanierNavbar />
                <ProfileDropdown user={session.user}/>
            </ul>
        </nav>
    )
}