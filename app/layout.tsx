import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../lib/fontawesome";
import { ToastContainer } from "react-toastify";
import { PanierProvider } from "@/components/Providers/PanierProvider";

// ✅ Assigner les polices à des constantes
const geist = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "PikaVault",
    description: "Site de vente et rachat d'accessoires et cartes pokémon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr">
            <body className={`antialiased ${geist.variable} ${geistMono.variable}`}>
                <ToastContainer />
                <PanierProvider>
                    {children}
                </PanierProvider>
            </body>
        </html>
    );
}
