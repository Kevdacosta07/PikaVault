"use client";

import { useContext, useEffect, useState } from "react";
import { PanierContext } from "@/components/Providers/PanierProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash, faPlus, faMinus, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";


interface UserProfile {
    name: string;
    adress: string;
    city: string;
    cp: string;
    country: string;
}

export default function ShowPanier({ session }: { session: Session | null }) {


    const panierContext = useContext(PanierContext) ?? { panier: [], ajouterAuPanier: () => {}, supprimerDuPanier: () => {} };

    console.log(panierContext);

    const { panier, ajouterAuPanier, supprimerDuPanier } = panierContext;
    const [isClient, setIsClient] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isSendingDataHidden, setSendingDataHidden] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/request/profile");
                const data: UserProfile = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Erreur de récupération du profil :", error);
            } finally {
                setIsLoadingUser(false);
            }
        }
        fetchUser();
    }, []);

    if (!isClient) {
        return <p className="text-center text-gray-600">Chargement du panier...</p>;
    }

    if (!panier || panier.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center mt-16">
                <h1 className="text-3xl font-bold text-center mb-6">🛒 Votre Panier</h1>
                <p className="text-xl font-medium text-gray-600 mb-5">Aucun article n&#39;a été ajouté.</p>
                <Link href="/boutique"
                      className="px-6 py-1 bg-orange-500 rounded-full font-medium text-lg shadow-md shadow-gray-400 text-white">
                    Aller à la boutique
                </Link>
            </div>
        );
    }

    const total = panier.reduce((acc, article) => acc + article.price * article.amount, 0);

    // ✅ Gestion du paiement
    const handleCheckout = async () => {
        if (!session?.user?.id) {
            setError("Erreur : Aucun utilisateur trouvé pour la commande.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session.user.email,
                    userId: session.user.id,
                    destinataire: profile?.name,
                    adress: profile?.adress,
                    city: profile?.city,
                    country: profile?.country,
                    cp: profile?.cp,
                    items: panier.map((article) => ({
                        id: article.id,
                        title: article.title,
                        price: article.price,
                        amount: article.amount,
                        image: article.image,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors du paiement.");
            }

            // ✅ Vider le panier après paiement
            localStorage.removeItem("panier");

            window.location.href = data.url; // Redirection vers Stripe Checkout
        } catch (error) {
            console.error("Erreur de paiement :", error);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-20 mx-auto my-auto mt-20">
            <h1 className="text-3xl font-bold text-center mb-6">🛒 Votre Panier</h1>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {panier.map((article, index: number) => (
                    <div key={index} className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center gap-4">
                            <Image src={article.image} alt={article.title} width={80} height={80} className="rounded" />
                            <div>
                                <p className="text-lg font-semibold">{article.title}</p>
                                <p className="text-gray-600">{article.price} €</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className={"flex gap-2"}>
                                <button onClick={() => supprimerDuPanier(article.id)}
                                        className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-full text-black">
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <p className="text-lg font-semibold w-6 text-center">{article.amount}</p>
                                <button onClick={() => ajouterAuPanier(article)}
                                        className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-full text-black">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <button onClick={() => supprimerDuPanier(article.id, true)}
                                    className="text-red-600 hover:text-red-800 transition-colors duration-200">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}

                <div className="mt-6 p-4 bg-gray-100 rounded-md">
                    <button onClick={() => setSendingDataHidden(!isSendingDataHidden)}
                            className="text-xl font-semibold flex items-center gap-2">
                        Adresse d&#39;expédition
                        <FontAwesomeIcon icon={isSendingDataHidden ? faChevronUp : faChevronDown} />
                    </button>
                    {isLoadingUser ? (
                        <p className="text-gray-600">Chargement...</p>
                    ) : profile ? (
                        isSendingDataHidden && (
                            <div className="bg-gray-200 p-3 mt-2 rounded-md ml-3">
                                <p className="font-semibold text-gray-900">Destinataire</p>
                                <p className="text-gray-800 text-lg">{profile.name}</p>

                                <p className="font-semibold text-gray-900 mt-3">Adresse</p>
                                <p className="text-gray-800 text-lg">{profile.adress}, {profile.city}, {profile.cp}, {profile.country}</p>
                            </div>
                        )
                    ) : (
                        <p className="text-red-500">Aucune adresse renseignée.</p>
                    )}
                </div>

                <div className="flex justify-between items-center mt-6">
                    <p className="text-xl font-semibold">Total: {total.toFixed(2)} €</p>
                    {profile ? (
                        <button onClick={handleCheckout} disabled={isProcessing}
                                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Finaliser l&#39;achat
                        </button>
                    ) : (
                        <Link href={`/profile/${session?.user?.id}`}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-full">
                            Ajouter une adresse
                        </Link>
                    )}
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}
