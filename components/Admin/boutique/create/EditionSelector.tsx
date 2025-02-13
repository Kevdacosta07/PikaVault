import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; // Icône flèche

interface EditionSelectorProps {
    defineEditionValue: (type: string) => void;
    error?: string;
    selectedEdition?: string;
    initialValue?: string; // ✅ Ajout du champ
}

export default function EditionSelector({ defineEditionValue, error, initialValue }: EditionSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = [
        { label: "Aucune", value: "" },
        { label: "Rubis", value: "rubis" },
        { label: "Écarlate", value: "ecarlate" }
    ];

    // ✅ Définir une valeur par défaut au premier rendu
    const [selectedOption, setSelectedOption] = useState(
        options.find(opt => opt.value === initialValue)?.label || "Sélectionnez une édition"
    );

    useEffect(() => {
        if (initialValue) {
            setSelectedOption(options.find(opt => opt.value === initialValue)?.label || "Sélectionnez une édition");
        }
    }, [initialValue]);

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
        setSelectedOption(label);
        defineEditionValue(value);
        setIsOpen(false);
    };

    return (
        <div className="flex justify-center flex-col mt-3 w-full">
            <p className={`text-xl font-semibold text-white rounded-md w-fit shadow-md py-2 px-5 
                ${selectedOption !== "Sélectionnez une édition" && selectedOption !== "Aucune" ? "bg-green-700" : (error) ? "bg-red-500" : "bg-gray-700"}`}>
                Édition Pokémon
            </p>

            <p className="text-gray-600 text-md font-medium mb-2">
                Choisissez l&#39;édition correspondante à votre article
            </p>

            {/* Sélecteur d'édition */}
            <div className="relative w-full" ref={dropdownRef}>
                <button
                    type={"button"}
                    className={`flex justify-between items-center w-full px-4 py-2 rounded shadow-md text-xl font-medium transition-all
                        ${error ? "border-2 border-red-500" : "border border-gray-300"}
                        bg-gray-100 focus:outline-none`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    {selectedOption}
                    <ChevronDownIcon className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Menu déroulant */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-md z-10 overflow-hidden"
                            role="menu"
                        >
                            {options.map(({ label, value }) => (
                                <div
                                    key={value}
                                    className="px-4 py-2 cursor-pointer text-xl hover:bg-orange-500 hover:text-white transition-colors"
                                    onClick={() => handleSelect(label, value)}
                                    role="menuitem"
                                >
                                    {label}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
