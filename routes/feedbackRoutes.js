const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.get("/:id", feedbackController.getFeedbackByUserId);

module.exports = router;
