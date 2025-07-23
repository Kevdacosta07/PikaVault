
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faSpinner,
    faCheckCircle,
    faTimesCircle,
    faTruck,
    faCreditCard,
    faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

export default function StatusBadge({ status }: { status: string }) {
    const [isOpen, setIsOpen] = useState(false);

    // Définition des statuts avec leur description, couleur et icône
    const statusData: Record<string, {
        label: string;
        description: string;
        bgColor: string;
        textColor: string;
        borderColor: string;
        icon: any;
        dotColor: string;
    }> = {
        "En examen...": {
            label: "En examen...",
            description: "Vous êtes placé sur la liste d'attente. Un de nos experts va examiner votre offre sous 24h.",
            bgColor: "bg-gradient-to-r from-yellow-50 to-amber-50",
            textColor: "text-amber-800",
            borderColor: "border-amber-200",
            icon: faSpinner,
            dotColor: "bg-amber-500"
        },
        "Refusée": {
            label: "Refusée",
            description: "Votre offre a été refusée. Le prix était peut-être trop élevé ou les articles trop endommagés.",
            bgColor: "bg-gradient-to-r from-red-50 to-rose-50",
            textColor: "text-red-800",
            borderColor: "border-red-200",
            icon: faTimesCircle,
            dotColor: "bg-red-500"
        },
        "Expédition en attente...": {
            label: "Expédition en attente...",
            description: "Votre offre a été validée par nos experts. Vous pouvez désormais procéder à l'expédition de vos articles.",
            bgColor: "bg-gradient-to-r from-orange-50 to-amber-50",
            textColor: "text-orange-800",
            borderColor: "border-orange-200",
            icon: faTruck,
            dotColor: "bg-orange-500"
        },
        "Paiement en attente...": {
            label: "Paiement en attente...",
            description: "Vos articles sont en route vers nos locaux. Ils vont être analysés par nos experts pour vérifier l'authenticité et l'état. Votre offre peut encore être modifiée en cas de dommages supplémentaires non indiqués ou de contrefaçon.",
            bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
            textColor: "text-blue-800",
            borderColor: "border-blue-200",
            icon: faCreditCard,
            dotColor: "bg-blue-500"
        },
        "Payée": {
            label: "Payée",
            description: "Félicitations ! Vous avez reçu le paiement, l'offre est conclue avec succès.",
            bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
            textColor: "text-green-800",
            borderColor: "border-green-200",
            icon: faCheckCircle,
            dotColor: "bg-green-500"
        },
    };

    const currentStatus = statusData[status] || {
        label: "Statut inconnu",
        description: "Le statut fourni n'est pas reconnu.",
        bgColor: "bg-gradient-to-r from-gray-50 to-slate-50",
        textColor: "text-gray-800",
        borderColor: "border-gray-200",
        icon: faExclamationTriangle,
        dotColor: "bg-gray-500"
    };

    return (
        <div className="w-full max-w-md">
            {/* Badge principal */}
            <button
                className={`
                    w-full flex items-center justify-between p-4 rounded-xl 
                    ${currentStatus.bgColor} ${currentStatus.textColor} ${currentStatus.borderColor}
                    border-2 shadow-lg hover:shadow-xl transition-all duration-300 
                    hover:scale-[1.02] group relative overflow-hidden
                `}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Animation de fond au hover */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex items-center space-x-3 relative z-10">
                    {/* Dot animé */}
                    <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${currentStatus.dotColor}`}></div>
                        {status === "En examen..." && (
                            <div className={`absolute inset-0 w-3 h-3 rounded-full ${currentStatus.dotColor} animate-ping opacity-75`}></div>
                        )}
                    </div>

                    {/* Icône */}
                    <FontAwesomeIcon
                        icon={currentStatus.icon}
                        className={`text-lg ${status === "En examen..." ? "animate-spin" : ""}`}
                    />

                    {/* Label */}
                    <span className="font-bold text-base">
                        {currentStatus.label}
                    </span>
                </div>

                {/* Chevron */}
                <FontAwesomeIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                    className="text-lg group-hover:scale-110 transition-transform duration-200 relative z-10"
                />
            </button>

            {/* Panneau d'information étendu */}
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className={`
                    mt-2 p-6 rounded-xl border-2 ${currentStatus.borderColor}
                    ${currentStatus.bgColor} backdrop-blur-sm
                    shadow-lg
                `}>
                    {/* En-tête avec icône */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className={`
                            w-8 h-8 rounded-lg ${currentStatus.dotColor.replace('bg-', 'bg-opacity-20 bg-')}
                            flex items-center justify-center
                        `}>
                            <FontAwesomeIcon
                                icon={currentStatus.icon}
                                className={`text-sm ${currentStatus.textColor}`}
                            />
                        </div>
                        <h4 className={`font-bold text-lg ${currentStatus.textColor}`}>
                            Détails du statut
                        </h4>
                    </div>

                    {/* Description */}
                    <p className={`${currentStatus.textColor} leading-relaxed text-sm mb-4`}>
                        {currentStatus.description}
                    </p>

                    {/* Barre de progression ou information supplémentaire */}
                    {status !== "Refusée" && status !== "Payée" && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className={`text-xs font-medium ${currentStatus.textColor}`}>
                                    Progression
                                </span>
                                <span className={`text-xs ${currentStatus.textColor}`}>
                                    {getProgressPercentage(status)}%
                                </span>
                            </div>
                            <div className="w-full bg-white/30 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${currentStatus.dotColor} transition-all duration-500`}
                                    style={{ width: `${getProgressPercentage(status)}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Badge de statut spécial pour "Payée" */}
                    {status === "Payée" && (
                        <div className="mt-4 p-3 bg-white/40 rounded-lg border border-green-300">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                                <span className="font-semibold text-green-800 text-sm">
                                    Transaction terminée avec succès !
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// Fonction helper pour calculer le pourcentage de progression
function getProgressPercentage(status: string): number {
    switch (status) {
        case "En examen...": return 25;
        case "Expédition en attente...": return 50;
        case "Paiement en attente...": return 75;
        case "Payée": return 100;
        default: return 0;
    }
}