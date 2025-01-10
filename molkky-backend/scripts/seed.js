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
				teams: ["A", "B"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["C", "D"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["E", "F"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["G", "H"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["I", "J"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["K", "L"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["M", "N"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["O", "P"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["Q", "R"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["S", "T"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["U", "V"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["W", "X"],
				scores: [0, 0],
				history: [],
			},
			{
				teams: ["Y", "Z"],
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
