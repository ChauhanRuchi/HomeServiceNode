const mongoose = require("mongoose");
const dontenv = require("dotenv");
dontenv.config();
mongoose.connect(process.env.MONGO_URL);

module.exports = { mongoose };
