const express = require("express");
const router = express.Router();
const nearbyyController = require("../controllers/nearbyyController");

router.get("/", nearbyyController.getContextResponse);

module.exports = router;
