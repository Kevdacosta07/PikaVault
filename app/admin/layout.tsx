import AdminNavBar from "@/components/partials/adminNavBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/auth/login");
    }

    if (session.user.admin !== 1) {
        redirect("/");
    }

    // Adapter l'objet user pour correspondre à l'interface attendue
    const adaptedUser = {
        id: session.user.id,
        name: session.user.name || undefined, // Convertir null en undefined
        email: session.user.email || undefined,
        image: session.user.image || undefined,
        admin: session.user.admin,
        points: undefined // La propriété points n'existe pas dans NextAuth, on la définit comme undefined
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <AdminNavBar user={adaptedUser} />
            <main className="relative">
                {children}
            </main>
        </div>
    );
}