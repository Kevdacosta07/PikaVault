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
        return null; // Évite une erreur si le contexte n'est pas fourni
    }

    const { panier } = panierContext;

    return (
        <div className="relative cursor-pointer mr-3" onClick={() => router.push("/panier")}>
            <Link href="/panier">
                <FontAwesomeIcon icon={faShoppingCart} className="text-gray-800 text-2xl" />
            </Link>
            {panier.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-2 rounded-full">
                    {panier.length}
                </span>
            )}
        </div>
    );
}
