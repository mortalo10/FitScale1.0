const mongoose = require("mongoose");

const alimento = mongoose.model(
    "alimento",
    new mongoose.Schema({
        name: String
    })
);

module.exports = alimento;