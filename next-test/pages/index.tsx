import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = () => {
	const { data } = useSession();
	const { push } = useRouter();
	const session = data;

	const signInButtonNode = () => {
		if (session) {
			return false;
		}

		return (
			<div>
				<Link href="/api/auth/signin">
					<Button
						colorScheme={"blue"}
						variant={"outline"}
						onClick={(e) => {
							e.preventDefault();
							signIn();
						}}
					>
						Sign In
					</Button>
				</Link>
			</div>
		);
	};

	const signOutButtonNode = () => {
		if (!session) {
			return false;
		}

		return (
			<div>
				<Link href="/api/auth/signout">
					<Button
						onClick={(e) => {
							e.preventDefault();
							signOut();
						}}
					>
						Sign Out
					</Button>
				</Link>
			</div>
		);
	};

	return (
		<Container marginX={0} maxWidth={"100%"}>
			<Stack
				direction="row"
				spacing={4}
				justify="center"
				width={"80vw"}
				paddingY={"2rem"}
				marginX={"auto"}
			>
				{signOutButtonNode()}
				{signInButtonNode()}
				<Button
					variant={"outline"}
					colorScheme="green"
					onClick={() => push(`/airtable/people`)}
				>
					People
				</Button>
				<Button
					variant={"outline"}
					colorScheme="green"
					onClick={() => push(`/airtable/locations`)}
				>
					Location
				</Button>
			</Stack>
			<Box
				bg="grey"
				w="100%"
				p={4}
				color="white"
				textAlign={"center"}
				width={"80vw"}
				marginX={"auto"}
			>
				{session && <Text>Hello {session.user?.name}</Text>}
				{!session && <Text>UNAUTHORIZED!</Text>}
			</Box>
		</Container>
	);
};

export const getServerSideProps = async ({ req }: { req: any }) => {
	const session = await getSession({ req });
	return {
		props: {
			session,
		},
	};
};

export default Home;
