const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {type: String, unique:[true, "Name already taken"], required: [true, "Name is required"]},
    email: {type: String, unique: [true, "Email address already taken"], required: [true, "Email address is required"]},
    password: {type: String, required:[true, "Password is required"]},
    photoURL: {type: String },
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", schema);

module.exports = UserModel;