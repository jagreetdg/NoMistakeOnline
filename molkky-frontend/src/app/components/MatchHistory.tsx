interface HistoryEntry {
	team: string;
	pinsHit: number[];
	score: number;
	timestamp: string;
}

interface MatchHistoryProps {
	history: HistoryEntry[];
	teamA: string;
	teamB: string;
}

const MatchHistory = ({ history, teamA, teamB }: MatchHistoryProps) => {
	return (
		<div className="w-full max-w-4xl mt-8 bg-white rounded-lg shadow-md overflow-hidden">
			<h2 className="text-xl font-bold text-center p-4 bg-gray-200">
				Match History
			</h2>
			<div className="overflow-x-auto">
				<table className="w-full text-center">
					<thead>
						<tr>
							<th className="p-2 border-b">{teamA}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="p-2 border-b">
								{history
									.filter((h) => h.team === teamA)
									.map((entry, index) => (
										<span key={index} className="mx-1">
											{entry.score}
										</span>
									))}
							</td>
						</tr>
						<tr>
							<th className="p-2 border-b">{teamB}</th>
						</tr>
						<tr>
							<td className="p-2">
								{history
									.filter((h) => h.team === teamB)
									.map((entry, index) => (
										<span key={index} className="mx-1">
											{entry.score}
										</span>
									))}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MatchHistory;
