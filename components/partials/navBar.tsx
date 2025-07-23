import { auth } from "@/lib/auth";
import NavBarContent from "./NavBarContent";

export default async function NavBar() {
    const session = await auth();

    return <NavBarContent session={session} />;
}