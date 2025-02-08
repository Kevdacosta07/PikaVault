import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"; // Import de Framer Motion

interface EditionFilterProps {
    setEditionQuery: (type: string | null) => void;
}

export default function EditionFilter({ setEditionQuery }: EditionFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Aucune");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = [
        { label: "Aucune", value: "" },
        { label: "Rubis", value: "rubis" },
        { label: "Écarlate", value: "ecarlate" }
    ];

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Gérer le clic sur une option
    const handleSelect = (label: string, value: string) => {
        setSelectedOption(label); // Mettre à jour le texte affiché
        setEditionQuery(value); // Mettre à jour le filtre
        setIsOpen(false); // Fermer le menu
    };

    return (
        <div className="flex justify-center">
            <div className="relative inline-block text-left mt-5" ref={dropdownRef}>
                {/* Bouton principal */}
                <button
                    className="bg-gray-200 px-4 py-2 rounded shadow-md font-bold flex items-center gap-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Edition : {selectedOption} {isOpen ? "▲" : "▼"}
                </button>

                {/* Menu déroulant avec animation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-md z-10 overflow-hidden"
                    >
                        {options.map(({ label, value }) => (
                            <div
                                key={value}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSelect(label, value)}
                            >
                                {label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
