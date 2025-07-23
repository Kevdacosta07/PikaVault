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
        <div className="min-h-screen flex flex-col lg:flex-row">

            {/* Section principale - Formulaire */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="w-full max-w-md">

                    {/* Conteneur avec scroll pour mobile si nécessaire */}
                    <div className="space-y-6 sm:space-y-8">

                        {/* Header avec logo */}
                        <div className="text-center">
                            <div className="mb-4 sm:mb-6">
                                <Image
                                    src="/assets/img/minipika.png"
                                    alt="PikaVault Logo"
                                    className="mx-auto"
                                    height={70}
                                    width={70}
                                    priority
                                />
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Rejoignez PikaVault !
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                Créez votre compte et commencez l&#39;aventure
                            </p>
                        </div>

                        {/* Bouton Google */}
                        <div>
                            <form action={async () => {
                                "use server"
                                await signIn("google")
                            }}>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold text-sm sm:text-base shadow-sm hover:shadow-md"
                                >
                                    <Image
                                        src="/assets/img/googleicon.webp"
                                        alt="Google"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="hidden sm:inline">Créer un compte avec Google</span>
                                    <span className="sm:hidden">Google</span>
                                </button>
                            </form>
                        </div>

                        {/* Séparateur */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm sm:text-base">
                                <span className="px-3 sm:px-4 bg-gray-50 text-gray-500 font-medium">ou</span>
                            </div>
                        </div>

                        {/* Formulaire d'inscription */}
                        <div>
                            <CredentialsRegisterForm />
                        </div>

                        {/* Lien de connexion */}
                        <div className="text-center">
                            <p className="text-gray-600 text-sm sm:text-base">
                                Déjà un compte ?{" "}
                                <Link
                                    href="/auth/login"
                                    className="text-yellow-600 hover:text-yellow-700 font-semibold underline decoration-2 underline-offset-2"
                                >
                                    Connectez-vous
                                </Link>
                            </p>
                        </div>

                        {/* Footer légal - Caché sur très petits écrans */}
                        <div className="pt-4 sm:pt-6 border-t border-gray-200 hidden sm:block">
                            <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
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
            </div>

            {/* Section image - Masquée sur mobile, visible sur desktop */}
            <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600">
                {/* Image de fond */}
                <Image
                    src="/assets/img/loginbg.jpg"
                    alt="Pikachu"
                    fill
                    className="object-cover opacity-20"
                    priority
                />

                {/* Contenu superposé */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
                    <div className="mb-8">
                        <h2 className="font-permanentmarker text-4xl xl:text-6xl 2xl:text-7xl text-white drop-shadow-2xl">
                            PikaVault
                        </h2>
                        <p className="text-white/90 text-lg xl:text-xl mt-4 font-medium">
                            Rejoignez notre communauté de collectionneurs
                        </p>
                    </div>

                    {/* Indicateur visuel */}
                    <div className="absolute bottom-12 left-12">
                        <div className="flex items-center gap-2 text-white/80">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-xl animate-pulse" />
                            <span className="text-sm font-medium">Inscrivez-vous ici</span>
                        </div>
                    </div>
                </div>

                {/* Effets décoratifs */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse [animation-delay:1s]"></div>
            </div>

            {/* Version mobile de l'image - Petite bande en haut */}
            <div className="lg:hidden h-20 sm:h-24 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 relative overflow-hidden">
                <Image
                    src="/assets/img/loginbg.jpg"
                    alt="Pikachu"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="font-permanentmarker text-xl sm:text-2xl text-white drop-shadow-lg">
                        PikaVault
                    </h2>
                </div>
            </div>
        </div>
    );
}