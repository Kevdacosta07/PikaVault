import type { Metadata } from "next";
import "@/app/globals.css";
import '@/lib/fontawesome';
import SessionWrapper from "@/components/partials/SessionWrapper";
import { PanierProvider } from "@/components/Providers/PanierProvider";
import NavBar from "@/components/partials/navBar";
import Footer from "@/components/partials/footer";

export const metadata: Metadata = {
    title: "PikaVault",
    description: "Site de vente et rachat d'accessoires et cartes pokémon.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionWrapper>
            <PanierProvider>
                <NavBar />
                {children}
                <Footer />
            </PanierProvider>
        </SessionWrapper>
    );
}