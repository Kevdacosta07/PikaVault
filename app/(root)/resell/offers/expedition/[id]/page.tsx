import {requireAuth} from "@/lib/authUtil";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import SendedExpeditionForm from "@/components/Offres/SendedExpeditionForm";

export default async function ExpeditionPage({params}: {params: Promise<{ id: string }>}) {

    const { id } = await params;

    const session = await requireAuth("/auth/login")

    const offer = await prisma.offers.findFirst({where: {id: id}})

    if (!offer) {redirect(`/profile/${session.user?.id}`)}

    if (session.user?.id !== offer?.user_id) {redirect(`/profile/${session.user?.id}`)}

    if (offer.status !== "expedition") {redirect(`/resell/offers/${session.user?.id}`)}

    return (
        <div className={"w-full"}>
            <div className={"flex justify-center flex-col items-center"}>
                <h2 className={"text-4xl font-bold mt-8"}>Vous êtes sur le point de vendre votre article</h2>
                <p className={"px-3 py-2 bg-lime-500 mt-3 text-black rounded-xl text-xl font-medium"}>Le paiement vous sera versé une fois les articles récupérés et vérifiés</p>
            </div>

            <div className={"w-full flex flex-col items-center send-infos mt-8"}>
                <div
                    className={"flex justify-center flex-col items-center shadow-md rounded shadow-gray-400 p-10 px-20 bg-gray-200"}>
                    <div className={"title flex flex-col items-center"}>
                        <h3 className={"text-3xl font-bold"}>Informations d&#39;expédition</h3>
                        <p className={"text-xl text-gray-700 font-normal mt-2"}>Expédiez votre colis avec les
                            informations ci-dessous</p>
                    </div>
                    <div className={"flex justify-center flex-col items-center w-full mt-10"}>
                        <div className={"flex flex-col justify-start w-full items-center"}>
                            <p className={"text-xl bg-orange-300 px-3 py-2 text-orange-800 font-bold shadow-md shadow-gray-300 rounded"}>Destinataire</p>
                            <p className={"text-2xl font-medium pt-4"}>Pikavault SA</p>
                        </div>
                    </div>

                    <div className={"flex justify-center flex-col items-center w-full mt-10"}>
                        <div className={"flex flex-col justify-start w-full items-center"}>
                            <p className={"text-xl bg-orange-300 px-3 py-2 text-orange-800 font-bold shadow-md shadow-gray-300 rounded"}>Adresse
                                postale</p>
                            <p className={"text-2xl font-medium pt-4"}>Rue du 31 décembre, 59</p>
                        </div>
                    </div>

                    <div className={"flex justify-center flex-col items-center w-full mt-10"}>
                        <div className={"flex flex-col justify-start w-full items-center"}>
                            <p className={"text-xl bg-orange-300 px-3 py-2 text-orange-800 font-bold shadow-md shadow-gray-300 rounded"}>Pays / Ville / Code postal</p>
                            <p className={"text-2xl font-medium pt-4"}>Suisse / Genève / 1207</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"w-full flex flex-col items-center send-infos mt-8"}>
                <SendedExpeditionForm offerid={offer.id} userid={session.user?.id} />
            </div>
        </div>
    )
}