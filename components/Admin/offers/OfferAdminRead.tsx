import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Offer {
    id: string;
    title: string;
    description: string;
    price: number;
    status: string;
}

interface OfferAdminReadProps {
    offer: Offer;
    onDelete: (id: string) => void;
}

export default function OfferAdminRead({ offer, onDelete }: OfferAdminReadProps) {
    return (
        <tr className="border-b hover:bg-gray-100 transition">
            <td className="px-6 py-4 font-medium text-gray-800">{offer.title}</td>
            <td className="px-6 py-4 hidden md:table-cell text-gray-600">
                {offer.description.length > 50 ? `${offer.description.substring(0, 50)}...` : offer.description}
            </td>
            <td className="px-6 py-4 text-orange-600 font-semibold">{offer.price} €</td>
            <td className="px-6 py-4">
                <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        offer.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                    }`}
                >
                    {offer.status}
                </span>
            </td>
            <td className="px-6 py-4 flex items-center gap-3">
                <Link href={`/admin/offers/edit/${offer.id}`} className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                    onClick={() => onDelete(offer.id)}
                    className="text-red-600 hover:text-red-800 transition"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}
