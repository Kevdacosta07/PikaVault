import React, { useState, useEffect } from "react";

interface ButtonsFiltersProps {
    setTypeValue: (type: string) => void;
    defaultSelection?: string;
}

export default function AdminButtonsFilters({ setTypeValue, defaultSelection }: ButtonsFiltersProps) {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const buttons = [
        { label: "Cartes", value: "cartesfr", url: "https://flagcdn.com/w320/fr.png", alt: "Drapeau français" },
        { label: "Display", value: "displayfr", url: "https://flagcdn.com/w320/fr.png", alt: "Drapeau français" },
        { label: "Cartes", value: "cartesjap", url: "https://flagcdn.com/w320/jp.png", alt: "Drapeau japonais" },
        { label: "Display", value: "displayjap", url: "https://flagcdn.com/w320/jp.png", alt: "Drapeau japonais" },
        { label: "Accessoires", value: "accessoires" },
        { label: "Exclusivités", value: "exclusivites" },
    ];

    // ✅ Appliquer la sélection par défaut uniquement une seule fois
    useEffect(() => {
        if (defaultSelection && activeButton === null) {
            setActiveButton(defaultSelection);
            setTypeValue(defaultSelection);
        }
    }, [defaultSelection]); // 🔥 On enlève `setTypeValue` des dépendances pour éviter la boucle

    const handleClick = (value: string) => {
        if (activeButton === value) {
            setActiveButton(null);
            setTypeValue("");
        } else {
            setActiveButton(value);
            setTypeValue(value);
        }
    };

    return (
        <div className="flex flex-col mt-4">
            {/* Première ligne de boutons */}
            <div className="flex flex-wrap gap-2">
                {buttons.slice(0, 4).map(({ label, value, url, alt }) => (
                    <button
                        key={value}
                        className={`shadow-gray-400 flex justify-center text-xl items-center shadow-md mr-2 px-3 py-2 rounded-md font-bold 
                        ${activeButton === value ? "bg-blue-500 text-white" : "bg-gray-50"}`}
                        type="button"
                        onClick={() => handleClick(value)}
                    >
                        {label}
                        {url && <img src={url} alt={alt} className="h-[20px] shadow-md shadow-gray-400 rounded ml-2 w-auto" />}
                    </button>
                ))}
            </div>

            {/* Deuxième ligne de boutons */}
            <div className="flex flex-wrap gap-2 mt-5">
                {buttons.slice(4).map(({ label, value }) => (
                    <button
                        key={value}
                        className={`shadow-gray-400 shadow-md mr-2 px-3 py-2 text-xl rounded-md font-bold 
                        ${activeButton === value ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                        onClick={() => handleClick(value)}
                        type="button"
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
