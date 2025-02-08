import Link from "next/link";
import "./navbar.css";
import {auth, signOut} from "@/lib/auth";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {prisma} from "@/lib/prisma";

export default async function NavBar()
{
    const session = await auth();

    // Vérifier si la session et l'email existent avant de faire une requête à Prisma
    const user = session?.user?.email
        ? await prisma.user.findFirst({
            where: { email: session.user.email },
        })
        : null;

    return (
        <nav className="flex align-middle items-center justify-between p-3">
            <div className={"left flex flex-row"}>
                <Link href={"/"} className={"text-6xl navtitle"}>PikaVault</Link>
            </div>
            <ul className={"flex justify-center items-center"}>
                <Link href={"/resell"} className={"font-medium text-xl mr-3"}>Rachat</Link>
                <Link href={"/boutique"} className={"font-medium text-xl mr-3"}>Boutique</Link>
                {user?.admin === 1 && (<Link href={"/admin"} className={"font-medium text-xl mr-3 text-red-600"}>Admin</Link>)}
                {session && session?.user ? (
                    <>
                        <Link href={`/profile/${session.user.id}`} className={"font-normal lowercase text-xl text-gray-900 mr-3"}>{session.user.email}</Link>

                        <form action={async () => {
                            "use server"
                            await signOut({redirectTo: "/auth/login"});
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