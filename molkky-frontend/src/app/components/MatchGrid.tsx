"use client";

import React from "react";
import Link from "next/link";

export interface Match {
	_id: string;
	teams: string[];
	scores: number[];
}

interface MatchGridProps {
	matches: Match[];
}

const MatchGrid: React.FC<MatchGridProps> = ({ matches }) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			{matches.map((match) => (
				<div
					key={match._id}
					className="match-card p-4 border rounded-md shadow-md"
				>
					<h3>{match.teams.join(" vs ")}</h3>
					<p>
						Score: {match.scores[0]} - {match.scores[1]}
					</p>
					<Link href={`/matches/${match._id}`}>
						<a className="text-blue-500">View Details</a>
					</Link>
				</div>
			))}
		</div>
	);
};

export default MatchGrid;
