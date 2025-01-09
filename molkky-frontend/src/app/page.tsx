"use client";

import { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import MatchItem from "./components/MatchItem";
import API from "./utils/api";

interface Match {
	_id: string;
	teams: string[];
	scores: number[];
}

const MatchesPage = () => {
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		// Fetch matches from the backend
		API.get("/matches")
			.then((response) => {
				setMatches(response.data);
			})
			.catch((err) => {
				console.error("Error fetching matches:", err);
			});
	}, []);

  return (
    //TODO Add Custom Match Info Edit Box
		<div>
			<TopBar />
			<div style={{ padding: "70px" }}>
				{matches.map((match) => (
					<MatchItem
						key={match._id}
						isOngoing={!(match.scores[0] === 0 && match.scores[1] === 0)}
						teamA={match.teams[0]}
						teamB={match.teams[1]}
						scoreA={match.scores[0]}
						scoreB={match.scores[1]}
						matchId={match._id} // Pass matchId to MatchItem
					/>
				))}
			</div>
		</div>
	);
};

export default MatchesPage;
