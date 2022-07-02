const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect('mongodb://localhost:27017/TwitterClone')
        .then(() => {
            console.log("Connected to TwitterClone database...");
        })
        .catch((err) => {
            console.log("Error while connecting to TwitterClone database: " + err);
        })
    }
}

module.exports = new Database();