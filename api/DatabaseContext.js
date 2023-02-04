const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.DB_URI;

mongoose.set("strictQuery", false);
const ConnectToDatabase = () => {
    mongoose.connect(dbURI, () => {
        console.log("Connected to mongo successfully");
    })
};

module.exports = ConnectToDatabase;