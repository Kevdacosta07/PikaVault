"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Import de l'animation fluide
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Chevron dynamique

export default function StatusBadge({ status }: { status: string }) {
    const [isOpen, setIsOpen] = useState(false);

    // Définition des statuts avec leur description et couleur
    const statusData: Record<string, { label: string; description: string; color: string }> = {
        "En examen...": {
            label: "En examen...",
            description: "Vous êtes placé sur la liste d'attente un de nos experts va examiner votre offre.",
            color: "bg-yellow-200 text-orange-800 hover:bg-yellow-300",
        },
        "Refusée": {
            label: "Refusée",
            description: "Votre offre a été refusée. Le prix était peut-être trop élevé ou les articles trop endommagés.",
            color: "bg-red-300 text-red-800 hover:bg-red-400",
        },
        "Expédition en attente...": {
            label: "Expédition en attente...",
            description: "Votre offre a été validée par nos experts, vous pouvez désormais procéder à l'expédition de vos articles.",
            color: "bg-orange-300 text-orange-800 hover:bg-orange-400",
        },
        "Paiement en attente...": {
            label: "Paiement en attente...",
            description: "Vos articles sont en route vers nos locaux. Ils vont être analysés de plus près par nos experts afin de vérifier l'authenticité et l'état de vos article. Votre offre peut encore être annulée en cas de dommage supplémentaires non indiqués dans l'offre ou de contrefaçon.",
            color: "bg-blue-300 text-blue-800 hover:bg-blue-400",
        },
        "Payée": {
            label: "Payée",
            description: "Vous avez reçu le paiement l'offre est conclue !",
            color: "bg-green-300 text-green-800 hover:bg-green-400",
        },
    };

    const currentStatus = statusData[status] || {
        label: "Statut inconnu",
        description: "Le statut fourni n'est pas reconnu.",
        color: "bg-gray-500",
    };

    return (
        <div className="w-full max-w-lg">
            {/* Barre du statut */}
            <button
                className={`w-full flex items-center justify-between px-4 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${currentStatus.color}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentStatus.label}
                {isOpen ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
            </button>

            {/* Bloc animé avec framer-motion pour une animation ULTRA fluide */}
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden bg-gray-100 shadow-md rounded-b-lg border border-t-0 border-gray-300 text-gray-600"
            >
                <p className="text-sm p-3">{currentStatus.description}</p>
            </motion.div>
        </div>
    );
}
