"use client";

import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faFire, faStar} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import FadeInSection from "@/components/Animation/FadeInSection";


export default function Home() {
      return (
          <div className={"overflow-hidden"}>
              {/* Hero Banner */}
              <div className="relative w-screen h-screen overflow-hidden">
                  {/* Vidéo en plein écran */}
                  <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                  >
                      <source src="/assets/videos/profileBackground2.mp4" type="video/mp4"/>
                      Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>

                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-0% to-80% from-black to-transparent"></div>

                  {/* Contenu au-dessus de la vidéo */}
                  <div className="absolute pl-20 top-0 left-0 w-full h-full flex flex-col justify-center text-white">
                      <h1 className="text-6xl font-medium">Bienvenue sur <span
                          className={"bg-orange-200 text-orange-800 px-3 rounded-md shadow-md"}>PikaVault</span></h1>
                      <p className=" font-medium text-xl text-orange-300 px-2 mt-6">La boutique en ligne spécialisée dans la vente d&#39;articles pokémon</p>
                      <p className={"w-[40%] text-left mt-3 mb-4 text-lg text-gray-200"}>Votre boutique spécialisée dans l&#39;achat, la
                          vente et l&#39;échange de cartes Pokémon.
                          Trouvez les cartes les plus rares, renforcez votre deck et profitez des meilleures offres du
                          marché.
                          Que vous soyez collectionneur ou compétiteur, PikaVault est l&#39;endroit idéal pour enrichir
                          votre passion !
                      </p>
                      <Link href={"#start"}
                            className={"px-3 py-2 mt-4 font-semibold text-xl bg-white w-fit text-gray-800 rounded transition-all hover:shadow-lg hover:scale-105 hover:bg-gray-200 hover:text-black shadow-gray-400 shadow-sm"}>
                          Débuter l&#39;aventure
                      </Link>
                  </div>
              </div>

              {/* SECTION D'INFORMATION RAPIDE */}
              <div id={"start"} className={"overflow-hidden pt-8 w-full flex justify-center bg-gradient-to-r from-white to-gray-200"}>
                  <div className={"w-[90vw] flex flex-col justify-center gap-10"}>
                      {/* SECTION DRACOFEU */}
                      <FadeInSection>
                          <div className="relative min-h-[60vh] flex items-center">
                              <div className={"flex flex-col w-[50%]"}>
                                  <p className={"font-semibold text-lg mb-2 px-3 py-1 bg-amber-400 text-amber-900 shadow shadow-gray-200 rounded-full w-fit"}>Deck
                                      de jeu</p>
                                  <h2 className={"text-5xl font-lights text-gray-800"}>
                                      Préparez-vous au combat <FontAwesomeIcon icon={faFire}
                                                                               className={"ml-1 text-orange-600"}/>
                                  </h2>

                                  <p className={"my-8 text-2xl font-medium text-gray-600"}>
                                      Votre deck sera votre meilleur allié lors de vos combats.
                                  </p>

                                  <p className={"text-2xl font-normal text-gray-600"}>
                                      Munissez-vous des cartes les plus puissantes et les plus complètes pour votre style de
                                      jeu grâce à <span className={"bg-amber-400 px-2 text-amber-950"}>notre boutique</span>
                                  </p>

                                  <p className={"text-2xl mt-8 font-normal text-gray-600"}>
                                      Dominez l&#39;arène avec un deck conçu pour la victoire. Choisissez parmi les cartes
                                      les
                                      plus rares et stratégiques, et devenez un maître incontesté du jeu !
                                  </p>

                                  <Link href={"/boutique"}
                                        className={"mt-8 bg-gray-700 text-gray-100 px-3 py-2 text-lg font-semibold rounded-md shadow-md transition-all hover:bg-gray-800 hover:shadow-gray-300 hover:shadow-xl hover:scale-105 w-fit"}>
                                      Consulter la boutique
                                  </Link>

                              </div>

                              <div className={"w-[50%] flex justify-center items-center"}>
                                  <Image src={"/assets/img/drakofeu.png"} className={"object-center h-[450px] w-auto"}
                                         alt={"Dracofeu"} width={750} height={750} unoptimized/>
                              </div>
                          </div>
                      </FadeInSection>

                      {/* DIVISEUR */}
                      <div className={"w-full h-[1px] bg-gray-300 my-6"}>

                      </div>

                      {/* SECTION PIKACHU */}
                      <FadeInSection>
                        <div className="relative min-h-[60vh] flex flex-row-reverse justify-between items-center">
                          <div className="flex flex-col w-[50%]">
                              <p className="font-semibold text-lg mb-2 px-3 py-1 bg-amber-300 text-amber-900 shadow shadow-gray-200 rounded-full w-fit">
                                  Nouveautés Exclusives
                              </p>
                              <h2 className="text-5xl font-light text-gray-800">
                                  Restez à la pointe de l&#39;actualité <FontAwesomeIcon icon={faStar}
                                                                                         className="ml-1 text-yellow-500"/>
                              </h2>
                              <p className="my-8 text-2xl font-medium text-gray-600">
                                  Ne manquez pas les dernières sorties et éditions limitées.
                              </p>
                              <p className="text-2xl font-normal text-gray-600">
                                  Notre boutique est constamment mise à jour avec les nouveautés du monde Pokémon.
                              </p>
                              <p className="text-2xl mt-8 font-normal text-gray-600">
                                  Soyez le premier à obtenir les cartes et accessoires les plus récents pour rester en
                                  tête.
                              </p>
                          </div>


                          <div className={"w-[50%] flex justify-center items-center"}>
                              <Image src={"/assets/img/pikachu.png"} className={"object-center h-[450px] w-auto"}
                                     alt={"Dracofeu"} width={800} height={800} unoptimized/>
                          </div>
                      </div>
                      </FadeInSection>

                      {/* DIVISEUR */}
                      <div className={"w-full h-[1px] bg-gray-300 my-6"}>

                      </div>

                      {/* SECTION MEW */}
                      <FadeInSection>
                          <div className="relative min-h-[60vh] flex justify-between items-center">
                              <div className="flex flex-col w-[50%]">
                                  <p className="font-medium text-lg mb-2 px-3 py-1 bg-pink-300 text-pink-900 shadow shadow-gray-200 rounded-full w-fit">
                                      Vente de collection
                                  </p>
                                  <h2 className="text-5xl font-light text-gray-800">
                                      Vendez vos doublons rapidement <FontAwesomeIcon icon={faCoins} className="ml-1 text-pink-500"/>
                                  </h2>
                                  <p className="my-8 text-2xl font-medium text-gray-600">
                                      Vos cartes ont de la valeur à nos yeux.

                                  </p>
                                  <p className="text-2xl font-normal text-gray-600">
                                      Revendez vos cartes et collections directement sur <span className="bg-pink-400 px-2 text-pink-950">notre boutique</span> et obtenez la meilleure offre du marché.
                                  </p>
                                  <p className="text-2xl mt-8 font-normal text-gray-600">
                                      Que vos cartes soient ultra-rares ou en collection complète, vendez-les rapidement au meilleur prix.
                                  </p>
                                  <Link
                                      href="/resell"
                                      className="mt-8 bg-gray-700 text-gray-100 px-3 py-2 text-lg font-semibold rounded-md shadow-md transition-all hover:bg-gray-800 hover:shadow-gray-300 hover:shadow-xl hover:scale-105 w-fit"
                                  >
                                      Revendre mes cartes
                                  </Link>
                              </div>


                              <div className={"w-[50%] flex justify-center items-center"}>
                                  <Image src={"/assets/img/mew.png"} className={"object-center h-[450px] w-auto"}
                                         alt={"Dracofeu"} width={800} height={800} unoptimized/>
                              </div>
                          </div>
                      </FadeInSection>
                  </div>
              </div>


              {/* PikaVault c'est quoi ? */}
              <div className={"min-h-[50vh] py-16 pt-24 bg-gray-700 flex flex-col justify-center items-center text-white"}>
                <FadeInSection>
                    <div className={"flex justify-center flex-col items-center gap-2 mt-4"}>
                        <h2 className={"text-6xl font-light"}><span
                            className={"px-2 py-1 bg-gray-100 from-gray-50 to-gray-300 bg-gradient-to-b text-gray-700 rounded"}>PikaVault</span> c&#39;est
                            quoi ?</h2>
                        <p className={"text-gray-100 w-[55%] text-xl mt-10"}>PikaVault est une boutique en ligne dédiée
                            à l&#39;achat, la vente et l&#39;échange de cartes Pokémon.</p>
                        <p className={"text-gray-300 w-[55%] text-lg mt-1"}>Que vous cherchiez à renforcer votre deck,
                            compléter votre collection ou revendre vos doublons, PikaVault vous offre une plateforme
                            sécurisée et spécialisée pour les passionnés du JCC Pokémon.</p>

                        <iframe
                            className="w-[50%] h-[400px] rounded-lg shadow-lg mt-8"
                            src="https://www.youtube.com/embed/-FPZZWU5mCs"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>

                    </div>
                </FadeInSection>

                  <div className={" flex justify-between w-[60vw]"}>

                  </div>
              </div>


              <div className={"min-h-[50vh] flex justify-center items-center py-10 bg-gradient-to-r from-white to-gray-100"}>
                <div className={"w-[90%] flex h-full items-center"}>
                    <div className={"w-[50%]"}>
                        <p className={"px-3 py-1 bg-emerald-300 text-emerald-950 w-fit mb-2 rounded-full"}>Coming soon</p>
                        <h2 className={"text-5xl font-light"}>Système de fidélité</h2>
                        <p className={"mt-3 text-lg text-gray-600"}>Obtenez des récompense pour vos achats</p>

                        <ul className={"text-xl font-medium text-gray-700 mt-8 gap-4 flex flex-col items-start"}
                            style={{listStyle: "none", listStylePosition: "inside"}}>
                            <li>Choisissez un article sur notre boutique, puis passez une commande.</li>
                            <li>Pour chaque euro dépensé lors de votre commande vous obtiendrez <span
                                className={"bg-emerald-300 text-emerald-950 px-3 py-1"}>1 point de fidélité.</span></li>
                            <li>Dépensez vos points de fidélité dans notre boutique et obtenez des récompenses à la
                                hauteur de vos dépenses.
                            </li>
                        </ul>
                    </div>
                    <div className={"w-[50%] flex justify-center items-center"}>
                        <Image src={"/assets/img/money2.png"} className={"object-center h-[550px] w-auto"} height={300} width={300} unoptimized alt={"Argent en 3D"} />
                    </div>
                </div>
              </div>
          </div>
      );
}

