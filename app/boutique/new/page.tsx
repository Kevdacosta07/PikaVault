'use client';

import "./new.css"
import {useState} from "react";
import {createArticleAction} from "@/app/boutique/new/articles.action";

export default function Page()
{
    const [isLoading, setIsLoading] = useState(false);

    const createArticle = async (FormData : FormData) =>
    {
        setIsLoading(true)

        const json = await createArticleAction({
            name : String(FormData.get("name")),
            price: Number(FormData.get("price")),
            category: String(FormData.get("category")),
            edition: String(FormData.get("edition")),
            quantity: String(FormData.get("quantity")),
        });

        console.log(json)

        setIsLoading(false);
    }

    return (
        <div className="newFormWrapper">

            <div className="text">
                <h1>Ajouter un article</h1>
                <p>Vous êtes sur le point d&#39;ajouter un article à la boutique</p>
            </div>

            <form className="newItemBoutiqueForm" action={async (formData) => {createArticle(formData)}}>
                <div className="section">
                    <label htmlFor="name">Nom de l&#39;article</label>
                    <input name="name" placeholder="Sair un nom"/>
                </div>

                <div className="section">
                    <label htmlFor="price">Prix</label>
                    <input type="number" name="price" placeholder="Saisir un prix"/>
                </div>

                <div className="section">
                    <label htmlFor="category">Catégorie de l&#39;article</label>
                    <select name="category">
                        <option value="cartes_fr">Cartes FR</option>
                        <option value="display_fr">Display FR</option>
                        <option value="cartes_jp">Cartes JAP</option>
                        <option value="display_jp">Display JAP</option>
                        <option value="display_jp">Accessoires</option>
                        <option value="exclusivites">Exclusivités</option>
                    </select>
                </div>

                <div className="section">
                    <label htmlFor="edition">Edition de l&#39;article</label>
                    <input name="edition" placeholder="Saisir une edition"/>
                </div>

                <div className="section">
                    <label htmlFor="quantity">Nombre d&#39;articles en stock</label>
                    <input type="number" name="quantity" placeholder="Saisir le nombre de stock"/>
                </div>

                <button disabled={isLoading} type="submit">{isLoading ? "Chargement..." : "Ajouter un article"}</button>
            </form>
        </div>
);
}