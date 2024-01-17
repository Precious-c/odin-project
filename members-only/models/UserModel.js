const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    membershipStatus: { type: String, default: "unverified", enum: ["verified", "unverified"]},
    isAdmin: { type: Boolean, default: false },
    posts: { type: Array }
})

module.exports = mongoose.model('User', UserSchema)