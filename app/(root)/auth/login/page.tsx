import {auth, signIn} from "@/lib/auth";
import {redirect} from "next/navigation";
import CredentialsLoginForm from "@/components/Auth/CredentialsLoginForm";
import Image from "next/image";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default async function LoginPage() {

    const session = await auth();

    if (session) {redirect(`/profile/${session.user?.id}`)}

    return (
        <div className={"min-h-screen max-h-screen min-w-screen flex justify-center bg-gradient-to-b from-gray-100 to-gray-300  items-center"}>

            {/* IMAGE */}
            <div className={"w-[100%] lg:w-[50%] md:w-[70%] h-full"}>
                <div className="title flex flex-col justify-center items-center">
                    <Image src={"/assets/img/minipika.png"} alt={"Pikachu de dos"} className={"xl:h-[150px] w-auto"} height={120} width={120} />
                    <h1 className="text-4xl md:text-5xl xl:text-6xl mb-2 font-permanentmarker">Connexion</h1>
                    <p className={"text-gray-600 text-sm md:w-[100%] w-[80%] xl:text-xl text-center font-medium"}>Utilisez la méthode de connexion la plus adaptée</p>

                    {/* Formulaire de connexion OAuth (Google) */}
                    <form action={async () => {
                        "use server"
                        await signIn("google")
                    }} className=" font-bold rounded-3xl">

                        <button type="submit" className="w-full text mb-5 md:mb-0 mt-3 py-2 px-4 font-medium text-gray-100 flex items-center rounded-md shadow-lg bg-gray-800 border border-gray-300 hover:scale-105 transition-all duration-300 hover:bg-gray-900">
                            <Image src={"/assets/img/googleicon.webp"} className={"mr-2"} alt={"Logo google"} height={30} width={30} /> Connexion avec Google
                        </button>
                    </form>

                    <div className={"w-[60%] my-6 h-[2px] md:block hidden bg-gray-300"}>

                    </div>

                    {/* Formulaire de connexion (avec données manuelles) */}
                    <CredentialsLoginForm/>
                </div>
            </div>

            {/* IMAGE */}
            <div className="relative w-[0%] hidden md:flex md:w-[70%] lg:w-[50%] justify-center items-center h-screen">
                <Image
                    src="/assets/img/loginbg.jpg"
                    alt="Pikachu"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={1920}
                    height={1080}
                    unoptimized
                />

                <div className="w-full flex justify-center">
                    <p className="z-50 font-permanentmarker text-2xl bg-gradient-to-r md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
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
