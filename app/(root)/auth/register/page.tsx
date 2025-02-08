import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {signUp} from "@/actions/ArticleActions";

export default async function registerPage() {

    // On vérifie si l'utilisateur à une session active
    const session = await auth();
    if (session) {redirect("/boutique")}

    return (
        <div className="flex justify-center py-5 flex-col items-center">
            <h1 className="text-6xl">Créer un compte</h1>
            <p className="py-2">Créez votre compte dès maintenant !</p>

            <div className="form-container pt-12 flex flex-col">
                <form action={ async (formData) =>
                {
                    "use server";
                    const res = await signUp(formData)
                    if (res.success) {redirect("/auth/login")}
                }

                } className="flex flex-col ">
                    <input className="shadow-2xl my-5 py-2 px-3 border border-black rounded" type="text" name="name" placeholder="Nom d'utilisateur"/>
                    <input className="shadow-2xl my-5 py-2 px-3 border border-black rounded" type="email" name="email" placeholder="E-mail"/>
                    <input className="shadow-md my-5 py-2 px-3  border border-black rounded" type="password" name="password" placeholder="Mot de passe"/>
                    <button type="submit" className="text-white bg-black rounded-3xl w-fit p-3 text-xl mt-3">Créer votre compte</button>
                </form>
            </div>
        </div>
    );
}