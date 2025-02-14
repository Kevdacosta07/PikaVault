"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminButtonsFilters from "@/components/Admin/boutique/create/AdminButtonsFilters";
import EditionSelector from "@/components/Admin/boutique/create/EditionSelector";
import ImageUploader from "@/components/Admin/boutique/create/ImageUploader";

// Schéma de validation Zod
const articleSchema = z.object({
    id: z.string(),
    title: z.string().min(4, "Le titre doit posséder 4 caractères minimum").max(25, "Le titre ne doit pas excéder 25 caractères"),
    description: z.string().min(20, "La description doit contenir au minimum 20 caractères"),
    type: z.string().min(1, "Veuillez choisir un type d'objet"),
    price: z.preprocess((val) => Number(val), z.number().positive("Le prix doit être supérieur à 0").max(999999, "Prix trop élevé")),
    amount: z.preprocess((val) => Number(val), z.number().int("Le stock doit être un entier").nonnegative("Le stock ne peut être négatif")),
    edition: z.string().nullable().optional(), // ✅ Accepte null et undefined
    image: z.string().min(1, "Une image est obligatoire"),
}).refine((data) => {
    if (data.type !== "accessoires" && data.type !== "exclusivites") {
        return data.edition !== undefined && data.edition !== null && data.edition.trim() !== "";
    }
    return true;
}, {
    message: "L'édition est obligatoire pour cet objet",
    path: ["edition"],
});


// Type des données
type ArticleFormData = z.infer<typeof articleSchema>;

// Composant principal
export default function EditArticleForm({ article }: { article: ArticleFormData }) {
    const router = useRouter();
    const [btnText, setBtnText] = useState("Mettre à jour l'article");
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: article,
    });

    useEffect(() => {
        if (article) {
            reset(article);
        }
    }, [article, reset]);

    const selectedType = watch("type");


    const onSubmit = async (data: ArticleFormData) => {
        if (data.edition === null) {
            data.edition = undefined;
        }

        setBtnText("Mise à jour en cours...");
        setIsLoading(true);

        try {
            const response = await fetch(`/api/article/update/${article.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour");

            setBtnText("Article mis à jour !");
            setTimeout(() => router.push("/admin/articles"), 2000);
        } catch (error) {
            setBtnText("Erreur lors de la mise à jour !");
            console.error(error);
        }

        setIsLoading(false);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-center">

                <div className={"flex justify-center flex-col items-center"}>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">Modifier un article</h1>
                    <p className="text-lg font-medium text-gray-600 mb-6">Assurez-vous de saisir toutes les données afin d&#39;éviter les erreurs !</p>
                </div>

                <div className="py-8 px-20 bg-gray-200 shadow-lg rounded-md shadow-gray-600 mb-10">

                    {/* Sélection du type d'objet */}
                    <div className="flex justify-center flex-col w-full mb-8">
                        <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 
                            ${errors.type ? "bg-red-500" : "bg-gray-700"}`}>
                            Catégorie de l&#39;article
                        </p>
                        <p className={"mt-2 text-md text-gray-600 font-medium"}>Choisissez la catégorie de l&#39;article</p>
                        <AdminButtonsFilters defaultSelection={article.type} setTypeValue={(type) => {
                            if (type === "exclusivites" || type === "accessoires") setValue("edition", undefined);
                            setValue("type", type);
                        }}/>
                        {errors.type && <p className="text-red-500 mt-2">{errors.type.message}</p>}
                    </div>

                    {/* Edition de l'article */}
                    {selectedType !== "exclusivites" && selectedType !== "accessoires" && selectedType !== "" && (
                        <EditionSelector
                            error={errors.edition?.message}
                            defineEditionValue={(edition) => setValue("edition", edition ?? undefined)}
                            selectedEdition={watch("edition") ?? undefined}
                            initialValue={article.edition ?? undefined} // Assurer que null est transformé en undefined
                        />

                    )}

                    {/* Titre */}
                    <div className="mt-12">
                        <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 ${errors.title ? "bg-red-500" : "bg-gray-700"}`}>Titre</p>
                        <p className={"mt-2 text-md text-gray-600 font-medium mb-3"}>Choisissez le titre de l&#39;article (20 charactères)</p>
                        <input {...register("title")} disabled={isLoading} className="px-3 py-2 w-full outline-none border rounded-md"/>
                        {errors.title && <p className="text-red-500 mt-2">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="mt-12">
                        <p className={`text-xl font-semibold text-white rounded-md w-fit mb-3 shadow-md py-2 px-5 ${errors.description ? "bg-red-500" : "bg-gray-700"}`}>Description</p>
                        <p className={"mt-2 text-md text-gray-600 font-medium mb-3"}>Choisissez la description de l&#39;article</p>
                        <textarea {...register("description")} disabled={isLoading}
                                  className="px-3 py-2 w-full h-40 outline-none border rounded-md"></textarea>
                        {errors.description && <p className="text-red-500 mt-2">{errors.description.message}</p>}
                    </div>

                    {/* Prix et Stock */}
                    <div className="mt-12 flex gap-6">
                    <div className="w-1/2">
                            <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 ${errors.price ? "bg-red-500" : "bg-gray-700"}`}>Prix</p>
                            <p className={"mb-1 mt-2 font-medium text-gray-600"}>Prix de l&#39;article (en euros)</p>
                            <input type="number" {...register("price")}
                                   className="px-3 shadow-gray-400 shadow-md py-2 w-full outline-none border rounded-md"/>
                            {errors.price && <p className="text-red-500 mt-2">{errors.price.message}</p>}
                        </div>
                        <div className="w-1/2">
                        <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 ${errors.amount ? "bg-red-500" : "bg-gray-700"}`}>Stock</p>
                            <p className={"mb-1 mt-2 font-medium text-gray-600"}>Nombre d&apos;articles en stock</p>
                            <input type="number" disabled={isLoading} {...register("amount")} defaultValue={article.amount}
                                   className="px-3 py-2 w-full shadow-gray-400 shadow-md outline-none border rounded-md"/>
                            {errors.amount && <p className="text-red-500 mt-2">{errors.amount.message}</p>}
                        </div>
                    </div>

                    {/* Image */}
                    <ImageUploader imageUrl={watch("image")} setImageUrl={(url) => setValue("image", url)}
                                   error={errors.image?.message}/>

                    {/* Bouton de mise à jour */}
                    <button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 mt-6 rounded-lg shadow-md">
                        {btnText}
                    </button>
                </div>
            </div>
        </form>
    );
}
