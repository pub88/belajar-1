import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from '@/lib/firebase/service';
import { compare } from "bcryptjs";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize (credentials: any) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                
                const user: any = await signIn({ email });
                if(user) {
                    const passwordConfirm = await compare(password, user.password);
                    if(passwordConfirm) {
                        return user;
                    }
                    return null;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, account, profile, user }) {
            if (account?.provider === "credentials") {
                token.email = user?.email;
                token.fullname = user?.fullname;
                token.role = user?.role;
            }
            console.log(user.email);
            return token;
        },
        async session({ session, token }:any) {
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }
            console.log(session, token);
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    }
}

export default NextAuth(authOptions);