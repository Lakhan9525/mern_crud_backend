const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
    name: String,
    age: Number,
    image: String,  // This could be a URL to an image or a file path
    city: String,
});

const ShopModel = mongoose.model("admin", shopSchema);

module.exports = ShopModel;
