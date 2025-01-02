const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
	{
		teams: { type: [String], required: true },
		scores: { type: [Number], default: [0, 0] },
		history: [
			{
				team: String,
				pinsHit: [Number],
				score: Number,
				timestamp: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
