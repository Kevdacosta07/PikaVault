import {prisma} from "@/lib/prisma";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function ArticlePage({ params } : { params: Promise<{ id: string }>}) {

    // On récupère le paramètre passer dans l'URL

    const { id } = await params;

    // Convertir l'ID en entier
    const articleId = parseInt(id, 10);

    // On va chercher un article avec son ID !
    const article = await prisma.article.findUnique({where: { id: articleId }});

    // Si aucun article n'est trouvé !
    if (!article)
    {
        return (
            <div>Aucun article n&#39;a été trouvé</div>
        );
    }

    // Si tout est bon on return la page
    return (
        <div>
            <h1>{article.name}</h1>
            <p>Prix : {article.price}</p>
            <p>Catégorie : {article.category}</p>
            <p>Édition : {article.edition}</p>
            <p>Quantité : {article.quantity}</p>
        </div>
    );
}
