import "@/styles/globals.css";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { SessionProvider } from "next-auth/react";
const client = new ApolloClient({
	uri: "http://localhost:1337/graphql",
	cache: new InMemoryCache(),
});
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={client}>
				<ChakraProvider>
					<Head>
						<title>Next.Js Test</title>
					</Head>
					<Component {...pageProps} />
				</ChakraProvider>
			</ApolloProvider>
		</SessionProvider>
	);
}
