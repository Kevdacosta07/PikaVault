import {prisma} from "@/lib/prisma";
import {requireAdminAuth} from "@/lib/authUtil";
import ShowBoutique from "@/components/Admin/boutique/ShowBoutique";

export default async function AdminArticlesPage() {

    await requireAdminAuth("/auth/login", "/");

    const articles = await prisma.article.findMany();

    return (
        <div className={"w-full"}>
            <div className={"flex justify-center flex-col items-center mt-8"}>
                <h2 className={"text-4xl font-bold"}>Gestion des articles de la boutique</h2>
                <p className={"mt-1 font-semibold text-gray-600 text-xl"}>Créez, modifiez et supprimer des articles de la boutique</p>
            </div>

            <ShowBoutique articles={articles} />
        </div>
    )
}