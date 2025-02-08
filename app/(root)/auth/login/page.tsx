import Link from "next/link";
import {auth, signIn} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function LoginPage() {

    const session = await auth();

    if (session) {redirect("/boutique")}

    return (
        <div>
            <div className="title flex justify-center items-center">
                <h1 className="text-6xl py-5">Connexion à PikaVault</h1>
            </div>

            <div className="forms-ctn flex flex-col justify-center items-center gap-8">

                {/* Formulaire de connexion OAuth (Google) */}

                <form action={async () => {
                    "use server"
                    await signIn("google")}} className="p-3 shadow-sm font-bold rounded-3xl">

                    <button type="submit" className="text-2xl my-12 py-4 px-6 text-white bg-black rounded-full">
                        Se connecter avec Google
                    </button>
                </form>

                {/* Formulaire de connexion (avec données manuelles) */}

                <form
                    action={async (formData) => {
                        "use server"
                        await signIn("credentials", formData)
                    }}
                    className="flex flex-col items-center gap-4 p-5 shadow-md rounded-lg"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Votre e-mail"
                        required
                        className="border p-2 rounded-md w-80"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Votre mot de passe"
                        required
                        className="border p-2 rounded-md w-80"
                    />
                    <button
                        type="submit"
                        className="text-xl py-2 px-6 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50">
                        Se connecter
                    </button>
                </form>
            </div>

            <div className="mt-6 flex flex-col justify-center items-center gap-8">
                <p>
                    Vous n&#39;avez pas de compte ? {" "}
                    <Link className="text-blue-500 underline" href="/auth/register">
                        Inscrivez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
}
