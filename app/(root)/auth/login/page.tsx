
import {auth, signIn} from "@/lib/auth";
import {redirect} from "next/navigation";
import CredentialsLoginForm from "@/components/Auth/CredentialsLoginForm";
import Image from "next/image";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function LoginPage() {

    const session = await auth();

    if (session) {redirect(`/profile/${session.user?.id}`)}

    return (
        <div className={"min-h-screen max-h-screen min-w-screen flex justify-center bg-gradient-to-b from-gray-100 to-gray-300 items-center"}>

            {/* Section de gauche - Formulaire modernisé */}
            <div className={"w-[100%] lg:w-[50%] md:w-[70%] h-full flex items-center justify-center"}>
                <div className="max-w-md w-full mx-auto px-6">
                    {/* Header professionnel */}
                    <div className="text-center mb-8">
                        {/* Logo centré */}
                        <div className="mb-6">
                            <Image
                                src={"/assets/img/minipika.png"}
                                alt={"PikaVault Logo"}
                                className={"mx-auto"}
                                height={100}
                                width={100}
                            />
                        </div>

                        {/* Titre et sous-titre */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                            Bon retour !
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Connectez-vous à votre compte PikaVault
                        </p>
                    </div>

                    {/* Bouton Google modernisé */}
                    <div className="mb-6">
                        <form action={async () => {
                            "use server"
                            await signIn("google")
                        }}>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold text-lg shadow-sm hover:shadow-md"
                            >
                                <Image
                                    src={"/assets/img/googleicon.webp"}
                                    alt={"Google"}
                                    width={24}
                                    height={24}
                                />
                                Continuer avec Google
                            </button>
                        </form>
                    </div>

                    {/* Séparateur élégant */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-lg">
                            <span className="px-4 bg-gray-100 text-gray-500 font-medium">ou</span>
                        </div>
                    </div>

                    {/* Formulaire de connexion */}
                    <CredentialsLoginForm />

                    {/* Lien d'inscription */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-lg">
                            Pas encore de compte ?{" "}
                            <Link
                                href="/auth/register"
                                className="text-yellow-600 hover:text-yellow-700 font-semibold underline decoration-2 underline-offset-2"
                            >
                                Créez votre compte
                            </Link>
                        </p>
                    </div>

                    {/* Footer légal */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center leading-relaxed">
                            En vous connectant, vous acceptez nos{" "}
                            <Link href="/terms" className="text-gray-700 hover:text-gray-900 underline">
                                Conditions d&apos;utilisation
                            </Link>{" "}
                            et notre{" "}
                            <Link href="/privacy" className="text-gray-700 hover:text-gray-900 underline">
                                Politique de confidentialité
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Section de droite - Image (inchangée) */}
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