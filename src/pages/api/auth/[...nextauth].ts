import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'

import { PrismaAdapter } from '@/src/lib/auth/prisma-adapter'

export function buildNextAuthOptions(req: NextApiRequest, res: NextApiResponse): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        authorization: {
          url: 'https://github.com/login/oauth/authorize',
          params: {
            scope: 'read:user',
          },
        },
        profile(profile: GithubProfile) {
          return {
            id: profile.id.toString(),
            name: profile.name!,
            email: profile.email!,
            avatar_url: profile.avatar_url,
          }
        },
      }),
    ],

    callbacks: {
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
