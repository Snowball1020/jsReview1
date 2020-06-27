const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    location: {
        type: String,
        required: true
    },
    numberOfCustomer: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    }



}, {
        timestamps: true
    })

module.exports = mongoose.model("Reservation", ReservationSchema)