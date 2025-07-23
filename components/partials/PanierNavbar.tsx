"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PanierContext } from "@/components/Providers/PanierProvider";
import { useRouter } from "next/navigation";

export default function PanierNavbar() {
    const panierContext = useContext(PanierContext);
    const router = useRouter();

    if (!panierContext) {
        return null;
    }

    const { panier } = panierContext;

    return (
        <div className="relative cursor-pointer group" onClick={() => router.push("/panier")}>
            <Link href="/panier" className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-gray-700 text-xl group-hover:text-orange-500 transition-colors duration-300"
                />
            </Link>
            {panier.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {panier.length}
                </span>
            )}
        </div>
    );
}