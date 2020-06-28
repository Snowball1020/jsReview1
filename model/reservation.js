const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({

    //refered User Model and its objectId as one of documents in Reservation document
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