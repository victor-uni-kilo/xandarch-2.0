// import NextAuth from "next-auth";
// import Auth0Provider from "next-auth/providers/auth0";

// const clientId: string = process.env.AUTH0_CLIENT_ID!;
// const clientSecret: string = process.env.AUTH0_CLIENT_SECRET!;

// export default NextAuth({
//   providers: [
//     Auth0Provider({
//       clientId,
//       clientSecret,
//       issuer: process.env.AUTH0_ISSUER,
//     }),
//   ],
// });

// ALTERNATIVE

import { handleAuth } from "@auth0/nextjs-auth0";
export default handleAuth();
