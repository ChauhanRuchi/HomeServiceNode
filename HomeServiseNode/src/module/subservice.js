const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
  subserviceid:{type:Number,trim:true,unique: true},
  servicename: { type: String, trim: true },
  subservicename: { type: String, trim: true },
  url: { type: String },
  decription: { type: String, trim: true },
  adminname: { type: String, trim: true },
});

module.exports = mongoose.model("subservice", HomeService);
