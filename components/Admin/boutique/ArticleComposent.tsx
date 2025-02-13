import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ImageLoading from '@/components/Boutique/ImageLoading';
import Link from 'next/link';
import ModalArticle from "@/components/Admin/boutique/ModalArticle";

interface Article {
    id: string;
    image: string;
    type: string;
    price: number;
    title: string;
    description: string;
    amount: number;
}

interface ArticleComponentProps {
    article: Article;
    onDelete: (id: string) => void;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({ article, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const typeMapping = {
        cartesjap: 'Cartes japonaises',
        cartesfr: 'Cartes françaises',
        displayfr: 'Display françaises',
        displayjap: 'Display japonaises',
        accessoires: 'Accessoires',
        exclusivites: 'Exclusivités',
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div
                key={article.id}
                className="card relative hover:scale-[101%] transition-all hover:border-2 bg-gradient-to-b from-gray-300 to-gray-50 hover:border-gray-600 border-2 border-white m-8 bg-gray-50 flex flex-col items-center rounded-xl py-4 w-[350px] shadow-gray-500 shadow-lg"
            >
                <button
                    onClick={() => onDelete(article.id)}
                    className="px-4 py-2 bg-red-500 z-10 transform translate-x-[50%] translate-y-[-50%] text-white rounded-full absolute top-0 right-0 shadow-md hover:bg-red-700 transition"
                >
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>

                <div className="flex flex-col items-center w-[300px]">
                    <ImageLoading
                        src={article.image}
                        alt="Image ajoutée"
                        width={290}
                        height={280}
                        className="w-auto h-[280px] object-center object-fill rounded-sm"
                    />
                    <div className="flex mb-3 flex-col items-center text-[#383838] w-full">
                        <div className="flex items-start w-full flex-col mt-8">
                            <div className="flex items-center flex-row-reverse justify-end w-full mb-5">
                                <Link
                                    href={`/admin/articles/edit/${article.id}`}
                                    className="text-[13px] text-white hover:bg-gray-700 transition-colors duration-300 px-3 py-1 bg-gray-600 rounded-full ml-2"
                                >
                                    <FontAwesomeIcon icon={faPen}/>
                                </Link>
                                <p className="text-md rounded-full bg-orange-600 px-3 py-1 ml-3 text-white capitalize font-semibold">
                                    {typeMapping[article.type as keyof typeof typeMapping] || article.type}
                                </p>
                                <p className="text-3xl text-center text-black italic">
                                    {article.price} €
                                </p>
                            </div>

                            <h2 className="flex items-center font-semibold text-xl text-[#383838] w-full capitalize">
                                {article.title}
                            </h2>

                            <p className="mt-2 mb-2 text-gray-600 text-s">
                                {article.description.length > 50
                                    ? `${article.description.substring(0, 60)}...`
                                    : article.description}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleOpenModal}
                        className="bg-orange-500 font-semibold text-lg transition-colors hover:bg-orange-600 duration-300 w-full text-white px-4 py-2 rounded"
                    >
                        Consulter l&#39;article
                    </button>
                </div>
            </div>

            {/* Modale */}
            <ModalArticle
                article={article}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default ArticleComponent;
