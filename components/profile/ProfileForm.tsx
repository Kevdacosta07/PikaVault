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
        <div className={"flex flex-col justify-center items-center pt-8 pb-10 px-10 shadow-lg bg-gray-100 rounded bg-opacity-85 w-[650px] shadow-gray-700"}>

            <div className={"flex flex-col justify-center items-center"}>
                <h1 className="text-4xl font-bold mb-1 whitespace-nowrap">Vos informations personnelles</h1>
                <p className="text-xl font-medium text-orange-600">Mettre à jour vos informations personnelles</p>
            </div>


            <form className={"mt-8 flex flex-col w-full"} onSubmit={handleSubmit}>
                <div className="flex flex-col justify-between items-start">
                    <label htmlFor="email" className="flex flex-col mb-2 justify-between items-start">Email{" "}</label>
                    <input
                        className="w-full border border-gray-500 bg-gray-400 shadow-md shadow-gray-300 rounded p-2 outline-none"
                        disabled={true}
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        defaultValue={user.email ?? ""}
                    />
                </div>

                <div className="flex flex-col my-4 justify-between items-start">
                    <label htmlFor="points" className="font-medium mb-1">Points de fidelité</label>
                    <input
                        className="w-full border border-gray-500 bg-gray-400 shadow-md shadow-gray-300 rounded p-2 outline-none"
                        disabled={true}
                        type="text"
                        name="points"
                        placeholder="Points de fidelité"
                        defaultValue={user.points}
                    />
                </div>

                <div className="flex flex-col mb-4 justify-between items-start">
                    <label htmlFor="name" className="mb-1 font-medium">Nom d&#39;utilisateur{" "}</label>
                    <input
                        className="w-full border border-gray-300 bg-gray-50 shadow-md shadow-gray-300 rounded p-2 outline-none"
                        type="text"
                        name="name"
                        placeholder="Adresse de résidence"
                        onChange={handleChange}
                        disabled={isUpdated}
                        defaultValue={user.name ?? ""}
                    />
                </div>

                <div className="passwordField flex flex-col items-start w-full">
                    <label htmlFor="password" className="mb-1 font-medium">Mot de passe{" "}</label>

                    {/* Conteneur de l'input et de l'icône */}
                    <div className="relative w-full">
                        <input
                            className="w-full border border-gray-300 bg-gray-50 shadow-md shadow-gray-300 rounded p-2 pr-10 outline-none"
                            type={inputPasswordType}
                            name="password"
                            placeholder="Mot de passe"
                            disabled={isUpdated}
                            onChange={handleChange}
                        />

                        {/* Icône affichant/cachant le mot de passe */}
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={handlePasswordVisibility}
                        >
                            <FontAwesomeIcon className="w-5 h-5" icon={dotIcon}/>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center w-full items-center mt-8">
                    <button
                        type="submit"
                        className={"bg-orange-500 transition-colors hover:bg-orange-600 duration-200 font-medium w-full text-white rounded-md shadow-gray-400 shadow-md py-3 px-6 text-xl"}
                    >
                        {btnText}
                    </button>
                </div>
            </form>
        </div>
    )
}