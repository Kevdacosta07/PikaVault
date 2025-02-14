"use client";

import React, { createContext, useState, useEffect } from "react";

interface PanierItem {
    id: string;
    title: string;
    price: number;
    amount: number;
    image: string;
}

interface PanierContextType {
    panier: PanierItem[];
    setPanier: React.Dispatch<React.SetStateAction<PanierItem[]>>;
    ajouterAuPanier: (article: PanierItem) => void;
    supprimerDuPanier: (id: string, removeAll?: boolean) => void;
}

export const PanierContext = createContext<PanierContextType | undefined>(undefined);

export const PanierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [panier, setPanier] = useState<PanierItem[]>([]);

    useEffect(() => {
        const panierSauvegarde = localStorage.getItem("panier");
        if (panierSauvegarde) {
            setPanier(JSON.parse(panierSauvegarde));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("panier", JSON.stringify(panier));
    }, [panier]);

    const ajouterAuPanier = (article: PanierItem) => {
        setPanier((prevPanier) => {
            const existingItem = prevPanier.find((item) => item.id === article.id);
            if (existingItem) {
                return prevPanier.map((item) =>
                    item.id === article.id ? { ...item, amount: item.amount + 1 } : item
                );
            } else {
                return [...prevPanier, { ...article, amount: 1 }];
            }
        });
    };

    const supprimerDuPanier = (id: string, removeAll: boolean = false) => {
        setPanier((prevPanier) =>
            removeAll
                ? prevPanier.filter((item) => item.id !== id)
                : prevPanier
                    .map((item) =>
                        item.id === id ? { ...item, amount: item.amount - 1 } : item
                    )
                    .filter((item) => item.amount > 0)
        );
    };

    return (
        <PanierContext.Provider value={{ panier, setPanier, ajouterAuPanier, supprimerDuPanier }}>
            {children}
        </PanierContext.Provider>
    );
};
