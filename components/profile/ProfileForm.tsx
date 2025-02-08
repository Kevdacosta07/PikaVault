"use client";

import {useState} from "react";
import "./ProfileForm.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {editUser} from "@/actions/ProfileActions";

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


export default function ProfileForm({ user }: { user: User }) {


    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name || "",
        password: user.password || "",
    });

    const [inputPasswordType, setInputPasswordType] = useState("password");
    const [dotIcon, setDotIcon] = useState(faEye);
    const [isUpdated, setIsUpdated] = useState(false);
    const [btnText, setBtnText] = useState("Mettre à jour vos informations");

    const handlePasswordVisibility = (e: React.MouseEvent<HTMLDivElement>) => {

        e.preventDefault();

        if (inputPasswordType === "password")
        {
            setInputPasswordType("text")
            setDotIcon(faEyeSlash)
            return;
        }

        setInputPasswordType("password");
        setDotIcon(faEye)
        return;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault(); // Empêche la page de se recharger
        setBtnText("Mise à jour...");

        try {
            await editUser(formData);
            setBtnText("✅ Informations mises à jour !");
            setIsUpdated(true);

            setTimeout(function () {
                setBtnText("Mettre à jour vos informations");
                setIsUpdated(false);
            }, 2000);

        } catch (err) {
            setBtnText(`❌ Une erreur est survenue : ${err}`);

            setTimeout(() => setBtnText("Mettre à jour l'adresse de livraison"), 3000);
        }
    }


    return (
        <div>
            <h1 className="text-4xl font-bold mb-3">Vos informations personnelles</h1>
            <p className="text-xl text-blue-600">Vous pouvez mettre à jour vos informations personnelles</p>

            <form className={"mt-8 flex flex-col"} onSubmit={handleSubmit}>
                <div className="flex m-2 justify-between items-center">
                    <label htmlFor="email" className="text-xl font-medium">Email{" "}</label>
                    <input
                        className="border text-xl rounded shadow-md ml-5 border-gray-300 p-2 bg-gray-300 outline-0"
                        disabled={true}
                        type="text"
                        name="adress"
                        placeholder="Adresse de résidence"
                        defaultValue={user.email ?? ""}
                    />
                </div>

                <div className="flex m-2 justify-between items-center">
                    <label htmlFor="email" className="text-xl font-medium">Points de fidelité</label>
                    <input
                        className="border text-xl rounded shadow-md ml-5 border-gray-300 p-2 bg-gray-300 outline-0"
                        disabled={true}
                        type="text"
                        name="adress"
                        placeholder="Adresse de résidence"
                        defaultValue={user.points}
                    />
                </div>

                <div className="flex m-2 justify-between items-center">
                    <label htmlFor="name" className="text-xl font-medium">Nom d&#39;utilisateur{" "}</label>
                    <input
                        className="border text-xl rounded shadow-md ml-5 border-gray-300 p-2"
                        type="text"
                        name="name"
                        placeholder="Adresse de résidence"
                        onChange={handleChange}
                        disabled={isUpdated}
                        defaultValue={user.name ?? ""}
                    />
                </div>

                <div className="passwordField flex m-2 justify-between items-center">
                    <label htmlFor="password" className="text-xl font-medium">Mot de passe{" "}</label>
                    <input
                        className="border text-xl rounded shadow-md ml-5 border-gray-300 p-2"
                        type={inputPasswordType}
                        name="password"
                        placeholder="Mot de passe"
                        disabled={isUpdated}
                        onChange={handleChange}>
                    </input>
                    <div className="inactive-dot" onClick={handlePasswordVisibility}>
                        <FontAwesomeIcon className={"eye"} icon={dotIcon}/>
                    </div>
                </div>

                <div className="flex w-full justify-center items-center mt-8">
                    <button
                        type="submit"
                        className={"bg-blue-500 font-medium text-white rounded-full shadow-gray-400 shadow-md py-2 px-6 text-xl"}
                    >
                        {btnText}
                    </button>
                </div>
            </form>
        </div>
    )
}