import NextAuth from 'next-auth/next'
import Google from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
})