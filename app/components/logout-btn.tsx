"use client"

import {logout} from "@/lib/auth";
import "./logout_btn.css"

export const LogoutBtn = () => {
    return <button className="logout-btn" onClick={() => logout()}>Se déconnecter</button>;
}