"use client";

import { Key } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faEuroSign,
    faUser,
    faCalendarAlt,
    faTag,
    faShieldAlt,
    faCheckCircle,
    faImages,
    faExternalLinkAlt,
    faTruck,
    faEnvelope,
    faStar, IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

type Offer = {
    id: string;
    title: string;
    description: string;
    price: number;
    user_id: string;
    tracknumber: string | null;
    image: Array<string>;
    status: string;
    created_at: Date;
}

export default function CheckOffer({ offer, author }: { offer: Offer; author: string }) {
    const handleClickImage = (e: React.MouseEvent<HTMLImageElement>, url: string) => {
        e.preventDefault();
        window.open(url, "_blank");
    };

    // 🏷 Badges de statut colorés mais professionnels
    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, {
            bg: string;
            text: string;
            textColor: string;
            icon: IconDefinition;
            pulse: boolean
        }> = {
            deny: {
                bg: "bg-gradient-to-r from-red-50 to-rose-50 border-red-200",
                text: "Refusée",
                textColor: "text-red-700",
                icon: faBoxOpen,
                pulse: false
            },
            waiting: {
                bg: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
                text: "En attente",
                textColor: "text-amber-700",
                icon: faTag,
                pulse: true
            },
            expedition: {
                bg: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
                text: "En expédition",
                textColor: "text-blue-700",
                icon: faTruck,
                pulse: false
            },
            sended: {
                bg: "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200",
                text: "Paiement en attente",
                textColor: "text-purple-700",
                icon: faEuroSign,
                pulse: false
            },
            paid: {
                bg: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
                text: "Terminé",
                textColor: "text-green-700",
                icon: faCheckCircle,
                pulse: false
            },
        };

        const config = statusConfig[status] || {
            bg: "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200",
            text: "Statut inconnu",
            textColor: "text-gray-700",
            icon: faTag,
            pulse: false
        };

        return (
            <div className={clsx(
                "inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold border-2 shadow-lg",
                config.bg,
                config.textColor,
                config.pulse && "animate-pulse"
            )}>
                <FontAwesomeIcon icon={config.icon} className="text-lg" />
                {config.text}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* En-tête avec design moderne coloré */}
            <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-indigo-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                                <FontAwesomeIcon icon={faBoxOpen} className="text-white text-2xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    {offer.title}
                                </h1>
                                <div className="flex items-center text-gray-600">
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-2 text-blue-500" />
                                    <span className="font-semibold">{author || "Utilisateur"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            {getStatusBadge(offer.status)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                    {/* Contenu principal - 3 colonnes */}
                    <div className="xl:col-span-3 space-y-8">

                        {/* Métriques importantes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Prix avec design vibrant */}
                            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-50"></div>

                                <div className="relative flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FontAwesomeIcon icon={faEuroSign} className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Prix proposé</p>
                                        <p className="text-4xl font-black text-green-700">{offer.price} CHF</p>
                                    </div>
                                </div>
                            </div>

                            {/* Date avec design vibrant */}
                            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50"></div>

                                <div className="relative flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Créé le</p>
                                        <p className="text-2xl font-bold text-blue-700">
                                            {new Date(offer.created_at).toLocaleDateString("fr-FR", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-100">
                            <div className="border-l-4 border-gradient-to-b from-amber-400 to-orange-500 pl-6 mb-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <FontAwesomeIcon icon={faTag} className="text-white text-lg" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Description de l&#39;offre</h2>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-100">
                                <p className="text-gray-700 leading-relaxed text-lg font-medium">{offer.description}</p>
                            </div>
                        </div>

                        {/* Galerie d'images */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
                            <div className="border-l-4 border-gradient-to-b from-purple-400 to-violet-500 pl-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <FontAwesomeIcon icon={faImages} className="text-white text-lg" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Galerie des cartes</h2>
                                    </div>
                                    <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                                        <FontAwesomeIcon icon={faStar} className="text-purple-500 text-sm" />
                                        <span className="text-purple-700 font-semibold text-sm">
                                            {offer.image.length} image{offer.image.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {offer.image.map((url: string | undefined, index: Key | null | undefined) => (
                                    <div
                                        key={index}
                                        className="group relative aspect-square bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300"
                                        onClick={(e) => handleClickImage(e as React.MouseEvent<HTMLImageElement>, url ?? "")}
                                    >
                                        <Image
                                            src={url || "/placeholder.png"}
                                            alt={`Image ${index}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            unoptimized
                                        />

                                        {/* Overlay d'interaction */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-white rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-purple-600 text-lg" />
                                            </div>
                                        </div>

                                        {/* Badge numéro */}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <span className="text-purple-700 font-bold text-sm">#{Number(index) + 1}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                                <p className="text-purple-700 text-sm font-medium flex items-center gap-2">
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-purple-500" />
                                    Cliquez sur une image pour l&#39;agrandir
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 1 colonne */}
                    <div className="space-y-6">

                        {/* Résumé de l'offre */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Résumé de l&#39;offre</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Prix :</span>
                                    <span className="text-2xl font-bold text-green-600">{offer.price} CHF</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Vendeur :</span>
                                    <span className="font-semibold text-gray-900">{author}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Statut :</span>
                                    <div className="text-right">
                                        {getStatusBadge(offer.status)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact vendeur */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Contact vendeur</h3>
                                <p className="text-gray-600 text-sm mb-4">Besoin d&#39;informations supplémentaires ?</p>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                    Envoyer un message
                                </button>
                            </div>
                        </div>

                        {/* Suivi colis */}
                        {offer.tracknumber && (
                            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTruck} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Suivi de livraison</h3>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-orange-200">
                                    <p className="text-sm text-gray-600 mb-2 font-medium">Numéro de suivi :</p>
                                    <p className="font-mono text-orange-700 font-bold bg-orange-50 p-2 rounded border">
                                        {offer.tracknumber}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Garanties */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-green-600" />
                                Garanties PikaVault
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-100">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-lg" />
                                    <span className="text-gray-700 font-medium text-sm">Transaction sécurisée</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-100">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-500 text-lg" />
                                    <span className="text-gray-700 font-medium text-sm">Cartes authentifiées</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-100">
                                    <FontAwesomeIcon icon={faStar} className="text-green-500 text-lg" />
                                    <span className="text-gray-700 font-medium text-sm">Support premium</span>
                                </div>
                            </div>
                        </div>

                        {/* ID de l'offre */}
                        <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">ID de l&#39;offre</p>
                            <p className="font-mono text-sm text-gray-700 bg-white p-2 rounded border">{offer.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}