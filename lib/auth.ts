import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "@auth/core/adapters";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/LoginSchema";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma) as unknown as Adapter,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            async profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    admin: 0,
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
                try {
                    const validateCredentials = loginSchema.parse({
                        email: credentials?.email,
                        password: credentials?.password
                    });

                    // Recherche de l'utilisateur dans la base de données
                    const user = await prisma.user.findUnique({
                        where: { email: validateCredentials.email },
                    });

                    if (!user || !user.password) {
                        throw new Error("Utilisateur introuvable ou non enregistré avec un mot de passe.");
                    }

                    // Vérifier si le mot de passe est correct
                    const passwordMatch = await bcrypt.compare(validateCredentials.password, user.password);
                    if (!passwordMatch) {
                        throw new Error("Mot de passe incorrect.");
                    }

                    return { id: user.id, admin: user.admin ?? 0, email: user.email, name: user.name };
                } catch (error) {
                    console.error("Erreur d'authentification :", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.admin = user.admin;
            } else {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: token.email ?? undefined },
                        select: { id: true, admin: true },
                    });

                    if (existingUser) {
                        token.id = existingUser.id;
                        token.admin = existingUser.admin;
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'utilisateur :", error);
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
