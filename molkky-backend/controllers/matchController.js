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

// Undo the last action
exports.undoLastAction = async (req, res) => {
	try {
		const { id } = req.params;

		const match = await Match.findById(id);
		if (!match) return res.status(404).json({ message: "Match not found" });

		const lastAction = match.history.pop();
		if (!lastAction)
			return res.status(400).json({ message: "No actions to undo" });

		match.scores[lastAction.team] -= lastAction.score;

		await match.save();
		res.json(match);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Clear the entire history and reset scores
exports.clearHistory = async (req, res) => {
	try {
		const { id } = req.params;

		const match = await Match.findById(id);
		if (!match) return res.status(404).json({ message: "Match not found" });

		match.history = [];
		match.scores = [0, 0]; // Reset scores to 0

		await match.save();
		res.json(match);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
