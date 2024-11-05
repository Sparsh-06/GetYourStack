import { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";


export const authOptions: NextAuthConfig = {
    providers: [
        // OAuth authentication providers...
        GithubProvider({
          clientId: "Ov23li5rkIj0o7jtGqvY",
          clientSecret: "3b5b012ebd80d6e70b2f2e0b79136eb54dc3d25b",
        }),
      ],
}