const express = require("express");
const router = express.Router();
const nearbyyController = require("../controllers/nearbyyController");

router.post("/", nearbyyController.getContextResponse);

module.exports = router;
