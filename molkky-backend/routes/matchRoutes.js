const express = require("express");
const { getMatches, updateMatch } = require("../controllers/matchController");
const router = express.Router();

router.get("/matches", getMatches);
router.put("/matches/:id", updateMatch);

module.exports = router;
