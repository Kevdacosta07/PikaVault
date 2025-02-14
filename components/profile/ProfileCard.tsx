"use client";

import { useState } from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import CompleteProfileForm from "@/components/profile/CompleteProfileForm";

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
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
            {/* Vidéo de fond */}
            <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
                <source src="/assets/videos/profileBackground2.mp4" type="video/mp4"/>
                Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Overlay semi-transparent */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>

            <div className={"relative z-10 flex flex-col items-center my-5 justify-center"}>
                <h1 className={"flex text-white font-semibold text-5xl items-center"}>Profile utilisateur de <span className={"ml-2 font-medium shadow-md shadow-gray-700 rounded bg-yellow-200 text-orange-800 px-3 py-1"}>{user.name}</span></h1>
                <p className={"text-xl font-medium text-gray-300 px-2 mt-1"}>Veillez à ce que vos informations soient correctes !</p>
            </div>

            {/* Contenu principal */}
            <div
                className="relative z-10 flex flex-col items-center text-center w-[500px] bg-white bg-opacity-0 p-6 rounded-lg">

                {/* Boutons de navigation */}
                <div className="flex space-x-4 mb-10">
                    <button
                        onClick={() => setActiveTab("infos")}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            activeTab === "infos" ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"
                        }`}
                    >
                        Informations personnelles
                    </button>

                    <button
                        onClick={() => setActiveTab("facturation")}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            activeTab === "facturation" ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"
                        }`}
                    >
                        Adresse de livraison
                    </button>
                </div>

                {/* Contenu dynamique */}
                {activeTab === "infos" ? (
                    <ProfileForm user={user}/>
                ) : (
                    profile ? (
                        <UpdateProfileForm userProfile={profile}/>
                    ) : (
                        <CompleteProfileForm id={id}/>
                    )
                )}
            </div>
        </div>
    );
}
