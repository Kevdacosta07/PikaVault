"use server";


import {auth} from "@/app/auth";
import {LoginGoogleBtn} from "@/app/components/login-google-btn";
import {redirect} from "next/navigation";

export default async function Login() {

    const session = await auth()

    if (session?.user) {
        redirect("/boutique")
    }

    return (<LoginGoogleBtn/>)
}