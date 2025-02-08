import CreateArticleForm from "@/components/Admin/boutique/create/CreateArticleForm";

export default function CreateArticlePage() {



    return (
        <div>
            <div className={"flex flex-col justify-center items-center my-10"}>
                <h2 className={"text-4xl font-semibold"}>Créer un article dans la <span className={"bg-red-500 px-2 py-1.5 text-white rounded-xl shadow-md shadow-gray-400"}>boutique</span></h2>
                <p className={"text-xl mt-4 text-gray-600 font-medium"}>Vous êtes sur le point d&#39;ajouter un article à la boutique.</p>
            </div>

            <CreateArticleForm />
        </div>
    )
}