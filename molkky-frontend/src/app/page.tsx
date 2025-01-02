"use client";

import { useEffect, useState } from "react";
import API from "./utils/api";
import MatchGrid, { Match } from "./components/MatchGrid";

const Page = () => {
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		API.get("/matches")
			.then((response) => {
				setMatches(response.data);
			})
			.catch((err) => {
				console.error("Error fetching matches:", err);
			});
	}, []);

	return (
		<div className="container">
			<h1>Mölkky Scoreboard</h1>
			<MatchGrid matches={matches} />
		</div>
	);
};

export default Page;
