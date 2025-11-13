import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "common",
    }),
    // Yahoo OAuth provider configuration
    {
      id: "yahoo",
      name: "Yahoo",
      type: "oauth" as const,
      wellKnown: "https://api.login.yahoo.com/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      clientId: process.env.YAHOO_CLIENT_ID || "",
      clientSecret: process.env.YAHOO_CLIENT_SECRET || "",
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name || profile.nickname,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.companyName = (user as any).companyName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const mutableUser = session.user as Record<string, unknown>
        const tokenData = token as Record<string, unknown>

        if (typeof tokenData.id !== "undefined") {
          mutableUser.id = tokenData.id
        }

        if (typeof tokenData.role !== "undefined") {
          mutableUser.role = tokenData.role
        }

        if (typeof tokenData.companyName !== "undefined") {
          mutableUser.companyName = tokenData.companyName
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/applicant",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
