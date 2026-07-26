const express = require("express");
const router = express.Router();

const { generatePDFSummary } = require("../controllers/summaryController");

router.post("/generate", generatePDFSummary);

module.exports = router;