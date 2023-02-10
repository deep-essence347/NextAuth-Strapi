import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	// database: process.env.NEXT_PUBLIC_DATABASE_URL,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		session: async (session, user) => {
			session.jwt = user.jwt;
			session.id = user.id;
			return Promise.resolve(session);
		},
		jwt: async ({ token, account, user, profile }) => {
			// console.log("Token:");
			// console.log(token);
			// console.log("user:");
			// console.log(user);
			// console.log("account:");
			// console.log(account);
			// console.log("Profile:");
			// console.log(profile);
			
			if (user) {
				const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?access_token=${account.access_token}`;
				console.log(url);
				
				try {
					//Fetch request fails
					const response = await fetch(url)

					//Does not run from here.
					console.log(response);

					const data = await response.json();
					console.log(data);
					token.jwt = data.jwt;
					token.id = data.user.id;
				} catch (error) {console.log(error)}
			}
			return Promise.resolve(token);
		},
	},
};

/**
 * `fetch()` request fails due to which the `jwt token` and `user` is not obtained so the later erros of `JWT_SESSION_ERROR` could only be because of he failure of `fetch()`
 * 
 */


const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
