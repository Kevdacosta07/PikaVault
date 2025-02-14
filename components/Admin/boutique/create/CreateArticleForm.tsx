"use client";

import React, {useState} from "react";
import AdminButtonsFilters from "@/components/Admin/boutique/create/AdminButtonsFilters";
import EditionSelector from "@/components/Admin/boutique/create/EditionSelector";
import ImageUploader from "@/components/Admin/boutique/create/ImageUploader";
import { createArticle } from "@/actions/ArticleActions";
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation avec Zod
const articleSchema = z.object({
    title: z.string()
        .min(4, "Le titre doit posséder 4 caractères minimum")
        .max(25, "Le titre ne doit pas excéder 25 caractères"),

    description: z.string().min(20, "La description doit contenir au minimum 20 caractères"),

    type: z.string().min(1, "Veuillez choisir un type d'objet"),

    price: z.preprocess((val) => Number(val),
        z.number()
            .positive("Le prix doit être supérieur à 0")
            .max(999999, "Le prix ne doit pas dépasser 6 chiffres")
    ),

    amount: z.preprocess((val) => Number(val),
        z.number()
            .int("Le stock doit être un entier")
            .positive("Le stock doit être un nombre positif")
            .max(999999, "Le stock ne doit pas dépasser 6 chiffres")
    ),

    edition: z.string().optional(),

    image: z.string().min(1, "Une image est obligatoire"),
}).refine((data) => ({
    ...data,
    imageUrl: data.image
})).refine((data) => {
    // Si le type est défini et différent de "accessoires" et "exclusivites", edition est requise
    if (data.type !== "accessoires" && data.type !== "exclusivites") {
        return data.edition !== undefined && data.edition.trim() !== "";
    }
    return true; // Sinon, edition peut être vide
}, {
    message: "L'édition est obligatoire pour cet objet",
    path: ["edition"], // Cible l'erreur sur "edition"
});




// Définition du type basé sur le schéma
type ArticleFormData = z.infer<typeof articleSchema>;

