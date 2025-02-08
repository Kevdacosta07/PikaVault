import { DefaultSession } from "next-auth";
import {AdapterUser} from "@auth/core/adapters";

// Étendre `User` pour inclure `admin`
declare module "next-auth" {
    interface User extends AdapterUser {
        admin: number; // Ajoute `admin` à `User`
    }

    interface Session extends DefaultSession {
        user: User; // Assure que `session.user` a bien `admin`
    }

    interface JWT {
        id: string;
        admin: number; // Ajoute `admin` au token JWT
    }
}
