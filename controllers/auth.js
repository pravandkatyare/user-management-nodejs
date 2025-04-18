const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password) {
        return res.status(400).json({ error: "Please add all fields: name, email, phone, password" });
    }

    const isValid = validateUserDetails(req.body.name, req.body.email, req.body.phone, req.body.password);
    if (!isValid) {
        return isValid;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    const encryptPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptPassword;

    // Register user
    const newUser = await User.create(req.body);
    if (!newUser) {
        return res.status(400).json({ error: "User registration failed" });
    }

    res.status(201).json({id: newUser._id, name: newUser.name });
});

// @desc login user
// @route POST /api/users/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ error: "No user found" });
    }
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!user || !isMatched) {
        return res.status(401).json({"error": "Invalid email or password" });
    }
    // Generate token (assuming you have a method to generate JWT token)
    const token = jwt.sign({ 
        user:{
            id: user._id, 
            name: user.name, 
            email: user.email,
        },
    }, process.env.JWT_SECRET, { expiresIn: '5m' });
    
    res.status(200).json({accessToken: token});
});

// @desc Get current user
// @route GET /api/users/current
// @access Public
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json(user);
});

// @desc Validate details of the user provided during registration
const validateUserDetails = (name, email, phone, password) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        return res.status(400).json({ error: "Name should be atlest 8 characters, 1 number and 1 special character" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number format" });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Password must be at least 8 characters long, include at least 1 number and 1 special character" });
    }

    return true;
};


module.exports = {registerUser, login, getCurrentUser};