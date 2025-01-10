import styles from "./MatchItem.module.css";
import { useRouter } from "next/navigation";

interface MatchItemProps {
	isOngoing: boolean;
	teamA: string;
	teamB: string;
	scoreA: number;
	scoreB: number;
	matchId: string; // Added matchId to navigate to the specific match
}

const MatchItem = ({
	isOngoing,
	teamA,
	teamB,
	scoreA,
	scoreB,
	matchId,
}: MatchItemProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/matches/${matchId}`);
	};

	return (
		<div className={styles.matchItem} onClick={handleClick}>
			<div
				className={`${styles.indicator} ${
					isOngoing ? styles.ongoing : styles.finished
				}`}
			></div>
			<div className={styles.details}>
				<div className={styles.teams}>
					{teamA} vs {teamB}
				</div>
				<div className={styles.scores}>
					{scoreA} - {scoreB}
				</div>
			</div>
		</div>
	);
};

export default MatchItem;
