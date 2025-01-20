const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String }, // Optional
}, { timestamps: true });

// Use the `mongoose.models` object to prevent overwriting the model
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
