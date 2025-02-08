import React, { useState } from "react";

interface ButtonsFiltersProps {
    setTypeQuery: (type: string | null) => void;
}

export default function ButtonsFilters({ setTypeQuery }: ButtonsFiltersProps) {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const buttons = [
        { label: "Cartes", value: "cartesfr", url: "https://flagcdn.com/w320/fr.png", alt: "Drapeau français" },
        { label: "Display", value: "displayfr", url: "https://flagcdn.com/w320/fr.png", alt: "Drapeau français" },
        { label: "Cartes", value: "cartesjap", url: "https://flagcdn.com/w320/jp.png", alt: "Drapeau japonais" },
        { label: "Display", value: "displayjap", url: "https://flagcdn.com/w320/jp.png", alt: "Drapeau japonais" },
        { label: "Accessoires", value: "accessoires" },
        { label: "Exclusivités", value: "exclusivites" },
    ];

    const handleClick = (value: string) => {
        if (activeButton === value) {
            setActiveButton(null);
            setTypeQuery("");
        } else {
            setActiveButton(value);
            setTypeQuery(value);
        }
    };

    return (
        <div className="flex flex-col mt-12 mb-5">
            {/* Première ligne de boutons */}
            <div className="flex justify-center">
                {buttons.slice(0, 4).map(({ label, value, url, alt }) => (
                    <button
                        key={value}
                        className={`shadow-gray-400 flex justify-center items-center shadow-md mx-2 px-3 py-2 rounded-full font-bold 
                        ${activeButton === value ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => handleClick(value)}
                    >
                        {label}
                        {url && <img src={url} alt={alt} className="h-[20px] shadow-md shadow-gray-400 rounded ml-2 w-auto" />}
                    </button>
                ))}
            </div>

            {/* Deuxième ligne de boutons */}
            <div className="flex justify-center mt-5">
                {buttons.slice(4).map(({ label, value }) => (
                    <button
                        key={value}
                        className={`shadow-gray-400 shadow-md mx-2 px-3 py-2 rounded-full font-bold 
                        ${activeButton === value ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => handleClick(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
