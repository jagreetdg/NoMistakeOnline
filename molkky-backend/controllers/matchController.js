const Match = require("../models/Match");

// Fetch all matches
exports.getMatches = async (req, res) => {
	try {
		const matches = await Match.find();
		res.json(matches);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Fetch a single match by ID
exports.getMatchById = async (req, res) => {
	try {
		const match = await Match.findById(req.params.id);
		if (!match) return res.status(404).json({ message: "Match not found" });
		res.json(match);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Update a match
exports.updateMatch = async (req, res) => {
	try {
		const { id } = req.params;
		const { team, pinsHit, score } = req.body;

		const match = await Match.findById(id);
		if (!match) return res.status(404).json({ message: "Match not found" });

		match.history.push({ team, pinsHit, score });
		match.scores[team] += score;

		await match.save();
		res.json(match);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
