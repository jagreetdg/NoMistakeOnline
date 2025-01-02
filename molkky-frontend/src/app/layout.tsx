"use client";

import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

// Define the types for socket events
interface ServerToClientEvents {
	scoreUpdated: (data: { matchId: string; scores: number[] }) => void;
}

interface ClientToServerEvents {
	updateScore: (matchId: string, scores: number[]) => void;
}

// Create a typed Socket instance
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	"http://localhost:5000"
);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		socket.on("scoreUpdated", (data) => {
			console.log("Score updated:", data.matchId, data.scores);
		});

		return () => {
			socket.off("scoreUpdated");
		};
	}, []);

	return (
		<html lang="en">
			<head>
				<title>Mölkky Scoreboard</title>
				<meta name="description" content="Real-time Mölkky scoreboard app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body>{children}</body>
		</html>
	);
}
