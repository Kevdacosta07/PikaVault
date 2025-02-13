import {auth, signIn} from "@/lib/auth";
import {redirect} from "next/navigation";
import CredentialsRegisterForm from "@/components/Auth/CredentialsRegisterForm";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default async function registerPage() {

    // On vérifie si l'utilisateur à une session active
    const session = await auth();
    if (session) {redirect("/boutique")}

    return (
        <div className={"min-h-screen max-h-screen min-w-screen flex justify-center bg-gradient-to-b from-gray-100 to-gray-300  items-center"}>

            {/* IMAGE */}
            <div className={"w-[50%] h-full"}>
                <div className="title flex flex-col justify-center items-center">
                    <Image src={"/assets/img/minipika.png"} alt={""} height={150} width={150} />
                    <h1 className="text-8xl font-permanentmarker">S&#39;enregistrer</h1>
                    <p className={"text-gray-600 font-medium mt-2"}>Utilisez la méthode de connexion la plus adaptée</p>

                    {/* Formulaire de connexion OAuth (Google) */}
                    <form action={async () => {
                        "use server"
                        await signIn("google")
                    }} className="p-3 font-bold rounded-3xl">

                        <button type="submit" className="w-full text-xl mt-3 py-3 px-5 font-medium text-gray-100 flex items-center rounded-md shadow-lg bg-gray-800 border border-gray-300 hover:scale-105 transition-all duration-300 hover:bg-gray-900">
                            <Image src={"/assets/img/googleicon.webp"} className={"mr-2"} alt={"Logo google"} height={30} width={30} /> Créer un compte avec Google
                        </button>
                    </form>

                    <div className={"my-6 h-[1px] w-[50%] bg-gray-300"}>

                    </div>

                    {/* Formulaire de connexion (avec données manuelles) */}
                    <CredentialsRegisterForm/>
                </div>
            </div>

            {/* IMAGE */}
            <div className="relative w-[50%] flex justify-center items-center h-screen">
                <Image
                    src="/assets/img/loginbg.jpg"
                    alt="Pikachu"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={1920}
                    height={1080}
                    unoptimized
                />

                <div className="w-full flex justify-center">
                    <p className="z-50 font-permanentmarker text-9xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                        PikaVault
                    </p>
                </div>

                <div>
                    <p>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </p>
                </div>

            </div>

        </div>
    );
}