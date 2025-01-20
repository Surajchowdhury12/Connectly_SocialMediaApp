const express = require('express');
const {
    registerUser,
    loginUser,
    getUserDetails,
    updateProfilePic, // Import the profile picture update function
} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getUserDetails);

// New route to update profile picture
router.post('/update-profile-pic', verifyToken, updateProfilePic);

module.exports = router;
