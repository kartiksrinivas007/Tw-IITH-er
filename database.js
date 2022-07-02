const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        //mongoose.connect('mongodb://localhost:27017/TwitterClone')
        mongoose.connect("mongodb+srv://admin:mongodbpassword@twitterclonecluster.jyzjns2.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
            console.log("Connected to TwitterClone database...");
        })
        .catch((err) => {
            console.log("Error while connecting to TwitterClone database: " + err);
        })
    }
}

module.exports = new Database();