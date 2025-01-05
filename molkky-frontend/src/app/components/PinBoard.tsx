import React from "react";
import styles from "./PinBoard.module.css";

interface PinBoardProps {
	onPinSelect: (pin: number) => void;
	selectedPins: number[];
}

const pinLayout = [
	[7, 9, 8],
	[5, 11, 12, 6],
	[3, 10, 4],
	[1, 2],
];

const PinBoard: React.FC<PinBoardProps> = ({ onPinSelect, selectedPins }) => {
	return (
		<div className={styles.board}>
			{pinLayout.map((row, rowIndex) => (
				<div key={rowIndex} className={styles.row}>
					{row.map((pin) => (
						<button
							key={pin}
							className={`${styles.pin} ${
								selectedPins.includes(pin) ? styles.selected : ""
							}`}
							onClick={() => onPinSelect(pin)}
						>
							{pin}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default PinBoard;
