import NextAuth from 'next-auth/next';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // user parametresi loginden return gelirse çalışır

      // jwt callback çalışırsa token içerisine atacaklarımızı belirliyoruz ve sonra bunu session callback içerisinde kullanacağız
      if (user?._id) token._id = user._id;
      if (user?._id) token.user = user;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      // jwt callback içerisinde atadığımız token içerisindeki değerleri session içerisine atıyoruz
      if (token._id) {
        session._id = token._id;
        session.user = token.user;
      }
      if (token.isAdmin) session.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin,
          };
        }

        throw new Error('Email or password is incorrect');
      },
    }),
  ],
});
