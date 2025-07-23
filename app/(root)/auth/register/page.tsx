
import {auth, signIn} from "@/lib/auth";
import {redirect} from "next/navigation";
import CredentialsRegisterForm from "@/components/Auth/CredentialsRegisterForm";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";

export default async function registerPage() {

    // On vérifie si l'utilisateur à une session active
    const session = await auth();
    if (session) {redirect("/boutique")}

    return (
        <div className="bg-gradient-to-b w-screen h-screen flex from-gray-100 to-gray-300 overflow-hidden">

            {/* Section de gauche - Formulaire agrandi */}
            <div className="w-full sm:w-[50%] h-full flex items-center justify-center overflow-y-auto">
                <div className="max-w-md w-full mx-auto px-5 py-6">
                    {/* Header légèrement plus grand */}
                    <div className="text-center mb-5">
                        {/* Logo légèrement plus grand */}
                        <div className="mb-4">
                            <Image
                                src={"/assets/img/minipika.png"}
                                alt={"PikaVault Logo"}
                                className={"mx-auto"}
                                height={80}
                                width={80}
                            />
                        </div>

                        {/* Titre plus grand */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                            Rejoignez PikaVault !
                        </h1>
                        <p className="text-gray-600 text-base lg:text-lg">
                            Créez votre compte et commencez l&#39;aventure
                        </p>
                    </div>

                    {/* Bouton Google plus grand */}
                    <div className="mb-5">
                        <form action={async () => {
                            "use server"
                            await signIn("google")
                        }}>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold text-base shadow-sm hover:shadow-md"
                            >
                                <Image
                                    src={"/assets/img/googleicon.webp"}
                                    alt={"Google"}
                                    width={22}
                                    height={22}
                                />
                                Créer un compte avec Google
                            </button>
                        </form>
                    </div>

                    {/* Séparateur plus grand */}
                    <div className="relative mb-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-base">
                            <span className="px-4 bg-gray-100 text-gray-500 font-medium">ou</span>
                        </div>
                    </div>

                    {/* Formulaire d'inscription agrandi */}
                    <CredentialsRegisterForm />

                    {/* Lien de connexion plus grand */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-base">
                            Déjà un compte ?{" "}
                            <Link
                                href="/auth/login"
                                className="text-yellow-600 hover:text-yellow-700 font-semibold underline decoration-2 underline-offset-2"
                            >
                                Connectez-vous
                            </Link>
                        </p>
                    </div>

                    {/* Footer légal plus grand */}
                    <div className="mt-6 pt-5 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center leading-relaxed">
                            En créant un compte, vous acceptez nos{" "}
                            <Link href="/terms" className="text-gray-700 hover:text-gray-900 underline">
                                Conditions d&#39;utilisation
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
            <div className="relative hidden sm:w-[50%] sm:flex justify-center items-center h-screen">
                <Image
                    src="/assets/img/loginbg.jpg"
                    alt="Pikachu"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={1920}
                    height={1080}
                    unoptimized
                />

                <div className="w-full flex justify-center">
                    <p className="z-50 font-permanentmarker sm:text-5xl md:text-6xl xl:text-8xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
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