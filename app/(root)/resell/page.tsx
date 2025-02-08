import Link from "next/link";
import {auth} from "@/lib/auth";

export default async function ResellPage() {

    const session = await auth();

    return (
        <div>
            {session ?
                (<Link href={`/resell/offers/${session.user?.id}`} className={"px-3 py-2 bg-orange-600 rounded-2xl text-white"}>Faire une offre</Link>)
                    :
                (
                    <Link href={"/auth/login"} className={"px-3 py-2 bg-orange-600 rounded-2xl text-white"}>Connectez-vous pour faire une offre</Link>
                )
            }
        </div>
    )
}