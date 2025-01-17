"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../utils/api";
import io, { Socket } from "socket.io-client";
import PinBoard from "../../components/PinBoard";
import Scoreboard from "../../components/Scoreboard";
import Controls from "../../components/Controls";
import Image from "next/image";
import Swal from "sweetalert2"; // Import sweetalert2
import styles from "./MatchDetail.module.css"; // Import the CSS module

interface MatchHistory {
	team: string;
	pinsHit: number[];
	score: number;
	timestamp: string;
}

interface Match {
	_id: string;
	teams: string[];
	scores: number[];
	history: MatchHistory[];
}

const socket: Socket = io(process.env.NEXT_PUBLIC_API_BASE_URL);

const MatchDetail = () => {
	const [match, setMatch] = useState<Match | null>(null);
	const [selectedPins, setSelectedPins] = useState<number[]>([]);
	const params = useParams();
	const id = params?.id as string;
	const router = useRouter(); // Use the useRouter hook

	useEffect(() => {
		if (!id) return;

		// Fetch match details
		API.get(`/matches/${id}`).then((response) => setMatch(response.data));

		// Listen for real-time updates
		socket.on("scoreUpdated", (data: Match) => {
			if (data._id === id) setMatch(data);
		});

		// Cleanup function
		return () => {
			socket.off("scoreUpdated"); // Remove the specific listener
			socket.disconnect(); // Properly disconnect the socket
		};
	}, [id]);

	const handlePinSelect = (pin: number) => {
		setSelectedPins((prev) =>
			prev.includes(pin) ? prev.filter((p) => p !== pin) : [...prev, pin]
		);
	};

	const handleScoreUpdate = async (team: number) => {
		if (!match) return;

		try {
			const response = await API.put(`/matches/${match._id}`, {
				team,
				pinsHit: selectedPins,
				score:
					selectedPins.length === 1 ? selectedPins[0] : selectedPins.length,
			});

			if (response.data.message) {
				if (response.data.tag === "win") {
					Swal.fire({
						title: "Winner!",
						text: response.data.message,
						icon: "success",
						confirmButtonText: "OK",
					});
				} else {
					const alertTitle = response.data.tag === "bust" ? "Bust" : "3-Miss";
					const alertIcon = response.data.tag === "bust" ? "warning" : "error";
					Swal.fire({
						title: alertTitle,
						text: response.data.message,
						icon: alertIcon,
						confirmButtonText: "OK",
					});
				}
			}
			const updatedMatch = await API.get(`/matches/${match._id}`);
			setMatch(updatedMatch.data);
			setSelectedPins([]);
		} catch (error) {
			console.error("Error updating score:", error);
		}
	};

	const handleUndo = async () => {
		if (!match) return;
		await API.put(`/matches/${match._id}/undo`);
		const response = await API.get(`/matches/${match._id}`);
		setMatch(response.data);
	};

	const handleClear = async () => {
		if (!match) return;
		await API.put(`/matches/${match._id}/clear`);
		const response = await API.get(`/matches/${match._id}`);
		setMatch(response.data);
	};

	if (!match) return <div>Loading...</div>;

	return (
		<div>
			<div className={styles.header}>
				<button onClick={() => router.push("/")} className={styles.backButton}>
					<Image src="/back.png" alt="Back" width={30} height={30} />
				</button>
			</div>
			<PinBoard onPinSelect={handlePinSelect} selectedPins={selectedPins} />
			<Controls
				onUndo={handleUndo}
				onClear={handleClear}
				onScoreUpdate={handleScoreUpdate}
				teams={match.teams}
			/>
			<Scoreboard
				teams={match.teams}
				scores={match.scores}
				history={match.history}
			/>
		</div>
	);
};

export default MatchDetail;
