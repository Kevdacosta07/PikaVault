import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "@auth/core/adapters";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/LoginSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma) as unknown as Adapter,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            async profile(profile) {
                return {
                    id: profile.sub, // Utilisation de `sub` comme ID unique Google
                    admin: profile.admin,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            }
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const validateCredentials = loginSchema.parse({
                    email: credentials.email,
                    password: credentials.password
                });

                // Recherche de l'utilisateur dans la base de données
                const user = await prisma.user.findUnique({
                    where: { email: validateCredentials.email }
                });

                if (!user || user.password !== validateCredentials.password) {
                    throw new Error("Identifiants incorrects !");
                }

                return { id: user.id, admin: user.admin, email: user.email, name: user.name };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Ajoute `id` pour les utilisateurs Credentials
                token.admin = user.admin;
            } else {
                // Récupérer l'ID utilisateur depuis la base si ce n'est pas défini
                const existingUser = await prisma.user.findFirst({
                    where: { email: token.email },
                    select: { id: true, admin: true },
                });

                if (existingUser) {
                    token.id = existingUser.id;
                    token.admin = existingUser.admin;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.admin = token.admin as number;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
});
