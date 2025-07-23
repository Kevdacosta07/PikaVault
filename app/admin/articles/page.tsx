import {prisma} from "@/lib/prisma";
import {requireAdminAuth} from "@/lib/authUtil";
import ShowBoutique from "@/components/Admin/boutique/ShowBoutique";

export default async function AdminArticlesPage() {

    await requireAdminAuth("/auth/login", "/");

    const articles = await prisma.article.findMany();

    return (
        <ShowBoutique articles={articles} />
    )
}