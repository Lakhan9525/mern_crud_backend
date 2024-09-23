// const mongoose = require("mongoose")

// const connection = mongoose.connect("")

// module.exports = connection;

const mongoose = require("mongoose");
require('dotenv').config();

const connection = mongoose.connect(process.env.MONGO_URL);

module.exports = connection;