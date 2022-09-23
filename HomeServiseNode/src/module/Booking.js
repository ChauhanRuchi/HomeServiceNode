const { mongoose } = require("../db/mongoos");

const HomeService = mongoose.Schema({
 name:{type:String,trim:true},
 contactnumber:{type:String,trim:true},
 billingaddress:{type:String,trim:true},
 deliveryadress:{type:String,trim:true},
 city:{type:String,trim:true},
 date:{type:String,trim:true},
 time:{type:String,trim:true},
  charge:{type:String,trim:true},
 status:{type:String,trim:true},
 servicename:{type:String,trim:true},
});

module.exports = mongoose.model("Booking", HomeService);
