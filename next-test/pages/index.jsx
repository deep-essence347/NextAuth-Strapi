import {
	Box,
	Button,
	Container, Stack,
	Text
} from "@chakra-ui/react";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ session }) {
	const [lastReq, setLastReq] = useState("None");
	const [filterOptions, setfilterOptions] = useState("");

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

	useEffect(() => {
		console.log(session);
	}, []);

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
				{session && (
					<Text>AUTHORIZED...</Text>
				)}
				{!session && <Text>UNAUTHORIZED!</Text>}
			</Box>
		</Container>
	);
}

export const getServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	return {
		props: {
			session,
		},
	};
};
