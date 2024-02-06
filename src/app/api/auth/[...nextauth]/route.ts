import NextAuth, { NextAuthOptions } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ credentials }),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const user = await res.json()
          console.log('USER IS', user)

          if (res.ok && user) {
            return user
          }

          return null
        } catch (e) {
          throw new Error('FAILED')
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  jwt: {
    maxAge: 60 * 60 * 24 * 30
  },

  callbacks: {
    // async session({session, token}) {
    //   session.id = token.id;
    //   session.userName = token.userName;
    //   return session;
    // }
    // async jwt({ token, user, account, profile }) {
    //   user && (token.user = user)
    //   return token
    // },
    async jwt({ token, user }) {
      console.log('JWT GET USER', user)
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token, user }) {
      console.log('SESSION GET USER', user)
      // const sessionAdjusted = {
      //   ...session,
      //   user: {
      //     id: user.id,
      //     ...session.user
      //   }
      // }
      return session
    }
  },

  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  }
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
