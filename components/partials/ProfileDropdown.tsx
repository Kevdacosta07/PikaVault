"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faBox, faPowerOff, faUser} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface User {
    name?: string | null | undefined;
    id?: string | null | undefined;
    image?: string | null | undefined;
    admin: number;
    email?: string | null | undefined;
}


export default function ProfileDropdown({ user }: { user: User }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        // Ajouter l'écouteur d'événements
        document.addEventListener("mousedown", handleClickOutside);

        // Nettoyer le listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bouton Profil avec flèche */}
            <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex flex-row items-center space-x-2 focus:outline-none"
            >
                {/* Image de profil */}
                <Image
                    src={user?.image ?? "/assets/img/default-profile.png"}
                    alt="Image de profil"
                    height={40}
                    width={40}
                    className="rounded-full object-center"
                />

                <ChevronDownIcon
                    className={`w-6 h-6 text-black transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Menu déroulant */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-50 border border-gray-400 rounded shadow-lg z-50">
                    <Link href={`/profile/${user?.id || ""}`} className="block font-medium px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <FontAwesomeIcon icon={faUser} className={"mr-2 font-bold"} /> Mon profil
                    </Link>
                    <Link href={`/commandes`} className="block font-medium px-4 py-2 border-t border-b-gray-300 text-gray-700 hover:bg-gray-200">
                        <FontAwesomeIcon icon={faBox} className={"mr-2 font-bold"} /> Mes commandes
                    </Link>
                    <Link href={`/resell/offers/${user?.id || ""}`} className="block font-medium px-4 py-2 border-t border-b-gray-300 text-gray-700 hover:bg-gray-200">
                        <FontAwesomeIcon icon={faBook} className={"mr-2 font-bold"} /> Mes offres
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="flex items-center font-medium w-full text-left bg-red-200 text-red-600 px-4 py-2 border-t border-t-gray-300 hover:bg-red-300"
                    >
                        <FontAwesomeIcon icon={faPowerOff} className={"mr-2 font-bold"} /> Se déconnecter
                    </button>
                </div>
            )}
        </div>
    );
}
