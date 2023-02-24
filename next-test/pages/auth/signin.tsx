import { AutoFadeAlert, MESSAGE_STATUS } from "@/components/flash-bar";
import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Text,
} from "@chakra-ui/react";
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useState } from "react";
export default function SignIn({
	csrfToken,
	error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [form, setForm] = useState("login");
	const [errorM, setErrorM] = useState({
		message: error || null,
		show: error ? true : false,
	});
	const session = useSession();
	// console.log(session);
	const [user, setUser] = useState({
		username: "Dipesh",
		email: "dipesh@gmail.com",
		password: "dipesh",
		password2: "dipesh",
	});

	const submit = async () => {
		if (form === "login")
			await signIn("credentials", {
				email: user.email,
				password: user.password,
				newUser: false,
			});
		else {
			if (user.password === user.password2)
				await signIn("credentials", {
					username: user.username,
					email: user.email,
					password: user.password,
					newUser: true,
				});
			else setErrorM({ message: "Your passwords do not match.", show: true });
		}
	};

	const ErrorDetail = () => {
		if (errorM.message) {
			return (
				<AutoFadeAlert
					message={errorM.message}
					status={MESSAGE_STATUS.error}
					setMessage={setErrorM}
				/>
			);
		} else return <></>;
	};

	const RegisterForm = () => {
		return (
			<>
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input
						placeholder="Name"
						type={"name"}
						value={user.username}
						onChange={(v) => setUser({ ...user, username: v.target.value })}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Email</FormLabel>
					<Input
						placeholder="Email"
						type={"email"}
						value={user.email}
						onChange={(v) => setUser({ ...user, email: v.target.value })}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Password</FormLabel>
					<Input
						placeholder="Password"
						type={"password"}
						value={user.password}
						onChange={(v) => setUser({ ...user, password: v.target.value })}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Confirm Password</FormLabel>
					<Input
						placeholder="Confirm Password"
						type={"password"}
						value={user.password2}
						onChange={(v) => setUser({ ...user, password2: v.target.value })}
					/>
				</FormControl>
				<Container
					display={"inline-flex"}
					alignItems={"center"}
					gap={3}
					marginY={2}
					justifyContent={"center"}
				>
					<Text>Already have an account?</Text>
					<Button
						onClick={() => setForm("login")}
						background={"transparent"}
						textDecoration={"underline"}
					>
						Sign In
					</Button>
				</Container>
				<Button type="submit" onClick={async () => await submit()}>
					Sign Up
				</Button>
			</>
		);
	};
	const LoginForm = () => {
		return (
			<>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						placeholder="Email"
						type={"email"}
						value={user.email}
						onChange={(v) => setUser({ ...user, email: v.target.value })}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Password</FormLabel>
					<Input
						placeholder="Password"
						type={"password"}
						value={user.password}
						onChange={(v) => setUser({ ...user, password: v.target.value })}
					/>
				</FormControl>
				<Container
					display={"inline-flex"}
					alignItems={"center"}
					gap={3}
					marginY={2}
					justifyContent={"center"}
				>
					<Text>Don't have an account?</Text>
					<Button
						onClick={() => setForm("register")}
						background={"transparent"}
						textDecoration={"underline"}
					>
						Sign Up
					</Button>
				</Container>
				<Button type="submit" onClick={async () => await submit()}>
					Sign in
				</Button>
			</>
		);
	};

	return (
		<Container
			borderRadius={"10px"}
			marginY={"2rem"}
			boxShadow={"lg"}
			padding={"2rem"}
			centerContent
			gap={3}
		>
			{errorM && errorM.show && <ErrorDetail />}
			<Button onClick={() => signIn("google")} variant={"outline"}>
				Sign in with Google
			</Button>
			<Button
				colorScheme={"facebook"}
				onClick={() => signIn("facebook")}
				variant={"outline"}
			>
				Sign in with Facebook
			</Button>
			<Container centerContent>
				<Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				{form === "login" && LoginForm()}
				{form !== "login" && RegisterForm()}
			</Container>
		</Container>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const error = context.query!.error! || null;
	console.log(error);
	return {
		props: {
			csrfToken: await getCsrfToken(context),
			error: error,
		},
	};
}
