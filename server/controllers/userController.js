const User = require('../models/User'); // Assuming you have a User schema in models/userModel
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens

// Controller to register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to log in a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Respond with token and profile data
        return res.status(200).json({
            message: "Logged in successfully",
            token,
            profilePic: user.profilePic,
        });
    } catch (err) {
        console.error("Error in loginUser:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Controller to fetch user details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // `req.user` comes from authentication middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateProfilePic = async (req, res) => {
    const userId = req.user.id; // Extract user ID from the token
    const { profilePic } = req.body;

    if (!profilePic) {
        return res.status(400).json({ message: "Profile picture URL is required" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { profilePic },
            { new: true } // Return the updated user object
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile picture updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile picture", error });
    }
};
