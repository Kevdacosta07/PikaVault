import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

interface Article {
    id: string;
    title: string;
    type: string;
}

export default function ArticleComposent({ article, onDelete }: { article: Article; onDelete: (id: string) => void }) {
    return (
        <div className={"flex justify-center mt-8 mx-6 relative"}>
            <div className={"px-3 py-5 shadow-xl rounded bg-gray-200 w-[300px] h-[400px] flex justify-center flex-col items-center"}>
                <h2>{article.title ?? ""}</h2>
                <h2>{article.type}</h2>
                <button onClick={() => onDelete(article.id)} className="px-4 py-2 bg-red-500 transform translate-x-[40%] translate-y-[-20%] text-white rounded-full absolute top-0 right-0 shadow-md hover:bg-red-700 transition">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    );
}
