const express = require('express');
const {
    registerUser,
    loginUser,
    getUserDetails,
    updateProfilePic,
} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig'); // Import multer configuration

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getUserDetails);

// ✅ Use Multer middleware for profile picture upload
router.post('/update-profile-pic', verifyToken, upload.single('profilePic'), updateProfilePic);

module.exports = router;
