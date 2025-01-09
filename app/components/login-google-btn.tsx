"use client"

import {login} from "@/lib/auth";

export const LoginGoogleBtn = () => {
    return <button onClick={() => login()}>Se connecter avec Google</button>;
}