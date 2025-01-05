import React from "react";
import styles from "./Scoreboard.module.css";

interface ScoreboardProps {
	teams: string[];
	scores: number[];
	history: { team: string; score: number; pinsHit: number[] }[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ teams, scores, history }) => {
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
				</tbody>
			</table>
			<div className={styles.history}>
				<h4>History</h4>
				<div className={styles.historyContainer}>
					<div className={styles.teamLabel}>{teams[0]}</div>
					<div className={styles.scrollableWrapper}>
						<div className={styles.scrollable}>
							<table className={styles.table}>
								<tbody>
									<tr>
										{history
											.filter((entry) => entry.team === "0")
											.map((entry, index) => (
												<td key={index}>{entry.score}</td>
											))}
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className={styles.historyContainer}>
					<div className={styles.teamLabel}>{teams[1]}</div>
					<div className={styles.scrollableWrapper}>
						<div className={styles.scrollable}>
							<table className={styles.table}>
								<tbody>
									<tr>
										{history
											.filter((entry) => entry.team === "1")
											.map((entry, index) => (
												<td key={index}>{entry.score}</td>
											))}
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Scoreboard;
