const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token = req.header("Authorization");
    console.log("Raw Token received in authMiddleware:", token);

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }
        
        console.log("Processed Token:", token); // Log token after removing 'Bearer '

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
