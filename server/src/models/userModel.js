const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"please add the user name"],
    },
    email: {
        type: String,
        required: [true,"please add the user email address"],
        unique: [true,"Email address already taken"],
    },
    password: {
        type: String,
        required: [true,"please add the user password"],
    },
    role: {
        type: String,
        required: [true,"please add the user role"],
    }
})

module.exports = mongoose.model("users", schema);