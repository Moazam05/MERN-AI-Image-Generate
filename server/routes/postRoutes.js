const express = require("express");
// Custom Imports
const postController = require("../controllers/postController");

const router = express.Router();

// ROUTES
router.post("/", postController.createPost);

module.exports = router;
