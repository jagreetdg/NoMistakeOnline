"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../utils/api";
import io, { Socket } from "socket.io-client";

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
	const params = useParams();
	const id = params?.id as string;

	useEffect(() => {
		if (!id) return;

		// Fetch match details
		API.get(`/matches/${id}`)
			.then((response) => {
				setMatch(response.data);
			})
			.catch((err) => {
				console.error("Error fetching match:", err);
			});

		// Listen for real-time updates
		socket.on("scoreUpdated", (data: Match) => {
			if (data._id === id) {
				setMatch(data);
			}
		});

		return () => {
			socket.disconnect();
		};
	}, [id]);

	const handleUpdateScore = async (team: string, pinsHit: number[]) => {
		if (!match) return;

		const score = pinsHit.reduce((total, pin) => total + pin, 0);

		try {
			const updatedMatch = await API.put(`/matches/${match._id}`, {
				team,
				pinsHit,
				score,
			});
			socket.emit("updateScore", updatedMatch.data);
		} catch (err) {
			console.error("Error updating score:", err);
		}
	};

	if (!match) return <div>Loading...</div>;

	return (
		<div className="match-detail">
			<div className="board">
				<div className="board-grid">
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="pin">
							{i + 1}
						</div>
					))}
				</div>
			</div>
			<div className="sidebar">
				<h2>
					{match.teams[0]} vs {match.teams[1]}
				</h2>
				<p>
					{match.teams[0]} Score: {match.scores[0]}
				</p>
				<p>
					{match.teams[1]} Score: {match.scores[1]}
				</p>

				<div className="history">
					<h3>History</h3>
					<ul>
						{match.history.map((entry, index) => (
							<li key={index}>
								{entry.team} scored {entry.score} by hitting pins{" "}
								{entry.pinsHit.join(", ")} at{" "}
								{new Date(entry.timestamp).toLocaleTimeString()}
							</li>
						))}
					</ul>
				</div>

				<div>
					<button onClick={() => handleUpdateScore(match.teams[0], [1, 2, 3])}>
						Update Score for {match.teams[0]}
					</button>
					<button onClick={() => handleUpdateScore(match.teams[1], [4, 5, 6])}>
						Update Score for {match.teams[1]}
					</button>
				</div>
			</div>
		</div>
	);
};

export default MatchDetail;
