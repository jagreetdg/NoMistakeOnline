"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../utils/api";
import io, { Socket } from "socket.io-client";

import MatchBoard from "../../components/MatchBoard";
import ScoreButtons from "../../components/ScoreButtons";
import ScoreDisplay from "../../components/ScoreDisplay";
import MatchHistory from "../../components/MatchHistory";

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

const socket: Socket = io("http://localhost:5000");

const MatchDetail = () => {
	const [match, setMatch] = useState<Match | null>(null);
	const [selectedPins, setSelectedPins] = useState<number[]>([]);
	const params = useParams();
	const id = params?.id as string;

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

	const togglePinSelection = (pin: number) => {
		setSelectedPins((prev) =>
			prev.includes(pin) ? prev.filter((p) => p !== pin) : [...prev, pin]
		);
	};

	const handleUpdateScore = async (team: string) => {
		if (!match || selectedPins.length === 0) return;

		await API.put(`/matches/${match._id}`, {
			team,
			pinsHit: selectedPins,
			score: selectedPins.reduce((sum, pin) => sum + pin, 0),
		});
		socket.emit("updateScore", match);
		setSelectedPins([]);
	};

	if (!match) return <div>Loading...</div>;

	return (
		<div>
			<ScoreDisplay
				teamA={match.teams[0]}
				teamB={match.teams[1]}
				scoreA={match.scores[0]}
				scoreB={match.scores[1]}
			/>
			<MatchBoard
				selectedPins={selectedPins}
				togglePinSelection={togglePinSelection}
			/>
			<ScoreButtons
				onUpdateScore={handleUpdateScore}
				teamA={match.teams[0]}
				teamB={match.teams[1]}
			/>
			<MatchHistory
				history={match.history}
				teamA={match.teams[0]}
				teamB={match.teams[1]}
			/>
		</div>
	);
};

export default MatchDetail;
