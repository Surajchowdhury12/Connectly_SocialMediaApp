const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the User model is imported for user validation if needed.

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization'); // Use 'Authorization' header
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        // Verify the token and extract user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded Token:", decoded);

        // Optionally, verify that the user exists in the database
        // const user = await User.findById(decoded.id);
        // if (!user) {
        //     return res.status(401).json({ message: "User not found. Unauthorized access." });
        // }

        req.user = decoded; // Attach the user document to the request object
        next(); // Proceed to the next middleware or route handler
        console.log("Token received in authMiddleware:", token);
        console.log("Decoded token:", jwt.verify(token, process.env.JWT_SECRET));
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
