"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash, faUserShield, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface User {
    name: string | null
    id: string
    image: string | null
    password: string | null
    admin: number
    points: number
    email: string | null
    emailVerified: Date | null
    created_at: Date
}

export default function ShowUsers({ initusers } : { initusers : User[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(initusers);
    const [users, setUsers] = useState(initusers || []);

    // Barre de recherche (email ou nom d'utilisateur)
    useEffect(() => {
        const query = searchQuery.toLowerCase();

        setFilteredUsers(users.filter(user =>
            (user.name ?? "").toLowerCase().includes(query) ||
            (user.email ?? "").toLowerCase().includes(query)
        ));

    }, [searchQuery, users]);

    const deleteUser = async (userId: string) => {
        try {
            const response = await fetch(`/api/request/users/${userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Erreur lors de la suppression");

            // Mettre à jour la liste des utilisateurs après suppression
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

            alert("Utilisateur supprimé avec succès !");
        } catch (error) {
            console.error("Erreur suppression :", error);
            alert("Une erreur est survenue !");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Titre */}
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">👥 Gestion des Utilisateurs</h1>

            {/* Barre de recherche */}
            <div className="max-w-xl mx-auto mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou e-mail..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-10 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
                </div>
            </div>

            {/* Liste des utilisateurs */}
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {filteredUsers.length === 0 ? (
                    <p className="text-center text-gray-600">Aucun utilisateur trouvé.</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <th className="py-3 px-4 text-left">Nom</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Rôle</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user, index : number) => (
                            <tr key={user.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                {/* Nom */}
                                <td className="py-4 px-4 text-gray-800 font-medium">{user.name}</td>

                                {/* Email */}
                                <td className="py-4 px-4 text-gray-600">{user.email}</td>

                                {/* Rôle */}
                                <td className="py-4 px-4">
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full 
                                            ${user.admin === 1 ? "bg-green-200 text-green-800" : "bg-gray-300 text-gray-700"}`}>
                                            <FontAwesomeIcon icon={user.admin === 1 ? faUserShield : faUser} className="mr-1"/>
                                            {user.admin === 1 ? "Admin" : "Client"}
                                        </span>
                                </td>

                                {/*  Actions */}
                                <td className="py-4 px-4 text-center">
                                    <div className="flex justify-center space-x-3">
                                        {/* Modifier */}
                                        <Link href={`/admin/utilisateurs/edit/${user.id}`}>
                                            <button className="px-3 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </Link>

                                        {/* Supprimer */}
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="px-3 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
