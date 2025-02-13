import {prisma} from "@/lib/prisma";
import ShowArticles from "@/components/Boutique/ShowArticles";

export default async function boutique() {

    const articles = await prisma.article.findMany();

    return (
        <div className="w-full flex min-h-screen pb-20 flex-col justify-center items-center">
            <div className={"flex flex-col justify-center items-center"}>
                <h1 className="w-fit font-bold text-5xl mt-14">Bienvenue dans la boutique</h1>
                <p className={"mt-2 font-normal text-xl text-gray-600"}>Vous pouvez retrouver toutes nos offres sur cette page !</p>
            </div>

            <ShowArticles articles={articles} />

        </div>
    );
}
