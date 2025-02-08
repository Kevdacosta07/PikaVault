import Link from "next/link";
import "./adminNavbar.css";
import {auth, signOut} from "@/lib/auth";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {prisma} from "@/lib/prisma";

export default async function AdminNavBar()
{
    const session = await auth();

    // Vérifier si la session et l'email existent avant de faire une requête à Prisma
    const user = session?.user?.email
        ? await prisma.user.findUnique({
            where: { email: session.user.email },
        })
        : null;

    return (
        <nav className="flex align-middle items-center justify-between p-3">
            <div className={"left flex flex-row"}>
                <Link href={"/admin"} className={"text-6xl navtitle text-red-600"}>Admin</Link>
            </div>
            <ul className={"flex justify-center items-center"}>
                <Link href={"/admin/articles"} className={"font-medium text-xl mr-3"}>Articles</Link>
                <Link href={"/admin/resell"} className={"font-medium text-xl mr-3"}>Resell</Link>
                {session && session?.user ? (
                    <>
                        <Link href={`/profile/${user?.id}`} className={"font-normal text-xl text-gray-900 mr-3"}>{session.user?.email}</Link>

                        <form action={async () => {
                            "use server"
                            await signOut({redirectTo: "/Boutique"});
                        }} className={"font-medium text-xs px-3 py-2 bg-red-500 rounded-full text-white"}>
                            <button type="submit"><FontAwesomeIcon icon={faPowerOff}/></button>
                        </form>

                    </>
                ) : (
                    <Link href={"/auth/login"} className={"font-medium text-xl mr-3 px-3 py-2 rounded-full duration-300 transition-colors hover:bg-black hover:text-white border-black border-2"}>Connexion</Link>
                )}
            </ul>
        </nav>
    )
}