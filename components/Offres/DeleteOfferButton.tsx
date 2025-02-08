"use client";

import { deleteOffer } from "@/actions/OfferAction";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteOfferButton({ offer_id, onDelete }: { offer_id: string; onDelete: () => void }) {

    const handleDelete = async () => {
        try {
            // Supprimer l'offre de la base de données
            await deleteOffer({ offer_id: offer_id });
            // Mettre à jour l'interface en appelant onDelete
            onDelete();
            console.log('Offre supprimée avec succès!');
        } catch (error) {
            console.log('Erreur lors de la suppression:', error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className={"flex justify-center items-center rounded-full absolute top-[-5px] right-[-8px] h-[30px] w-[30px] bg-red-600"}
            aria-label="Supprimer l'offre"
        >
            <FontAwesomeIcon icon={faTrash} className={"rotate-0 text-white"} />
        </button>
    );
}
