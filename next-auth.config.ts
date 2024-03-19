// next-auth.config.js
import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    // Your authentication providers (e.g., Google, GitHub, etc.)
  ],
  pages: {
    signIn: '/signin', // Specify your custom login page path
  },
});