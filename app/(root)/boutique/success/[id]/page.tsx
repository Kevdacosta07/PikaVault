import { requireAuth } from "@/lib/authUtil";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBox, faCheckCircle, faHome, faClock, faTruck, faTimesCircle, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { PayedOrder } from "@/actions/OrderActions";

interface OrderItem {
    title: string;
    amount: number;
    price: number;
    image: string;
}

interface Order {
    id: string;
    userId: string;
    email: string;
    destinataire: string;
    adress: string;
    city: string;
    country: string;
    cp: number;
    totalAmount: number;
    items: string; // Stocké sous forme JSON dans la BDD
    createdAt: Date;
    status: string;
}

type Params = Promise<{ id: string }>

export default async function SuccessPage(props: { params : Params }) {

    const session = await requireAuth("/auth/login");

    const params = await props.params;
    const id = params.id;

    // ✅ Vérifier si la commande existe et appartient à l'utilisateur
    const order: Order | null = await prisma.order.findFirst({ where: { id: id } });

    if (!order || order.status === "cancelled" || order.userId !== session.user?.id) {
        redirect("/panier");
    }

    // ✅ Marquer la commande comme payée si elle est en attente
    if (order.status === "pending") {
        console.log("Commande mise à jour comme payée");
        await PayedOrder({ orderId: order.id });

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendmail/commandconfirmation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session.user.email,
                subject: `Confirmation de votre commande #${order.id}`,
                command: {
                    orderId: order.id,
                    destinataire: order.destinataire,
                    adress: order.adress,
                    cp: order.cp,
                    city: order.city,
                    country: order.country,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    items: JSON.parse(order.items), // Convertir la string en tableau
                },
            }),
        });
    }

    // 🎨 Gestion des statuts avec badge et icône
    const getStatusBadge = (status: Order["status"]) => {
        const statusMap: Record<Order["status"], { text: string; color: string; icon: IconDefinition }> = {
            pending: { text: "En attente", color: "yellow", icon: faClock },
            paid: { text: "Payée", color: "green", icon: faCheckCircle },
            shipped: { text: "Expédiée", color: "blue", icon: faTruck },
            cancelled: { text: "Annulée", color: "red", icon: faTimesCircle },
        };

        const { text, color, icon } = statusMap[status];

        return (
            <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-${color}-100 text-${color}-700 flex items-center gap-2`}>
                <FontAwesomeIcon icon={icon} className={`text-${color}-500`} />
                {text}
            </span>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl text-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-4" />
                <h2 className="text-3xl font-bold text-gray-800">Merci pour votre commande ! 🎉</h2>
                <p className="text-gray-600 mt-2">Votre commande a été enregistrée avec succès.</p>

                {/* 📦 Détails de la commande */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold flex justify-center text-gray-700 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBox} className="text-gray-500" />
                        Détails de la commande
                    </h3>

                    <div className="mt-3">
                        <p className="text-gray-800 font-medium">Numéro de commande :</p>
                        <p className="text-gray-500">{order.id}</p>
                    </div>

                    <div className="mt-3">
                        <p className="text-gray-800 font-medium">Montant total :</p>
                        <p className="text-gray-500">{order.totalAmount} €</p>
                    </div>

                    <div className="mt-3">
                        <p className="text-gray-800 font-medium">Adresse de livraison :</p>
                        <p className="text-gray-500">{order.adress || "Non renseignée"}, {order.cp}, {order.city} ({order.country})</p>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <p className="text-gray-800 font-medium">Statut :</p>
                        {getStatusBadge(order.status)}
                    </div>
                </div>

                {/* 📋 Liste des articles */}
                <div className="mt-6 text-left">
                    <h3 className="text-xl font-semibold text-gray-700">📦 Articles commandés</h3>
                    <div className="mt-2 space-y-3">
                        {JSON.parse(order.items).map((item: OrderItem, index: number) => (
                            <div key={index} className="flex items-center gap-4 border p-3 rounded-lg">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                                <div>
                                    <p className="text-lg font-medium">{item.title}</p>
                                    <p className="text-gray-500">{item.amount} x {item.price} €</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🔄 Boutons */}
                <div className="mt-8 flex justify-center gap-4">
                    <Link href="/boutique"
                          className="px-5 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition">
                        Continuer vos achats 🛒
                    </Link>
                    <Link href="/"
                          className="px-5 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition">
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Retour à l&#39;accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
