const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
  name: { type: String, trim: true },
  pincode:{type:String,trim:true}
});

module.exports = mongoose.model("CityName", HomeService);