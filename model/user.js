const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new mongoose.Schema({


    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }


}, {
        timestamps: true
    })


//virtual fullname
UserSchema.virtual("fullName")
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    });

module.exports = mongoose.model("User", UserSchema)

