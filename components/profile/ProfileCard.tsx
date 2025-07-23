"use client";

import { useState } from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import CompleteProfileForm from "@/components/profile/CompleteProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faMapMarkerAlt,
    faShield,
    faStar,
    faCheckCircle,
    faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type User = {
    id: string;
    name: string | null;
    email: string | null;
    password: string | null;
    image: string | null;
    points: number;
    admin: number;
    emailVerified: Date | null;
};

type Profile = {
    id: string;
    name: string;
    adress: string;
    country: string;
    user_id: string;
    cp: number;
    city: string;
} | null;

export default function ProfileCard({ user, profile, id }: { user: User, profile: Profile | null, id: string }) {
    const [activeTab, setActiveTab] = useState<"infos" | "facturation">("infos");

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header avec dégradé et motif */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
                {/* Motif géométrique en arrière-plan */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.1)_0%,_transparent_60%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.08)_0%,_transparent_60%)]"></div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="text-center space-y-6">
                        {/* Avatar et info utilisateur */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt="Photo de profil"
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faUserCircle} className="text-white/80 text-6xl sm:text-7xl" />
                                    )}
                                </div>
                                {user.emailVerified && (
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-white text-sm" />
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                                    Profil de {user.name}
                                </h1>
                                <p className="text-blue-100 text-lg sm:text-xl">
                                    Gérez vos informations personnelles et de livraison
                                </p>
                            </div>

                            {/* Stats utilisateur */}
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 border border-white/20">
                                    <div className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold text-white">{user.points}</div>
                                        <div className="text-blue-100 text-sm">Points PikaVault</div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 border border-white/20">
                                    <div className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold text-white">
                                            {user.admin === 1 ? "Admin" : "Membre"}
                                        </div>
                                        <div className="text-blue-100 text-sm">Statut</div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 border border-white/20">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-yellow-300 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
                                            ))}
                                        </div>
                                        <div className="text-blue-100 text-sm">Vendeur vérifié</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corps principal */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Navigation des onglets */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab("infos")}
                                className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 relative ${
                                    activeTab === "infos"
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                }`}
                            >
                                <FontAwesomeIcon icon={faUser} className="mr-3" />
                                <span className="hidden sm:inline">Informations personnelles</span>
                                <span className="sm:hidden">Profil</span>
                                {activeTab === "infos" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab("facturation")}
                                className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 relative ${
                                    activeTab === "facturation"
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                }`}
                            >
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
                                <span className="hidden sm:inline">Adresse de livraison</span>
                                <span className="sm:hidden">Adresse</span>
                                {activeTab === "facturation" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                                )}
                            </button>
                        </nav>
                    </div>

                    {/* Contenu des onglets */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        {activeTab === "infos" ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Informations personnelles</h2>
                                        <p className="text-gray-600">Modifiez vos informations de compte</p>
                                    </div>
                                </div>
                                <ProfileForm user={user} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Adresse de livraison</h2>
                                        <p className="text-gray-600">
                                            {profile ? "Modifiez votre adresse de livraison" : "Ajoutez une adresse de livraison"}
                                        </p>
                                    </div>
                                </div>

                                {profile ? (
                                    <UpdateProfileForm userProfile={profile} />
                                ) : (
                                    <CompleteProfileForm id={id} />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Section de sécurité */}
                <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faShield} className="text-white text-xl" />
                            <h3 className="text-xl font-bold text-white">Sécurité du compte</h3>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="font-semibold text-gray-900">E-mail vérifié</div>
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    user.emailVerified
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {user.emailVerified ? "Vérifié" : "En attente"}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="font-semibold text-gray-900">Authentification</div>
                                    <div className="text-sm text-gray-600">Connexion sécurisée</div>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    Active
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Espacement en bas */}
                <div className="h-16"></div>
            </div>
        </div>
    );
}