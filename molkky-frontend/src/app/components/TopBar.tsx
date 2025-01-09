import React from "react";
import Image from "next/image";
import styles from "./TopBar.module.css";

const TopBar = () => {
  return (
		<div className={styles.topBar}>
			<Image
				src="/logo.png"
				alt="Logo"
				className={styles.logo}
				width={50}
				height={50}
			/>
			<span className={styles.title}>NoMistake Online</span>
		</div>
	);
};

export default TopBar;
