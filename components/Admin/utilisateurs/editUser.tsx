"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faSave, faUserShield, faUserTie, faKey, faStar } from "@fortawesome/free-solid-svg-icons";

// 🛠 Définition du type utilisateur
interface User {
    id: string;
    name: string;
    email: string;
    points: number;
    admin: number;
    password?: string;
}

export default function EditUserComp({ id }: { id: string }) {

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(`/api/request/users/${id}`, { method: "GET" });
                if (!res.ok) throw new Error("Utilisateur introuvable");
                const data: User = await res.json();
                setUser(data);
            } catch (err) {
                setError("Erreur lors du chargement des données.");
                console.error(err);
            }
        }
        fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;
        setUser((prev) => prev ? { ...prev, [e.target.name]: e.target.value } : null);
    };

    const updateUser = async () => {
        setLoading(true);
        try {
            if (!user) return;

            const updatedData: Partial<User> = { ...user };

            if (newPassword.trim()) {
                updatedData.password = newPassword; // ✅ Pas de `any`, car `password` est défini dans `User`
            }

            const res = await fetch(`/api/request/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error("Erreur de mise à jour");

            router.push("/admin/utilisateurs");
        } catch (err) {
            setError("Erreur lors de la mise à jour.");
            console.error(err);
        }
        setLoading(false);
    };

    const updateAdminStatus = (isAdmin: number) => {
        if (!user) return;
        setUser((prev) => prev ? { ...prev, admin: isAdmin } : null);
    };

    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!user) return <p className="text-gray-600 text-center">Chargement de l&#39;utilisateur...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Modifier l&#39;Utilisateur</h2>

                {/* Nom */}
                <div className="mb-4">
                    <label className="text-gray-600 text-sm font-medium flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                        Nom
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg mt-1"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="text-gray-600 text-sm font-medium flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg mt-1"
                    />
                </div>

                {/* Points de fidélité */}
                <div className="mb-4">
                    <label className="text-gray-600 text-sm font-medium flex items-center">
                        <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
                        Points de fidélité
                    </label>
                    <input
                        type="number"
                        name="points"
                        value={user.points}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg mt-1"
                    />
                </div>

                {/* Mot de passe */}
                <div className="mb-6">
                    <label className="text-gray-600 text-sm font-medium flex items-center">
                        <FontAwesomeIcon icon={faKey} className="mr-2 text-gray-500" />
                        Nouveau mot de passe (laisser vide pour ne pas modifier)
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg mt-1"
                    />
                </div>

                {/* Rôle (Admin ou Utilisateur) */}
                <div className="mb-6">
                    <p className="text-gray-600 text-sm font-medium mb-2">Statut de l&#39;utilisateur</p>
                    <div className="flex gap-4">
                        <button
                            className={`flex-1 py-3 font-semibold rounded-lg flex items-center justify-center gap-2 transition ${
                                user.admin === 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => updateAdminStatus(1)}
                        >
                            <FontAwesomeIcon icon={faUserShield} />
                            Admin
                        </button>

                        <button
                            className={`flex-1 py-3 font-semibold rounded-lg flex items-center justify-center gap-2 transition ${
                                user.admin === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => updateAdminStatus(0)}
                        >
                            <FontAwesomeIcon icon={faUserTie} />
                            Client
                        </button>
                    </div>
                </div>

                {/* Bouton de mise à jour */}
                <button
                    onClick={updateUser}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={faSave} />
                    {loading ? "Mise à jour..." : "Mettre à jour"}
                </button>
            </div>
        </div>
    );
}
