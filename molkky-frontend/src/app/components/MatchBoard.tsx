"use client";

interface MatchBoardProps {
	selectedPins: number[];
	togglePinSelection: (pin: number) => void;
}

const MatchBoard = ({ selectedPins, togglePinSelection }: MatchBoardProps) => {
	return (
		<div className="molkky-board my-8">
			<div className="grid gap-2">
				{[[1], [2, 3], [4, 5, 6], [7, 8, 9, 10], [11, 12]].map(
					(row, rowIndex) => (
						<div key={rowIndex} className="flex justify-center gap-4">
							{row.map((pin) => (
								<div
									key={pin}
									onClick={() => togglePinSelection(pin)}
									className={`w-12 h-12 flex items-center justify-center rounded-full border-2 cursor-pointer ${
										selectedPins.includes(pin)
											? "bg-blue-500 text-white"
											: "bg-white"
									} shadow-md hover:bg-blue-200`}
								>
									{pin}
								</div>
							))}
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default MatchBoard;
