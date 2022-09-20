const jsonwebtoken = require("jsonwebtoken");
const Booking = require("../module/Booking");
const city = require("../module/city");
const time = require("../module/time");

let result = "";
let data = "";

const getBookingdata = async (req, res) => {
  try {
    let getdata = await Booking.find();
    if (getdata == null) {
      res.status(400).send("data not found..");
    } else {
      res.status(200).send(getdata);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const CreBooking = async (req, res) => {
  try {
    console.log(req.body)
    jsonwebtoken.verify(req.token, "screatekey", async (err, authdata) => {

      if (req.body.name == "" || req.body.name == undefined) {
        res.status(400).send("please enter your name");
      } else if (req.body.number == "" || req.body.number == undefined) {
        res.status(400).send("please enter your contact number");
      } else if (
        req.body.billingaddress == "" ||
        req.body.billingaddress == undefined
      ) {
        res.status(400).send("please enter your billing address");
      } else if (
        req.body.deliveryadress == "" ||
        req.body.deliveryadress == undefined
      ) {
        res.status(400).send("please enter your delivery address");
      } else if (req.body.city == "" || req.body.city == undefined) {
        res.status(400).send("please select city ");
      } else if (req.body.date == "" || req.body.date == undefined) {
        res.status(400).send("please select delivery date");
      } else if (req.body.time == "" || req.body.time == undefined) {
        res.status(400).send("please select delivery time");
      } else {
        data = new Booking({
          name: req.body.name,
          contactnumber: req.body.number,
          billingaddress: req.body.billingaddress,
          deliveryadress: req.body.deliveryadress,
          city: req.body.city,
          date: req.body.date,
          time: req.body.time,
        });
        result = await data
          .save()
          .then((result) => res.status(200).send(data))
          .catch((err) => res.status(400).send({ mes: "no date available.." }));
      }
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const City = async (req, res) => {
  try {
    if (req.body.name == undefined || req.body.name == "") {
      res.status(400).send("please enter cityname");
    } else {
      data = new city({
        name: req.body.name,
      });
      result = await data
        .save()
        .then((result) => res.status(200).send(data))
        .catch((err) => res.status(400).send({ mes: "no date available.." }));
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getcityname = async (req, res) => {
  try {
    let getname = await city.find();
    if (getname == null) {
      res.status(400).send("service not found..");
    } else {
      res.status(200).send(getname);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const availabletime = async (req, res) => {
  try {
    if (req.body.time == undefined || req.body.time == "") {
      res.status(400).send("please enter time");
    } else {
      data = new time({
        time: req.body.time,
      });
      result = await data
        .save()
        .then((result) => res.status(200).send(data))
        .catch((err) => res.status(400).send({ mes: "no date available.." }));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getavailabletime = async (req, res) => {
  try {
    let gettime = await time.find();
    if (gettime == null) {
      res.status(400).send("not available time..");
    } else {
      res.status(200).send(gettime);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
 getBookingdata,
  CreBooking,
  City,
  getcityname,
  availabletime,
  getavailabletime,
};
