
const jsonwebtoken = require("jsonwebtoken");
const Booking = require("../module/Booking");
let result = "";

const BookingAvailable = async (req, res) => {
    try {
      if (req.body.Date === ""||req.body.Date==undefined) {
        res.status(400).send({ mes: "please enter date" });
      }  else {
       
        let data = new Booking({
            Date: req.body.Date,
          });
     
        result = await data
          .save()
          .then((result) => res.status(200).send(data))
          .catch((err) =>
            res.status(400).send({ mes: "no date available.." })
          );
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
const getAvailableDate=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }

}
  module.exports={BookingAvailable,getAvailableDate}