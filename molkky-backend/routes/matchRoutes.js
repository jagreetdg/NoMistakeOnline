const express = require("express");
const {
	getMatches,
	updateMatch,
	getMatchById,
} = require("../controllers/matchController");
const router = express.Router();

router.get("/matches", getMatches);
router.get("/matches/:id", getMatchById);
router.put("/matches/:id", updateMatch);

module.exports = router;
