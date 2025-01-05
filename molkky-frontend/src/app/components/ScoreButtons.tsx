interface ScoreButtonsProps {
	onUpdateScore: (team: string) => void;
	teamA: string;
	teamB: string;
}

const ScoreButtons = ({ onUpdateScore, teamA, teamB }: ScoreButtonsProps) => {
	return (
		<div className="flex gap-4 my-6">
			<button
				onClick={() => onUpdateScore(teamA)}
				className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
			>
				Update {teamA}
			</button>
			<button
				onClick={() => onUpdateScore(teamB)}
				className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition"
			>
				Update {teamB}
			</button>
		</div>
	);
};

export default ScoreButtons;
