import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";

interface EditionSelectorProps {
    defineEditionValue: (type: string) => void;
}

export default function EditionSelector({ defineEditionValue }: EditionSelectorProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Sélectionnez une édition");
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
        setSelectedOption(label);
        defineEditionValue(value);
        setIsOpen(false);
    };

    return (
        <div className="flex justify-center flex-col items-center mt-3 w-full">
            <p className={"mt-3 px-3 py-2 mb-2 text-2xl flex justify-center font-semibold text-white shadow-md bg-orange-500 shadow-gray-400 rounded-xl"}>
                Édition Pokemon
            </p>
            <p className="text-gray-600 font-normal text-m text-2xl mb-6">Sélectionnez une édition de cartes</p>
            <div className="relative inline-block text-left w-full" ref={dropdownRef}>
                {/* Bouton principal */}
                <button
                    className="bg-gray-100 px-4 py-2 rounded shadow-md text-xl font-medium shadow-gray-400 flex items-center gap-2 w-full"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    Edition : {selectedOption} {isOpen ? "▲" : "▼"}
                </button>

                {/* Menu déroulant */}
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2, ease: "easeInOut"}}
                        className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-md z-10 overflow-hidden"
                        role="menu"
                    >
                        {options.map(({label, value}) => (
                            <div
                                key={value}
                                className="px-4 py-2 cursor-pointer text-xl hover:bg-gray-100 transition-colors"
                                onClick={() => handleSelect(label, value)}
                                role="menuitem"
                            >
                                {label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    )
}