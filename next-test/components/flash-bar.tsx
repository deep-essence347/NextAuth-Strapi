import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const MESSAGE_STATUS = {
	success: "success",
	error: "error",
	info: "info",
	warning: "warning",
	loading: "loading",
};

/**
 *
 * @param message: Message to display
 * @param status: "info" | "warning" | "success" | "error" | "loading" | undefined
 * @default "info"
 * @param setMessage: message state update Function
 * @returns React.Component
 */
export function AutoFadeAlert({
	message,
	status,
	setMessage,
}: {
	message: string | string[] | null;
	status: any;
	setMessage: Function;
}) {
	const [showAlert, setShowAlert] = useState(true);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setShowAlert(false);
			setMessage(null);
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<>
			{message && showAlert && (
				<Box
					position="fixed"
					bottom={"20px"}
					left={0}
					right={0}
					display="flex"
					justifyContent="center"
				>
					{/* <Box width={"40%"} bgColor={status.bg} padding={8} borderRadius={10}> */}
					<Alert
						status={status}
						variant="solid"
						width={"fit-content"}
						borderRadius="10px"
					>
						<AlertIcon />
						{/* <AlertTitle>{title}</AlertTitle> */}
						<AlertDescription fontWeight="medium">{message}</AlertDescription>
					</Alert>
				</Box>
				// </Box>
			)}
		</>
	);
}
