
import { prisma } from "@/lib/prisma";
import ShowArticles from "@/components/Boutique/ShowArticles";

export default async function boutique() {
    const articles = await prisma.article.findMany();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                            Boutique officielle PikaVault
                        </div>

                        {/* Titre principal */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                                Découvrez notre
                                <span className="block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                    collection exclusive
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Des milliers de cartes Pokémon authentiques, displays exclusifs et accessoires premium.
                                Trouvez la pièce rare qui manque à votre collection.
                            </p>
                        </div>

                        {/* Stats rapides */}
                        <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{articles.length}+</div>
                                <div className="text-sm text-gray-600 font-medium">Produits disponibles</div>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">24h</div>
                                <div className="text-sm text-gray-600 font-medium">Livraison express</div>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">100%</div>
                                <div className="text-sm text-gray-600 font-medium">Cartes authentifiées</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Barre de séparation avec gradient */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* Section Articles */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ShowArticles articles={articles} />
                </div>
            </section>

            {/* Section Bottom CTA */}
            <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Vous ne trouvez pas ce que vous cherchez ?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Notre équipe est là pour vous aider à dénicher la carte de vos rêves.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors">
                                Contactez-nous
                            </button>
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                                Créer une alerte
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}