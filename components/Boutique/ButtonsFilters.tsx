"use client";

import React, { useState } from "react";

interface ButtonsFiltersProps {
    setTypeQuery: (type: string | null) => void;
}

export default function ButtonsFilters({ setTypeQuery }: ButtonsFiltersProps) {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const filters = [
        {
            label: "Cartes FR",
            value: "cartesfr",
            emoji: "🇫🇷"
        },
        {
            label: "Cartes JP",
            value: "cartesjap",
            emoji: "🇯🇵"
        },
        {
            label: "Display FR",
            value: "displayfr",
            emoji: "📦"
        },
        {
            label: "Display JP",
            value: "displayjap",
            emoji: "🎁"
        },
        {
            label: "Accessoires",
            value: "accessoires",
            emoji: "⚡"
        },
        {
            label: "Exclusivités",
            value: "exclusivites",
            emoji: "✨"
        },
    ];

    const handleClick = (value: string) => {
        if (activeButton === value) {
            setActiveButton(null);
            setTypeQuery(null);
        } else {
            setActiveButton(value);
            setTypeQuery(value);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 mb-6">
            <div className="flex flex-wrap justify-center gap-3">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => handleClick(filter.value)}
                        className={`
                            inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium 
                            transition-all duration-200 border
                            ${activeButton === filter.value
                            ? 'bg-yellow-500 text-white border-yellow-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                        `}
                    >
                        <span className="text-base">{filter.emoji}</span>
                        <span>{filter.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}