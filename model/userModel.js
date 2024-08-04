const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: [20, 'Name must be less than 20 char'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'password is required'],
        mainLength: [8, 'minimum length of a password should be 8 char']
    }
},{timestamps:true}) 

module.exports = mongoose.model("User", userSchema);