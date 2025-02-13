import type { Metadata } from "next";
import "@/app/globals.css";
import NavBar from "@/components/partials/navBar";
import '@/lib/fontawesome';
import Footer from "@/components/partials/footer";

export const metadata: Metadata = {
  title: "PikaVault",
  description: "Site de vente et rachat d'accessoires et cartes pokémon.",
};

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
          <NavBar/>
          {children}
          <Footer />
      </>
  );
}
