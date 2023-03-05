import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
	timeout: 10000,
});
export const options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		Credentials({
			async authorize(credentials, req) {
				const { username, email, password, newUser } = credentials;
				let user = null;
				let url = "";
				if (newUser === "true") {
					user = { username: username, email: email, password: password };
					url = `/api/auth/local/register`;
				} else {
					user = { identifier: email, password: password };
					url = `/api/auth/local`;
				}
				if (user) {
					try {
						const response = await instance.post(url, user, {
							headers: {
								"Content-Type": "application/json",
							},
						});
						return response.data;
					} catch (err) {
						// console.log(err.response.data.error.message);
						throw new Error(err.response.data.error.message);
					}
				} else {
					console.log("no user");
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		error: `/auth/signin`,
	},
	// database: process.env.NEXT_PUBLIC_DATABASE_URL,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		redirect: async ({ baseUrl, url }) => {
			return baseUrl;
		},
		session: async ({ session, token }) => {
			session.jwt = token.jwt;
			session.user.id = token.id;
			return Promise.resolve(session);
		},
		jwt: async ({ account, profile, user, token }) => {
			if (user) {
				const url = `/api/auth/${account.provider}/callback`;

				try {
					if (account.provider !== "credentials") {
						const response = await instance.get(url, {
							params: { access_token: account.access_token },
						});
						const data = await response.data;

						token.jwt = data.jwt;
						token.id = data.user.id;
					} else {
						token = {
							...token,
							jwt: user.jwt,
							id: user.user.id,
							name: user.user.username,
							email: user.user.email,
						};
					}
				} catch (error) {
					console.log(error);
				}
			}

			return Promise.resolve(token);
		},
	},
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
