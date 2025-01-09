import { auth } from "@/app/auth";
import "./profile.css"
import {LogoutBtn} from "@/app/components/logout-btn";

export default async function page() {

    const session = await auth();

    return (
        <div className="profile">
            <div className="informations personnelles"></div>

            <LogoutBtn/>
        </div>
    )
}