const express = require("express");
const router = express.Router();
const nearbyyController = require("../controllers/nearbyyController");

router.post("/", nearbyyController.getContextResponse);
router.post("/upload", nearbyyController.uploadFiles);

module.exports = router;
