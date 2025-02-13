import {requireAdminAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import EditArticle from "@/components/Admin/boutique/edit/EditArticle";

export default async function EditArticlePage({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    await requireAdminAuth("/auth/login", "/");

    const article = await prisma.article.findFirst({where: {id: id}})

    if (!article) {
        redirect("/admin/articles");
    }

    return (
        <div>
            <EditArticle article={article} />
        </div>
    )
}