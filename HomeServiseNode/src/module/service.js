const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
    servicename: { type: String, trim: true ,unique: true},
    url: { type: String },
    decription: { type: String, trim: true },
    public_id:{type:String,trim:true}
  });
  module.exports = mongoose.model("service", HomeService);