
import ContactForm from "@/components/Contact/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faClock, faBolt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Effets de fond Pikachu */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Formes géométriques jaunes */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-60 right-20 w-24 h-24 bg-orange-200/30 rounded-full blur-xl animate-pulse [animation-delay:1s]"></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl animate-pulse [animation-delay:2s]"></div>

                {/* Motifs décoratifs */}
                <div className="absolute top-1/3 right-10 text-6xl text-yellow-300/20 animate-bounce [animation-delay:0.5s]">⚡</div>
                <div className="absolute bottom-1/4 left-10 text-4xl text-orange-300/20 animate-bounce [animation-delay:1.5s]">⚡</div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Section gauche - Informations */}
                    <div className="space-y-12">
                        {/* En-tête avec Pikachu */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                                        Contactez
                                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"> notre équipe</span>
                                    </h1>
                                    <p className="text-lg text-gray-600 mt-2">
                                        Une réponse vous sera donnée sous <span className="font-semibold text-yellow-600">24h</span> !
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Carte Pikachu décorative */}
                        <div className="relative max-w-md mx-auto lg:mx-0">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-yellow-200/50 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6">
                                    <Image
                                        src="/assets/img/pikachu.png"
                                        alt="Pikachu mascotte PikaVault"
                                        width={300}
                                        height={300}
                                        className="w-full h-auto hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pikachu vous aide !</h3>
                                    <p className="text-gray-600">Notre mascotte veille à ce que votre message nous parvienne rapidement ⚡</p>
                                </div>
                            </div>
                        </div>

                        {/* Informations de contact */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Nos coordonnées</h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-yellow-200/50 hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faPhone} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">+41 76 553 41 54</p>
                                        <p className="text-gray-600 text-sm">Lun-Ven 9h-18h</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-yellow-200/50 hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">contact@pikavault.ch</p>
                                        <p className="text-gray-600 text-sm">Support 24/7</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-yellow-200/50 hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Suisse</p>
                                        <p className="text-gray-600 text-sm">Livraison mondiale</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-yellow-200/50 hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBolt} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Réponse rapide</p>
                                        <p className="text-gray-600 text-sm">Comme un éclair ⚡</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section droite - Formulaire */}
                    <div className="relative">
                        {/* Décoration autour du formulaire */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl opacity-20 rotate-12"></div>
                        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-orange-300 to-red-400 rounded-2xl opacity-20 -rotate-12"></div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-200/50 relative z-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Envoyez-nous un message ⚡
                                </h2>
                                <p className="text-gray-600">
                                    Notre équipe de dresseurs vous répondra rapidement !
                                </p>
                            </div>

                            {/* Formulaire de contact */}
                            <ContactForm />
                        </div>

                        {/* Petites décorations flottantes */}
                        <div className="absolute top-1/4 -left-8 text-3xl text-yellow-400/60 animate-bounce">⚡</div>
                        <div className="absolute bottom-1/4 -right-8 text-2xl text-orange-400/60 animate-bounce [animation-delay:1s]">⚡</div>
                    </div>
                </div>

                {/* Section FAQ/Aide rapide */}
                <div className="mt-24 text-center">
                    <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 border border-yellow-200/50">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">
                            Besoin d&apos;aide rapide ? ⚡
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-white/70 rounded-2xl border border-yellow-200/30 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faPhone} className="text-white text-xl" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Urgence ?</h4>
                                <p className="text-gray-600 text-sm">Appelez-nous directement pour un support immédiat</p>
                            </div>

                            <div className="text-center p-6 bg-white/70 rounded-2xl border border-yellow-200/30 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Questions générales</h4>
                                <p className="text-gray-600 text-sm">Utilisez le formulaire ou envoyez un email</p>
                            </div>

                            <div className="text-center p-6 bg-white/70 rounded-2xl border border-yellow-200/30 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faClock} className="text-white text-xl" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Réponse garantie</h4>
                                <p className="text-gray-600 text-sm">Moins de 24h, promis par Pikachu !</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}