import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/authUtil";
import ProfileForm from "@/components/profile/ProfileForm";
import "./profile.css";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import CompleteProfileForm from "@/components/profile/CompleteProfileForm";

export default async function Profile({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    // Vérification de l'authentification
    const session = await requireAuth("/auth/login");

    // Récupération de l'utilisateur connecté
    const user = await prisma.user.findFirst({ where: { email: session.user?.email } });

    // On vérifie que l'utilisateur n'accède pas au profil de quelqu'un d'autre
    if (user?.id !== id) {
        redirect(`/profile/${session.user?.id}`);
    }

    // Récupération du profile
    const profile = await prisma.profil.findUnique({ where: { user_id: id } });

    return (
        <div className="flex items-center justify-around w-full mt-16">
            <div className="title my-10 flex items-start justify-around w-full">
                <ProfileForm user={user} />

                {profile ? (
                    // Si l'utilisateur possède un profil
                    <UpdateProfileForm userProfile={profile} />
                ) : (
                    // Si l'utilisateur ne possède pas de profil
                    <CompleteProfileForm id={id} />
                )}
            </div>
        </div>
    );
}
