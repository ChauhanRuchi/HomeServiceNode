const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
  serviceid:{type:String,trim:true},
  mainservice:{type:String,trim:true},
  servicename: { type: String, trim: true },
  url: { type: String },
  decription: { type: String, trim: true },
  adminname: { type: String, trim: true },
});

module.exports = mongoose.model("subservice", HomeService);
