"use client";

import React, {ChangeEvent, useState} from "react";
import AdminButtonsFilters from "@/components/Admin/boutique/create/AdminButtonsFilters";
import EditionSelector from "@/components/Admin/boutique/create/EditionSelector";
import ImageUploader from "@/components/Admin/boutique/create/ImageUploader";
import {createArticle} from "@/actions/ArticleActions";
import {useRouter} from "next/navigation";

export default function CreateArticleForm() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        amount: 0,
        edition: "",
        type: "",
        image: "",
        imageUrl: ""
    });

    const [imageUrl, setImageUrl] = useState("");
    const [typeValue, setTypeValue] = useState("");
    const [editionValue, setEditionValue] = useState("");
    const [btnText, setBtnText] = useState("Ajouter l'article");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();


    const defineTypeValue = (type: string) => {
        setTypeValue(type);
    }

    const defineEditionValue = (type: string) => {
        setEditionValue(type);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        setBtnText("Ajout de l'article...")
        setIsLoading(true);

        try {
            formData.type = typeValue;
            formData.edition = editionValue;
            formData.image = imageUrl;

            console.log(formData.image);

            await createArticle(formData);

            setBtnText("Article ajouté avec succès !")

            setTimeout(() => {
                setIsLoading(false);
                router.push("/admin/articles");
            }, 2000);

        }
        catch (e)
        {
            setBtnText(`Une erreur est survenue : ${e}`)
        }

        setIsLoading(false);
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className={"flex justify-center"}>
                <div className={"py-8 px-20 bg-gray-200 shadow-xl shadow-gray-300"}>

                    {/* Sélection du type d'objet */}
                    <div className="flex text-2xl justify-center flex-col items-center w-full">
                        <p className="py-2 px-3 bg-orange-500 rounded-xl shadow-md font-semibold text-white shadow-gray-400">
                            Type d&#39;objet
                        </p>
                        <p className="text-gray-600 font-normal mt-2">Sélectionnez le type d&#39;objet</p>
                        <AdminButtonsFilters setTypeValue={defineTypeValue}/>
                    </div>

                    {/* Menu déroulant */}
                    {typeValue !== "exclusivites" && typeValue !== "accessoires" && typeValue !== "" && (
                        <div className={"mt-8 w-full"}>
                            <EditionSelector defineEditionValue={defineEditionValue}/>
                        </div>
                    )}

                    {/* Titre de l'article */}
                    <div className={"mt-12"}>
                        <div className={"flex justify-center flex-col items-center"}>
                            <p className="py-2 px-3 text-2xl bg-orange-500 rounded-xl shadow-md font-semibold text-white shadow-gray-400">
                                Titre de l&#39;article
                            </p>
                            <p className="text-gray-600 font-normal text-2xl mt-2">Définir le titre de l&#39;article</p>
                            <input
                                type="text"
                                name="title"
                                placeholder="Titre de l'article"
                                className={"px-3 py-2 w-full outline-none font-normal text-xl shadow-md rounded-md mt-5 shadow-gray-400"}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Description de l'article */}
                    <div className={"mt-12 w-full"}>
                        <div className={"flex w-full justify-center flex-col items-center"}>
                            <p className="py-2 px-3 text-2xl bg-orange-500 rounded-xl shadow-md font-semibold text-white shadow-gray-400">
                                Description de l&#39;article
                            </p>
                            <p className="text-gray-600 font-normal text-2xl mt-2">Définir la description de l&#39;article</p>

                            <textarea
                                name="description"
                                placeholder="Description de l'article"
                                className={"px-3 py-2 font-normal outline-none text-xl shadow-md rounded-md mt-5 text-black h-[300px] w-[600px] shadow-gray-400"}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Photo de l'article */}
                    <div>
                        <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    </div>

                    {/* Prix */}
                    <div className={"mt-12"}>
                        <div className={"flex justify-center flex-col items-center"}>
                            <p className="py-2 px-3 text-2xl bg-orange-500 rounded-xl shadow-md font-semibold text-white shadow-gray-400">
                                Prix de l&#39;article
                            </p>
                            <p className="text-gray-600 font-normal text-2xl mt-2">Définir le prix de l&#39;article</p>
                            <input
                                type="number"
                                name="price"
                                placeholder="Prix de l'article"
                                className={"px-3 py-2 w-full font-normal outline-none text-xl shadow-md rounded-md mt-5 shadow-gray-400"}
                                disabled={isLoading}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Stock de l'article */}
                    <div className={"mt-12"}>
                        <div className={"flex justify-center flex-col items-center"}>
                            <p className="py-2 px-3 text-2xl bg-orange-500 rounded-xl shadow-md font-semibold text-white shadow-gray-400">
                                Stock de l&#39;article
                            </p>
                            <p className="text-gray-600 font-normal text-2xl mt-2">Définir le stock de l&#39;article</p>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Nombre d'articles en stock"
                                className={"px-3 py-2 w-full outline-none font-normal text-xl shadow-md rounded-md mt-5 shadow-gray-400"}
                                disabled={isLoading}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Bouton de validation */}
                    <div className={"flex justify-center flex-col items-center mt-12"}>
                        <button type={"submit"} className={"px-3 py-2 bg-black rounded-xl shadow-gray-400 shadow-md text-white font-semibold text-xl transition-colors hover:bg-green-400 hover:text-black duration-200"}>{btnText}</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
