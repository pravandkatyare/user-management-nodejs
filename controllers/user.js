const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const mongoose = require('mongoose');

// @desc Get all users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users) {
        console.log("User not found", req.params.id);
        return res.status(404).json({ error: "No users found" });
    }

    const userList = users.map((user) => (
        { id: user._id, name: user.name, email: user.email, phone: user.phone }));

    res.status(200).json({ data: userList });
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Public
const getUserById = asyncHandler(async (req, res) => {
    if (!validateID(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    console.log("searching user by id", req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) {
        console.log("User not found", req.params.id);
        return res.status(404).json({ error: "User not found" });
    }

    console.log("user found", req.params.id);
    res.status(200).json({data: { name: user.name, email: user.email, phone: user.phone }});
});


// @desc Update user
// @route PUT /api/users/:id
// @access Public
const updateUser = asyncHandler(async (req, res) => {
    if (!validateID(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    
    console.log("searching user by id for updation", req.params.id);
    
    const { name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });
    if (!user) {
        console.log("User not found", req.params.id);
        return res.status(404).json({ error: "User not found" });
    }

    console.log("user found and updated", req.params.id);
    res.status(200).json({data: { id: user._id, name: user.name, email: user.email, phone: user.phone }});
});


// @desc Delete user
// @route DELETE /api/users/:id
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
    if (!validateID(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    console.log("searching user by id for deletion", req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        console.log("User not found", req.params.id);
        return res.status(404).json({ error: "User not found" });
    }

    console.log("user found and deleted", req.params.id);
    res.status(200).json({ data: { message: "User deleted", id: req.params.id } });
});

const validateID = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};


module.exports = { getUsers, getUserById, updateUser, deleteUser };