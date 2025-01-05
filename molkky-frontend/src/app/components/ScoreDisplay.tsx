interface ScoreDisplayProps {
	teamA: string;
	teamB: string;
	scoreA: number;
	scoreB: number;
}

const ScoreDisplay = ({ teamA, teamB, scoreA, scoreB }: ScoreDisplayProps) => {
	return (
		<div className="flex gap-8 text-lg font-semibold mb-6">
			<p>
				{teamA} Score: {scoreA}
			</p>
			<p>
				{teamB} Score: {scoreB}
			</p>
		</div>
	);
};

export default ScoreDisplay;
