const express = require("express");
const {
	getMatches,
	updateMatch,
	getMatchById,
	undoLastAction,
	clearHistory, // Import the new controller function
} = require("../controllers/matchController");
const router = express.Router();

router.get("/matches", getMatches);
router.get("/matches/:id", getMatchById);
router.put("/matches/:id", updateMatch);
router.put("/matches/:id/undo", undoLastAction);
router.put("/matches/:id/clear", clearHistory); // Add the new route

module.exports = router;
