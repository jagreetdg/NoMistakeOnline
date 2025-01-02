const mongoose = require("mongoose");
const Match = require("../models/Match");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const seedDatabase = async () => {
	try {
		const uri = process.env.MONGO_URI;
		if (!uri) throw new Error("MONGO_URI is not defined in .env");

		// Connect to MongoDB Atlas
		await mongoose.connect(uri);

		console.log("✅ Connected to MongoDB Atlas");

		// Clear existing data
		await Match.deleteMany({});

		// Add default matches
		await Match.insertMany([
			{
				teams: ["Team A", "Team B"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["Team C", "Team D"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["Team E", "Team F"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["Team G", "Team H"],
				scores: [0, 0],
				history: [],
			},
		]);

		console.log("✅ Database successfully seeded!");
		process.exit(0);
	} catch (err) {
		console.error("❌ Error seeding database:", err);
		process.exit(1);
	}
};

seedDatabase();
