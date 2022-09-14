const express = require("express");
const { verfiytoken } = require("../middlewere/auth");
const upload = require("../utils/multer");

const app = express();
const {
  BookingAvailable,
  City,
  getcityname,
  availabletime,
  getavailabletime,
  CreBooking,
  getBookingdata,
} = require("../conteroller/Booking");

//post api in create Booking availavle date
app.post(
  "/HomeService/Booking",
  [upload.single("image"), verfiytoken],
  CreBooking
);
app.get("/HomeService/Booking/getbooingdata", getBookingdata);
app.post("/HomeService/Booking/availabletime", availabletime);
app.get("/HomeService/Booking/getavailabletime", getavailabletime);

app.post("/HomeService/Booking/CityName", City);
app.get("/HomeService/Booking/getcityname", getcityname);

module.exports = app;
