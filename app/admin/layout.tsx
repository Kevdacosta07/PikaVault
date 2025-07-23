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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <AdminNavBar user={session.user} />
            <main className="relative">
                {children}
            </main>
        </div>
    );
}