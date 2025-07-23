import type { Metadata } from "next";
import "./globals.css";
import "../lib/fontawesome";
import { ToastContainer } from "react-toastify";
import { PanierProvider } from "@/components/Providers/PanierProvider";
import {manrope, outfit, permanentMarker, poppins} from "@/lib/fonts";


export const metadata: Metadata = {
    title: "PikaVault",
    description: "Site de vente et rachat d'accessoires et cartes pokémon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr" className={`${manrope.variable} ${permanentMarker.variable} ${outfit.variable} ${poppins.variable}`}>
            <body className={`antialiased${outfit.className}`}>
                <ToastContainer />
                <PanierProvider>
                    {children}
                </PanierProvider>
            </body>
        </html>
    );
}
