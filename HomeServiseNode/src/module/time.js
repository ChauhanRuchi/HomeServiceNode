const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
  time: { type: String, trim: true },
});

module.exports = mongoose.model("Time", HomeService);