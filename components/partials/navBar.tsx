import Link from "next/link";
import "./navbar.css";
import ProfileDropdown from "@/components/partials/ProfileDropdown";
import PanierNavbar from "@/components/partials/PanierNavbar";
import { auth } from "@/lib/auth";
import NavBarClient from "@/components/partials/ClientNavbar";

export default async function NavBar() {
    const session = await auth();

    return (
        <NavBarClient> {/* Applique le style conditionnel */}
            <nav className="flex align-middle items-center justify-between p-3">
                <div className="left flex flex-row">
                    <Link href="/" className="text-6xl navtitle">PikaVault</Link>
                </div>

                <ul className="flex justify-center items-center">
                    <Link href="/resell" className="font-medium text-xl mr-3">Revente</Link>
                    <Link href="/boutique" className="font-medium text-xl mr-3">Boutique</Link>
                    <Link href="/contact" className="font-medium text-xl mr-3">Contact</Link>

                    {/* 🔄 Menu déroulant du profil */}
                    {session && session?.user ? (
                        <>
                            {session.user.admin === 1 && (
                                <Link href="/admin" className="font-medium text-xl mr-3 px-3 py-1 bg-red-300 hover:bg-red-400 shadow-gray-200 shadow rounded-xl text-red-900">
                                    Admin
                                </Link>
                            )}
                            <PanierNavbar />
                            <ProfileDropdown user={session.user} />
                        </>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="font-medium text-xl mr-3 px-3 py-2 rounded-full transition-colors hover:bg-black hover:text-white border-black border-2"
                        >
                            Connexion
                        </Link>
                    )}
                </ul>
            </nav>
        </NavBarClient>
    );
}
