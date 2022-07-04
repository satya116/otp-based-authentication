const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const demoClassSchema = new Schema({
    phone: String,
    name: String,
    grade: String
})


module.exports = mongoose.model('demoClassRequest', demoClassSchema )