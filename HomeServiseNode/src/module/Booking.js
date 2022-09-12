const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
  Date:[{date:String}]
});

module.exports = mongoose.model("BookingAvailable", HomeService);
