const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({

    phone: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        default: "satya116",
        required: false
    } ,
    name: {
        type: String,
        default: "gem_116",
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    courses: {
        type: Array,
        required: false,
    }

},
{
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;