const mongoose = require('mongoose');

const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD

const dbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@edtech-ts.dl76w.mongodb.net/?retryWrites=true&w=majority`

const dbconnect = async () => {
    try {
        await mongoose.connect(dbUrl, ()=> console.log(`database is connected successfully`));
    } catch (error) {
        console.log('Database connection failed', error);
    }
}

module.exports = dbconnect