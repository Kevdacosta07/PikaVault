import ProfileCard from "@/components/profile/ProfileCard";
import {redirect} from "next/navigation";
import {requireAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const session = await requireAuth("/auth/login");
    const user = await prisma.user.findFirst({ where: { email: session.user?.email } });

    if (user?.id !== id) {
        redirect(`/profile/${session.user?.id}`);
    }

    const profile = await prisma.profil.findUnique({ where: { user_id: id } });

    return (
            <ProfileCard user={user} profile={profile} id={id} />
    );
}
