const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: { type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    company: String
});

module.exports = mongoose.model("products", productSchema);
