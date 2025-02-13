"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function Footer() {

    const pathname = usePathname();
    const isBlackListed = pathname === "/auth/login" || pathname === "/auth/register";

    return (
        <footer className={`bg-gray-900 text-gray-300 py-8 ${isBlackListed && "hidden"}`}>
            <div className="gap-4 flex flex-col justify-center items-center">
                {/* Logo / Nom */}
                <div className="flex justify-center flex-col items-center text-lg text-white font-extralight">
                    <p className={"font-permanentmarker text-5xl"}>PikaVault</p>
                    <p className={"mt-6 font-medium text-gray-300"}>© {new Date().getFullYear()} PikaVault Tous droits réservés.</p>
                </div>

                <div className={"flex gap-6"}>
                    <p className={"px-3 py-2 cursor-pointer hover:bg-gray-300 transition-colors duration-300 bg-gray-400 rounded text-gray-900 font-semibold"}><FontAwesomeIcon
                        icon={faPhone} className={"mr-2"}/>+41 76 553 41 54</p>
                    <p className={"px-3 py-2 cursor-pointer hover:bg-gray-300 transition-colors duration-300 bg-gray-400 rounded text-gray-900 font-semibold"}><FontAwesomeIcon
                        icon={faEnvelope} className={"mr-2"}/>contact@pikavault.ch</p>
                </div>

                {/* Liens */}
                <nav className="flex flex-wrap justify-center gap-6 md:mt-0">
                    <Link href="/boutique" className="hover:text-white text-lg font-medium transition-colors">Boutique</Link>
                    <Link href="/resell" className="hover:text-white text-lg font-medium transition-colors">Revente</Link>
                    <Link href="/contact" className="hover:text-white text-lg font-medium transition-colors">Contact</Link>
                    <Link href="/commandes" className="hover:text-white text-lg font-medium transition-colors">Commandes</Link>
                </nav>
            </div>
        </footer>
    );
}
