const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
    serviceid:{type:String, trim: true ,unique: true},
    servicename: { type: String, trim: true ,unique: true},
    url: { type: String },
    decription: { type: String, trim: true },
  });
  module.exports = mongoose.model("service", HomeService);