"use server"

import { signIn, signOut } from "@/app/auth";

export const login = async () => {
    await signIn("google", { redirectTo: "/boutique"})
};

export const logout = async () => {
    await signOut({ redirectTo: "/"})
};
