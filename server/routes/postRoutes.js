const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Import the token verification middleware
const { createPost, getPosts } = require('../controllers/postController');

// Apply the token verification middleware to the createPost route
router.post('/', verifyToken, createPost);

router.get('/', verifyToken, getPosts);

module.exports = router;
