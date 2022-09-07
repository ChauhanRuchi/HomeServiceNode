const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
  email: { type: String, trim: true },
  password: { type: String, trim: true },
});

module.exports = mongoose.model("Admin", HomeService);