export default function CreateArticleForm() {
    const [btnText, setBtnText] = useState("Ajouter un article");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Intégration de React Hook Form avec Zod
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            amount: 0,
            edition: "",
            type: "",
            image: "",
        },
    });


    const selectedType = watch("type");

    const onSubmit = async (data: ArticleFormData) => {
        setBtnText("Ajout de l'article...");
        setIsLoading(true);

        try {
            await createArticle({
                ...data,
                imageUrl: data.image, // Ajout explicite de `imageUrl`
            });
            setBtnText("Article ajouté avec succès !");
            setTimeout(() => {
                setIsLoading(false);
                router.push("/admin/articles");
            }, 2000);
        } catch (e) {
            setBtnText(`Une erreur est survenue : ${e}`);
        }

        setIsLoading(false);
    };


    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className={"flex justify-center"}>
                <div className={"py-8 px-20 bg-gray-200 shadow-md shadow-gray-300 mb-10"}>

                    {/* Sélection du type d'objet */}
                    <div className="flex justify-center flex-col w-full">
                        <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 
                            ${errors.type ? "bg-red-500" : (watch("type") && !errors.type) ? "bg-green-500" : "bg-gray-700"}`}>
                            Catégorie de l&#39;article
                        </p>
                        <p className={"text-gray-600 font-normal mt-1"}>Choisissez la catégorie correspondante à votre
                            article</p>
                        {errors.type && <p className="text-red-500 mt-2">{errors.type.message}</p>}
                        <AdminButtonsFilters setTypeValue={(type) => {
                            if (type === "exclusivites" || type === "accessoires")
                            {
                                setValue("edition", undefined)
                            }

                            setValue("type", type)
                        }} />
                    </div>

                    {/* Edition de l'article */}
                    {selectedType !== "exclusivites" && selectedType !== "accessoires" && selectedType !== "" && (
                        <div className={"mt-12 w-full"}>
                            <EditionSelector
                                error={errors.edition?.message}
                                defineEditionValue={(edition) => setValue("edition", edition)}
                                selectedEdition={watch("edition")}
                            />
                            {errors.edition && <p className="text-red-500 text">{errors.edition.message}</p>}
                        </div>
                    )}

                    {/* Titre de l'article */}
                    <div className={"mt-12"}>
                        <div className={"flex flex-col"}>
                            <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 ${errors.title ? "bg-red-500" : (watch("title").length >= 4 && !errors.title) ? "bg-green-500" : "bg-gray-700"}`}>Titre de l&#39;article</p>
                            <p className={"text-gray-600 text-md mt-1"}>Saisissez uniquement le nom de l&#39;article de manière simple</p>
                            <input
                                {...register("title")}
                                type="text"
                                placeholder="Ex : Pikachu EX"
                                className={`px-3 py-2 w-full outline-none font-light text-xl shadow-md rounded-md mt-2 shadow-gray-400 ${errors.title ? "border-red-500 shadow-red-300" : (watch("title").length >= 4 && !errors.title) ? "border-green-500 border shadow-green-300" : "border-gray-300"}`}
                                disabled={isLoading}
                            />
                            {errors.title && <p className="text-red-500 text mt-2">{errors.title.message}</p>}
                        </div>
                    </div>

                    {/* Description de l'article */}
                    <div className="mt-12 w-full">
                        <div className="flex w-full justify-center flex-col">
                            <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 
                                ${errors.description ? "bg-red-500" : (watch("description").length >= 20 && !errors.description) ? "bg-green-500" : "bg-gray-700"}`}>
                                Description de l&#39;article
                            </p>
                            <p className="text-gray-600 text-md mt-1">Tous les détails concernant l&#39;article doivent être présents</p>
                            <textarea
                                {...register("description")}
                                placeholder="Description de l'article"
                                className={`px-3 py-2 font-normal resize-none outline-none text-xl shadow-md rounded-md mt-5 text-black h-[300px] w-[600px] shadow-gray-400
                                ${errors.description ? "border-red-500 shadow-red-300" : (watch("description").length >= 20 && !errors.description) ? "border-green-500 border shadow-green-300" : "border-gray-300"}`}
                                disabled={isLoading}
                            />
                            {errors.description && <p className="text-red-500 mt-2">{errors.description.message}</p>}
                        </div>
                    </div>



                    {/* Prix */}
                    <div className={"mt-12"}>
                        <div className={"flex justify-center flex-col"}>
                            <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 ${errors.price ? "bg-red-500" : (watch("price") > 0 && !errors.price) ? "bg-green-500" : "bg-gray-700"}`}>Prix</p>
                            <p className={"text-gray-600 text-md mt-1"}>Le prix de l&#39;article est en euros (€)</p>
                            <input
                                {...register("price")}
                                type="number"
                                placeholder="Prix de l'article"
                                className={`px-3 py-2 w-full font-normal outline-none text-xl shadow-md rounded-md mt-5 shadow-gray-400 ${errors.price ? "border-red-500 shadow-red-300" : (watch("price") > 0 && !errors.price) ? "border-green-500 border shadow-green-300" : "border-gray-300"}`}
                                disabled={isLoading}
                            />
                            {errors.price && <p className="text-red-500 mt-2">{errors.price.message}</p>}
                        </div>
                    </div>

                    {/* Stock de l'article */}
                    <div className={"mt-12"}>
                        <div className={"flex justify-center flex-col"}>
                            <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 ${errors.amount ? "bg-red-500" : (watch("amount") > 0 && !errors.amount) ? "bg-green-500" : "bg-gray-700"}`}>Stock de l&#39;article</p>
                            <p className={"text-gray-600 text-md mt-1"}>Le nombre d&#39;article que vous possédez</p>
                            <input
                                {...register("amount")}
                                type="number"
                                placeholder="Nombre d'articles en stock"
                                className={`px-3 py-2 w-full outline-none font-normal text-xl shadow-md rounded-md mt-3 shadow-gray-400 ${errors.amount ? "border-red-500 shadow-red-300" : (watch("amount") > 0 && !errors.amount) ? "border-green-500 border shadow-green-300" : "border-gray-300"}`}
                                disabled={isLoading}
                            />
                            {errors.amount && <p className="text-red-500 mt-2">{errors.amount.message}</p>}
                        </div>
                    </div>

                    {/* Image de l'article */}
                    <div>
                        <ImageUploader
                            imageUrl={watch("image")}
                            setImageUrl={(url) => setValue("image", url)}
                            error={errors.image?.message}
                        />
                    </div>

                    {/* Bouton de validation */}
                    <div className={"flex justify-center flex-col items-center mt-12"}>
                        <button type={"submit"} className={"px-3 py-2 bg-orange-500  rounded-xl shadow-gray-400 shadow-md text-white font-semibold text-xl transition-colors hover:bg-orange-600 duration-200"}>
                            {btnText}
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
}
