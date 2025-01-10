import React from "react";
import styles from "./Scoreboard.module.css";

interface ScoreboardProps {
	teams: string[];
	scores: number[];
	history: { team: string; score: number; pinsHit: number[] }[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ teams, scores, history }) => {
	//TODO Add Miss Counter Indicator
  return (
		<div className={styles.scoreboard}>
			<table className={styles.table}>
        <thead>
					<tr>
						<th>{teams[0]}</th>
						<th>{teams[1]}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{scores[0]}</td>
						<td>{scores[1]}</td>
					</tr>
					<tr>
						<td>
							<div className={styles.scrollableWrapper}>
								<div className={styles.scrollable}>
									{history
										.filter((entry) => entry.team === "0")
										.reverse() // Reverse the order to show newest on top
										.map((entry, index) => (
											<div key={index} className={styles.historyItem}>
												{entry.score}
											</div>
										))}
								</div>
							</div>
						</td>
						<td>
							<div className={styles.scrollableWrapper}>
								<div className={styles.scrollable}>
									{history
										.filter((entry) => entry.team === "1")
										.reverse() // Reverse the order to show newest on top
										.map((entry, index) => (
											<div key={index} className={styles.historyItem}>
												{entry.score}
											</div>
										))}
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Scoreboard;
