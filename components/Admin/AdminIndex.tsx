import CarouselUser from "@/components/Admin/CarouselUser";
import CarouselCommands from "@/components/Admin/CarouselCommands";
import CarouselOffer from "@/components/Admin/CarouselOffer";

interface User {
    id: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
    emailVerified: Date | null;
    admin: number;
    points: number;
    created_at: Date;
}

interface Command {
    items: string;
    id: string;
    email: string;
    userId: string;
    destinataire: string;
    adress: string;
    city: string;
    country: string;
    cp: number;
    totalAmount: number;
    createdAt: Date;
    status: string;
}

interface Offer {
    title: string;
    image: string[];
    id: string;
    description: string;
    price: number;
    created_at: Date;
    status: string;
    user_id: string;
    tracknumber: string | null;
}


export default function AdminIndex({users, commands, offers}: { users: User[], commands: Command[], offers: Offer[] }) {
    return (
        <div className="p-6 w-full min-h-screen">
            <div className={"flex flex-col justify-center items-center mb-6 mt-2"}>
                <h1 className="text-5xl mb-3 font-bold text-gray-800">Tableau de bord <span className={"bg-red-200 px-3 rounded-md text-red-800"}>Administrateur</span></h1>
                <p className={"text-gray-600 text-lg font-medium"}>Gérez vos commandes, utilisateurs et offres en toute simplicité </p>
            </div>

            {/* Carrousels pour chaque section */}
            <CarouselUser title="Utilisateurs" items={users} />
            <CarouselCommands title="Commandes" items={commands} />
            <CarouselOffer title="Offres" items={offers} />
        </div>
    );
}
