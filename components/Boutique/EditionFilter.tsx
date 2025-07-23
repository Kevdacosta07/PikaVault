
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

interface EditionFilterProps {
    setEditionQuery: (type: string | null) => void;
}

export default function EditionFilter({ setEditionQuery }: EditionFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Toutes les éditions");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = [
        { label: "Toutes les éditions", value: "" },
        { label: "Écarlate & Violet", value: "ecarlate" },
        { label: "Rubis & Saphir", value: "rubis" },
        { label: "Soleil & Lune", value: "soleil" },
        { label: "XY", value: "xy" },
        { label: "Noir & Blanc", value: "noir" },
    ];

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Fermer avec Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    // Gérer le clic sur une option
    const handleSelect = (label: string, value: string) => {
        setSelectedOption(label);
        setEditionQuery(value || null);
        setIsOpen(false);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    Filtrer par édition :
                </label>

                <div className="relative w-full sm:max-w-xs" ref={dropdownRef}>
                    {/* Bouton principal */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 bg-white border rounded-xl shadow-sm transition-all duration-200 ${
                            isOpen
                                ? 'border-yellow-500 ring-2 ring-yellow-500/20'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <span className="text-gray-900 font-medium truncate">
                            {selectedOption}
                        </span>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`text-gray-400 text-sm transition-transform duration-200 flex-shrink-0 ml-2 ${
                                isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                    </button>

                    {/* Menu déroulant avec animation */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                            >
                                <div className="py-2">
                                    {options.map(({ label, value }) => (
                                        <button
                                            key={value}
                                            onClick={() => handleSelect(label, value)}
                                            className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-150 ${
                                                selectedOption === label
                                                    ? 'bg-yellow-50 text-yellow-900'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="font-medium">{label}</span>
                                            {selectedOption === label && (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="text-yellow-600 text-sm"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}