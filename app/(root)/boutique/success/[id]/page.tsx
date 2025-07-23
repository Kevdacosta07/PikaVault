import { requireAuth } from "@/lib/authUtil";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faCheckCircle,
    faHome,
    faClock,
    faTruck,
    faTimesCircle,
    IconDefinition,
    faShoppingCart,
    faStar,
    faHeart,
    faGift,
    faRocket,
    faShieldAlt,
    faBolt,
    faMapMarkerAlt,
    faUser,
    faEuroSign,
    faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { PayedOrder } from "@/actions/OrderActions";
import Image from "next/image";

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
    items: string;
    createdAt: Date;
    status: string;
}

type Params = Promise<{ id: string }>

export default async function SuccessPage(props: { params: Params }) {
    const session = await requireAuth("/auth/login");
    const params = await props.params;
    const id = params.id;

    const order: Order | null = await prisma.order.findFirst({ where: { id: id } });

    if (!order || order.status === "cancelled" || order.userId !== session.user?.id) {
        redirect("/panier");
    }

    if (order.status === "pending") {
        await PayedOrder({ orderId: order.id });
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendmail/commandconfirmation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
                    items: JSON.parse(order.items),
                },
            }),
        });
    }

    const getStatusBadge = (status: Order["status"]) => {
        const statusMap: Record<Order["status"], { text: string; color: string; bgColor: string; icon: IconDefinition }> = {
            pending: { text: "En attente", color: "text-yellow-700", bgColor: "bg-yellow-100 border-yellow-200", icon: faClock },
            paid: { text: "Payée", color: "text-green-700", bgColor: "bg-green-100 border-green-200", icon: faCheckCircle },
            shipped: { text: "Expédiée", color: "text-blue-700", bgColor: "bg-blue-100 border-blue-200", icon: faTruck },
            cancelled: { text: "Annulée", color: "text-red-700", bgColor: "bg-red-100 border-red-200", icon: faTimesCircle },
        };

        const { text, color, bgColor, icon } = statusMap[status];

        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${bgColor} ${color} font-medium text-sm`}>
                <FontAwesomeIcon icon={icon} />
                {text}
            </div>
        );
    };

    const orderItems: OrderItem[] = JSON.parse(order.items);
    const totalItems = orderItems.reduce((acc, item) => acc + item.amount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                {/* Header compact */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl relative">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-white" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faStar} className="text-white text-xs" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Commande confirmée ! 🎉</h1>
                    <p className="text-lg text-gray-600 mb-4">Merci pour votre confiance ! Votre commande PikaVault a été traitée avec succès.</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg">
                        <FontAwesomeIcon icon={faBox} />
                        <span className="font-bold">#{order.id.slice(-8).toUpperCase()}</span>
                    </div>
                </div>

                {/* Corps principal en grid responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Informations principales - 8 colonnes */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Détails de commande compacts */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBox} className="text-blue-500" />
                                Détails de votre commande
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mb-1" />
                                    <div className="text-xs text-gray-600">Date</div>
                                    <div className="font-semibold text-sm">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <FontAwesomeIcon icon={faEuroSign} className="text-green-500 mb-1" />
                                    <div className="text-xs text-gray-600">Total</div>
                                    <div className="font-bold text-lg">{order.totalAmount}€</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <FontAwesomeIcon icon={faUser} className="text-purple-500 mb-1" />
                                    <div className="text-xs text-gray-600">Destinataire</div>
                                    <div className="font-semibold text-sm">{order.destinataire}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mb-1" />
                                    <div className="text-xs text-gray-600">Statut</div>
                                    {getStatusBadge(order.status)}
                                </div>
                            </div>

                            {/* Adresse compacte */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
                                    Adresse de livraison
                                </h3>
                                <div className="text-sm text-gray-700">
                                    <strong>{order.destinataire}</strong><br />
                                    {order.adress}, {order.cp} {order.city}, {order.country}
                                </div>
                            </div>
                        </div>

                        {/* Articles en horizontal scrollable */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faShoppingCart} className="text-yellow-500" />
                                Articles commandés ({totalItems})
                            </h3>

                            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                                {orderItems.map((item, index) => (
                                    <div key={index} className="flex-shrink-0 w-48 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="relative">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-lg shadow-sm"
                                                />
                                                <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                                    {item.amount}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm text-gray-900 truncate">{item.title}</h4>
                                                <div className="text-xs text-gray-600">
                                                    {item.amount} × {item.price}€
                                                </div>
                                                <div className="font-bold text-sm text-gray-900">
                                                    {(item.amount * item.price).toFixed(2)}€
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                        {order.totalAmount}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar actions - 4 colonnes */}
                    <div className="lg:col-span-4 space-y-4">
                        {/* Actions principales */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
                                Actions
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/boutique"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all duration-200 text-sm"
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Continuer vos achats
                                </Link>
                                <Link
                                    href="/commandes"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-200 text-sm"
                                >
                                    <FontAwesomeIcon icon={faBox} />
                                    Mes commandes
                                </Link>
                                <Link
                                    href="/"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-200 text-sm"
                                >
                                    <FontAwesomeIcon icon={faHome} />
                                    Accueil
                                </Link>
                            </div>
                        </div>

                        {/* Étapes compactes */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faClock} className="text-purple-500" />
                                Prochaines étapes
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xs" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Confirmée</p>
                                        <p className="text-xs text-gray-600">Paiement accepté</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBox} className="text-blue-500 text-xs" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Préparation</p>
                                        <p className="text-xs text-gray-600">Emballage en cours</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTruck} className="text-yellow-500 text-xs" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Livraison</p>
                                        <p className="text-xs text-gray-600">24-48h</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avantages compacts */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-200 p-6">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                                Avantages PikaVault
                            </h4>
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                    <span>Authenticité garantie</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
                                    <span>Livraison rapide</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                                    <span>Points fidélité</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faGift} className="text-purple-500" />
                                    <span>Emballage premium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}