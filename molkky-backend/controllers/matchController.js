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

		if (match.scores[team] + score > 50) {
			pinsHit.push(-1 * match.scores[team]);
			match.scores[team] = 25;
		} else {
			match.scores[team] += score;
		}

		match.history.push({ team, pinsHit, score });

		//TODO Set Win Condition

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

		if (lastAction.pinsHit.length == 0) {
			return res.status(500).json({ error: "Pins Hit cannot be zero" });
		}

		const lastPin = lastAction.pinsHit[lastAction.pinsHit.length - 1];
		if (lastPin < 0) {
			match.scores[lastAction.team] = -1 * lastPin;
		} else {
			match.scores[lastAction.team] -= lastAction.score;
		}

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
