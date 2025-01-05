const express = require("express");
const {
	getMatches,
	updateMatch,
	getMatchById,
	undoLastAction, // Import the new controller function
} = require("../controllers/matchController");
const router = express.Router();

router.get("/matches", getMatches);
router.get("/matches/:id", getMatchById);
router.put("/matches/:id", updateMatch);
router.put("/matches/:id/undo", undoLastAction); // Add the new route

module.exports = router;
