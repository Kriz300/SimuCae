const mongoose = require("mongoose");

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect("mongodb://34.236.172.10:27017/Bancos", dbOptions);

        mongoose.connection.on("connected", () => {
            console.log("Mongoose has successfully connected!");
        });

        mongoose.connection.on("err", err => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("Mongoose connection lost");
        });
    }
}