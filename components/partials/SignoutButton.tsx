"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {signOut} from "@/lib/auth";

const handleSignout = async () => {
    await signOut({redirectTo: "/auth/login"});
}

export default function SignoutButton() {
    return (
        <button
            className={"font-medium text-xs px-3 py-2 bg-red-500 rounded-full text-white"}
            type="submit"
            onClick={handleSignout}><FontAwesomeIcon icon={faPowerOff}/></button>
    )
}