// Imports du CSS
import "./boutique.css";
import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "PikaVault - Boutique"
};

export default function Boutique()
{

    return (
        <div>boutique
            <Link href="boutique/new">Ajouter un article</Link>
        </div>
    )
}