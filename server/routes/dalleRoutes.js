const express = require("express");
// Custom Imports
const dalleController = require("../controllers/dalleController");

const router = express.Router();

// ROUTES
// api working routes
router.get("/", dalleController.getDalle);
router.post("/", dalleController.createImageDalle);

module.exports = router;
