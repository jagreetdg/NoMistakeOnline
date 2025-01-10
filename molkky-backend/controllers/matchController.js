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
			match.history.push({ team, pinsHit, score });
			await match.save();
			return res.status(200).json({
				tag: "bust",
				message: `${match.teams[team]} has gone over 50 points and their score has been reset to 25!`,
			});
		}

		match.scores[team] += score;
		match.history.push({ team, pinsHit, score });

		if (match.scores[team] === 50) {
			const winningTeam = match.teams[team];

			// End the game by calling clearHistory without sending a response
			await exports.clearHistory(req, res, false);
			return res.status(200).json({
				tag: "win",
				message: `${winningTeam} has won the game!`,
			});
		}

		// Check if pinsHit has at least 3 elements and if the last 3 elements are 0
		if (
			match.history.length >= 3 &&
			match.history.slice(-3).every((entry) => entry.pinsHit.length === 0)
		) {
			const losingTeam = match.teams[team];

			// End the game by calling clearHistory without sending a response
			await exports.clearHistory(req, res, false);
			return res.status(200).json({
				tag: "3miss",
				message: `${losingTeam} has lost the game!`,
			});
		}

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
exports.clearHistory = async (req, res, sendResponse = true) => {
	try {
		const { id } = req.params;

		const match = await Match.findById(id);
		if (!match) return res.status(404).json({ message: "Match not found" });

		match.history = [];
		match.scores = [0, 0]; // Reset scores to 0

		await match.save();
		if (sendResponse) {
			res.json(match);
		}
	} catch (err) {
		if (sendResponse) {
			res.status(500).json({ error: err.message });
		}
	}
};
