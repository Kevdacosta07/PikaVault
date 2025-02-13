import Link from "next/link";
import {auth} from "@/lib/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import StatusBadge from "@/components/Offres/StatusBadge";
import FadeInSection from "@/components/Animation/FadeInSection";

export default async function ResellPage() {

    const session = await auth();

    return (

        <div>
            {/* HERO BANNER */}
            <div className={"min-h-screen relative bg-gray-200 flex flex-col justify-center items-center"}>

                {/* Vidéo en plein écran */}
                <video
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/assets/videos/bulbizar.mp4" type="video/mp4"/>
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>

                <div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r bg-black bg-opacity-80 to-transparent"></div>

                {/* Contenu au-dessus de la vidéo */}
                <div
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white">

                    <Image src={"/assets/img/lotofpok.png"} className={"mb-5 object-center object-contain"} alt={""}
                           height={600} width={650} unoptimized={true}/>

                    <h1 className={"text-7xl font-medium mb-2 px-3 py-2"}>Vendre vos cartes</h1>
                    <p className={"mb-3 px-3 py-2 bg-gray-700 shadow-gray-800 shadow-lg mt-1 text-xl font-semibold text-gray-200"}>
                        Vendre vos doublons n&#39;a jamais été aussi simple et rapide.
                    </p>

                    <p className={"w-[700px] my-4 text-gray-300"}>
                        Revendez vos cartes Pokémon facilement et au meilleur prix sur PikaVault !
                        Que ce soit des cartes rares, des collections complètes ou des doublons, notre plateforme
                        sécurisée vous permet de conclure une vente le plus rapidement et le plus efficacement possible.
                        Profitez d&#39;une estimation juste et d&#39;un processus simple pour transformer vos cartes en
                        argent.
                    </p>

                    {session ?
                        (
                            <div className={"flex flex-row gap-4 mt-5"}>
                                <Link href={`/resell/offers/${session.user?.id}`}
                                      className={"px-3 mr-3 py-2 bg-orange-300 w-fit font-medium rounded shadow-md text-orange-900 hover:bg-orange-950-800 hover:scale-105 transition-all duration-200"}>Créer
                                    une offre <FontAwesomeIcon className={"ml-2"} icon={faArrowRight}/></Link>
                                <Link href={`#start-guide`}
                                      className={"px-3 py-2 bg-gray-600 w-fit font-medium rounded shadow-md text-gray-100 hover:bg-gray-700 hover:scale-105 transition-all duration-200"}>Comment
                                    vendre ? <FontAwesomeIcon className={"ml-2"} icon={faMoneyBill}/></Link>
                            </div>
                        )
                        :
                        (
                            <Link href={"/auth/login"} className={"px-3 py-2 bg-orange-200 rounded-2xl text-amber-800"}>Connectez-vous
                                pour faire une offre</Link>
                        )
                    }
                </div>
            </div>

                <div id={"start-guide"} className={"min-h-[50vh] py-10 flex justify-center bg-gradient-to-r from-gray-50 to-gray-100 text-white w-full"}>
                    <FadeInSection>
                        <div className={"w-[90%] flex items-center gap-4"}>
                            <div className={"w-[50%] flex flex-col"}>
                                <h2 className={"text-5xl mb-1 text-gray-900"}>
                                    Comment vendre sur PikaVault ?
                                </h2>

                                <p className={"text-gray-500 text-lg"}>
                                    Vous êtes sur le point de vendre un produit
                                </p>

                                <p className="text-gray-500 mt-8">
                                    Il est crucial de prendre connaissance de ce petit tutoriel avant de vendre sur PikaVault.
                                    Ce guide vous expliquera en détail le processus de mise en vente, les bonnes pratiques à
                                    adopter
                                    et les erreurs à éviter pour garantir une transaction fluide et sécurisée.
                                    En suivant ces conseils, vous maximiserez vos chances de vendre rapidement et au meilleur
                                    prix,
                                    tout en évitant les situations imprévues. 🚀
                                </p>

                                <Link href={"#step-1"}
                                      className={"px-3 py-3 mt-8 bg-gray-700 text-center font-medium rounded text-lg transition-all duration-400 hover:bg-gray-800"}>Passer
                                    à l&#39;étape suivante</Link>

                            </div>

                            <div className={"w-[50%] flex justify-center items-center"}>
                                <p>
                                    <Image src={"/assets/img/money.png"} alt={"Billets violets"} height={500} width={500}
                                           unoptimized={true}/>
                                </p>
                            </div>
                        </div>
                    </FadeInSection>
                </div>

            {/* Prenez vos articles en photo */}
                <div id={"step-1"} className={"min-h-[50vh] py-10 flex justify-center bg-gradient-to-r from-white to-gray-50 text-white w-full"}>
                    <FadeInSection>
                        <div className={"w-[90%] flex flex-row-reverse items-center gap-4"}>
                            <div className={"w-[50%] flex flex-col"}>
                                <p className={"text-gray-600 mb-1"}>
                                    Étape 1
                                </p>
                                <h2 className={"text-5xl mb-1 text-gray-900"}>
                                    Prenez vos articles en photo
                                </h2>

                                <p className={"text-gray-500 text-lg"}>
                                    C&#39;est long, mais ça vaut le coup !
                                </p>

                                <p className="text-gray-500 mt-3">
                                    Désormais vous êtes sur le point de créer une offre de vente, il est primordial de vous
                                    munir de photos de vos articles, si vos articles présentent des défauts,
                                    prenez également en photos les défauts présents sur vos articles.
                                </p>

                                <p className="text-gray-500 mt-4">
                                    <span className={"bg-red-300 text-black px-2 mr-1"}>Tous les articles de contrefaçon sont interdits sur PikaVault.</span> Par
                                    conséquent si vous tentez de vendre des articles de contrefaçon nous concerverons tous vos
                                    articles de contrafaçon dans nos locaux et ils seront détruits par la suite.
                                </p>

                                <Link href={"#step-2"}
                                      className={"px-3 py-3 mt-8 bg-gray-700 text-center font-medium rounded text-lg transition-all duration-400 hover:bg-gray-800"}>Passer
                                    à l&#39;étape suivante</Link>

                            </div>

                            <div className={"w-[50%] flex justify-center items-center"}>
                                <p>
                                    <Image src={"/assets/img/camera.webp"} alt={"Capture d'écran"} height={500} width={500}
                                           unoptimized={true}/>
                                </p>
                            </div>
                        </div>
                    </FadeInSection>
                </div>

            {/* Créer une offre de vente */}
                <div id={"step-2"} className={"min-h-[50vh] py-10 flex justify-center bg-gradient-to-r from-gray-50 to-gray-100 text-white w-full"}>
                    <FadeInSection>
                        <div className={"w-[90%] flex items-center gap-4"}>
                            <div className={"w-[50%] flex flex-col"}>
                                <p className={"text-gray-600 mb-1"}>
                                    Étape 2
                                </p>
                                <h2 className={"text-5xl mb-1 text-gray-900"}>
                                    Créez une offre de vente
                                </h2>

                                <p className={"text-gray-500 text-lg"}>
                                    Le plus important, c&#39;est maintenant !
                                </p>

                                <p className="text-gray-500 mt-3">
                                    Avant de pouvoir créer une offre il est obligatoire de vous <Link href={"/auth/login"}
                                                                                                      className={"text-blue-600 underline"}>connecter
                                    à votre compte PikaVault</Link>. Une fois connecté à votre compte PikaVault, rendez-vous sur
                                    la <Link href={session ? (`/resell/offers/${session.user.id}`) : ("/auth/login")}
                                             className={"text-blue-600 underline"} about={"_blank"}>page de gestion des
                                    offres</Link>.
                                </p>

                                <p className="text-gray-500 mt-3">
                                    Cliquez sur le bouton &#34;Créer une offre&#34;, et hop un formulaire apparaît !
                                </p>

                                <p className="text-gray-500 mt-3">
                                    Tous les champs du formulaire sont à remplir impérativement tâchez de le remplir avec les
                                    informations les plus pertinentes qui soit, afin que notre équipe puisse étudier votre
                                    demande le plus rapidement possible.
                                </p>

                                <p className="text-gray-500 mt-3 underline">
                                    Toute demande incompréhensible pour notre équipe se verra être automatiquement refusée
                                </p>

                                <Link href={"#step-3"}
                                      className={"px-3 py-3 mt-8 bg-gray-700 text-center font-medium rounded text-lg transition-all duration-400 hover:bg-gray-800"}>Passer
                                    à l&#39;étape suivante</Link>

                            </div>

                            <div className={"w-[50%] flex justify-center items-center"}>
                                <Image src={"/assets/img/createOffer.webp"} className={"object-center"} alt={"Capture d'écran"}
                                       height={500} width={500}
                                       unoptimized={true}/>
                            </div>
                        </div>
                    </FadeInSection>
                </div>

            {/* Status de l'offre */}
                <div id={"step-3"} className={"min-h-[50vh] py-10 flex justify-center bg-gradient-to-r from-white to-gray-50 text-white w-full"}>
                    <FadeInSection>
                        <div className={"w-[90%] flex flex-row-reverse items-center gap-4"}>
                            <div className={"w-[50%] flex flex-col"}>
                                <p className={"text-gray-600 mb-1"}>
                                    Étape 3
                                </p>
                                <h2 className={"text-5xl mb-1 text-gray-900"}>
                                    Status de votre offre
                                </h2>

                                <p className={"text-gray-500 text-lg"}>
                                    Il est temps de finaliser votre offre
                                </p>

                                <p className="text-gray-500 mt-3">
                                    Vous venez de créer votre offre, il est maintenant temps de voir ensemble la dernière étape avant le paiement pour vos articles. Vous voyez que devant chaque commande il y a une pastille de couleur avec un texte présent. Cette pastille représente le statut de votre offre.
                                </p>

                                <p className="text-gray-500 mt-3">
                                    Cliquez sur les pastilles présentes sur la gauche de votre écran afin de voir à quoi correspond chaque pastille.
                                </p>

                                <Link href={"#step-4"}
                                      className={"px-3 py-3 mt-8 bg-gray-700 text-center font-medium rounded text-lg transition-all duration-400 hover:bg-gray-800"}>Passer
                                    à l&#39;étape suivante</Link>

                            </div>

                            <div className={"w-[50%] flex flex-col justify-center items-center gap-6"}>
                                <div className={"mr-24 flex flex-col gap-8"}>
                                    <StatusBadge status={"En examen..."} />
                                    <StatusBadge status={"Refusée"} />
                                    <StatusBadge status={"Expédition en attente..."} />
                                    <StatusBadge status={"Paiement en attente..."} />
                                    <StatusBadge status={"Payée"} />
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>

            {/* Informations supplémentaires */}
                <div id={"step-4"} className={"min-h-[50vh] py-10 flex justify-center bg-gradient-to-r from-gray-700 to-gray-800 text-white w-full"}>
                    <FadeInSection>
                        <div className={"w-[90%] flex items-center gap-4"}>
                            <div className={"w-[50%] flex flex-col"}>
                                <h2 className={"text-5xl mb-1 text-gray-50"}>
                                    Informations supplémentaires
                                </h2>

                                <p className="text-gray-300 mt-3">
                                    Tous les frais de livraisons seront remboursés par PikaVault si votre offre est conclue.
                                    Dans le cas où votre offre se voit être refusée lorsque nous sommes en possession de vos
                                    articles, vos articles seront renvoyé à leur lieu d&#39;origine, les frais d&#39;expédition
                                    ne seront pas remboursés. Sans oublier que tous les articles de contrefaçon ne seront pas
                                    renvoyé et conservé puis détruits dans nos locaux.
                                </p>

                                <p className="text-gray-300 text-lg mt-3">
                                    Nous ne sommes en aucun cas responsable si votre articles ont été perdu lors du transit vers
                                    nos locaux (même si ce genre de cas sont extrèmement rare)
                                </p>

                                <Link href={"#step-3"}
                                      className={"px-3 py-3 mt-8 bg-yellow-200 text-orange-900 text-center font-medium rounded text-lg transition-all duration-400 hover:bg-yellow-300"}>Commencer
                                    à vendre</Link>

                            </div>

                            <div className={"w-[50%] flex justify-center items-center"}>
                                <div className={"ml-20"}>
                                    <Image src={"/assets/img/moreinfo.webp"} className={"object-center"} alt={"Capture d'écran"}
                                           height={600} width={600}
                                           unoptimized={true}/>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>

            {/* Adresse de livraison */}
                <div className={"min-h-[50vh] py-10 flex justify-center bg-gradient-to-r from-gray-600 to-gray-700 text-white w-full"}>
                    <FadeInSection>
                    <div className={"w-[90%] flex flex-row-reverse items-center gap-4"}>
                        <div className={"w-[50%] flex flex-col"}>
                            <h2 className={"text-5xl mb-2 text-gray-50"}>
                                Expédier vos colis à nos locaux
                            </h2>

                            <p className="text-gray-300 mt-3">
                                Prêtez attention à bien envoyer à la bonne adresse, tous colis expédier à la mauvaise adresse sera considéré comme perdu. Mieux vaut prévenir que guérir !
                            </p>

                            <div className={"mt-6 flex flex-col justify-center gap-5 p-5 bg-gray-300 rounded"}>
                                <div className="text-gray-700 flex flex-col items-center">
                                    <p className={" font-semibold text-2xl"}>
                                        Adresse postale
                                    </p>
                                    <p className={"text-gray-800"}>
                                        Rue du 31 décembre, 59
                                    </p>
                                </div>

                                <div className="text-gray-700 flex flex-col items-center mt-2">
                                    <p className={" font-semibold text-xl"}>
                                        Code postal
                                    </p>
                                    <p className={"text-gray-800"}>
                                        1207
                                    </p>
                                </div>

                                <div className="text-gray-700 flex flex-col items-center mt-2">
                                    <p className={" font-semibold text-xl"}>
                                        Région
                                    </p>
                                    <p className={"text-gray-800"}>
                                        Genève
                                    </p>
                                </div>

                                <div className="text-gray-700 flex flex-col items-center mt-2">
                                    <p className={"font-semibold text-xl"}>
                                        Pays
                                    </p>
                                    <p className={"text-gray-800"}>
                                        Suisse
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={"w-[50%] flex justify-center items-center"}>
                        <div className={"mr-20"}>
                                <Image src={"/assets/img/deliverytruck.webp"} className={"object-center"} alt={"Capture d'écran"}
                                       height={700} width={700}
                                       unoptimized={true}/>
                            </div>
                        </div>
                    </div>
                    </FadeInSection>
                </div>

            {/* Fin */}
                <div className={"min-h-[50vh] py-10 flex justify-center bg-gradient-to-r from-gray-50 to-gray-100 text-white w-full"}>
                <div className={"w-[90%] flex flex-row-reverse justify-center items-center gap-4"}>
                    <div className={"flex flex-col w-[80%] justify-center"}>
                        <p className={"px-3 py-1 bg-orange-200 text-gray-700 hover:bg-orange-300 hover:text-gray-800 hover:scale-105 transition-all duration-200 w-fit rounded-full mb-1"}>
                            Support technique
                        </p>
                        <h2 className={"text-5xl font-light mb-2 text-gray-800"}>
                            Encore des problèmes ? Encore des questions ?
                        </h2>
                        <p className={"text-gray-500 mt-1"}>
                            Pas de panique nous finirons par arriver à bout de tout ses problèmes !
                        </p>

                        <p className={"text-gray-500 mt-3 w-[50%]"}>
                            Notre support est là pour répondre à toutes vos questions et élucider tous vos problèmes, une réponse vous sera donnée sous 24h. Veuillez décrire votre problème avec précision afin de nous faciliter la tâche.
                        </p>

                        <Link href={"/contact"} className={"px-3 py-3 mt-8 w-fit bg-orange-400 text-gray-100 hover:text-white text-center font-medium rounded text-lg transition-all hover:scale-105 hover:shadow-xl duration-400 hover:bg-orange-500"}>Contacter le support</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}