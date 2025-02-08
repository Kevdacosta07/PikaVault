
import "@/app/globals.css";
import AdminNavBar from "@/components/partials/adminNavBar";

export const metadata = {
  title: "PikaVault",
  description: "Site de vente et rachat d'accessoires et cartes pokémon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <>
          <AdminNavBar/>
          {children}
        </>
  );
}