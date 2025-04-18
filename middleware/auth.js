const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateToken = asyncHandler(async (req, res, next) => {
    let token = req.headers["authorization"];

    // Check if token is in the request headers
    if (token && token.startsWith("Bearer")) {
        token = token.split(" ")[1];
    }

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Check if the user exists in the database
        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Attach user information to the request object
        req.user = decoded.user;
        // Proceed to the next middleware or route handler
        next();
    });
});

module.exports = validateToken;