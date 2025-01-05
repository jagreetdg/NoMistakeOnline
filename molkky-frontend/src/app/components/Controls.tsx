import React from "react";
import styles from "./Controls.module.css";

interface ControlsProps {
	onUndo: () => void;
  onScoreUpdate: (team: 0 | 1) => void;
  onClear: () => void;
  teams: string[];
}

const Controls: React.FC<ControlsProps> = ({ onUndo, onScoreUpdate,onClear, teams }) => {
	return (
		<div className={styles.controls}>
			<button className={`${styles.undo} ${styles.button}`} onClick={onUndo}>
				Undo
			</button>
			<button
				className={`${styles.teamA} ${styles.button}`}
				onClick={() => onScoreUpdate(0)}
			>
				{teams[0]} +
			</button>
			<button
				className={`${styles.teamB} ${styles.button}`}
				onClick={() => onScoreUpdate(1)}
			>
				{teams[1]} +
			</button>
			<button
				className={`${styles.clear} ${styles.button}`}
				onClick={onClear}
			>
				Clear
			</button>
		</div>
	);
};

export default Controls;
