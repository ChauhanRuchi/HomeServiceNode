const express = require("express");
const { verfiytoken } = require("../middlewere/auth");

const app = express();
const {BookingAvailable,City,getcityname, availabletime,getavailabletime, CreBooking} = require("../conteroller/Booking");

//post api in create Booking availavle date
app.post("/HomeService/Booking",verfiytoken, CreBooking);
app.post("/HomeService/Booking/AvailableDate", BookingAvailable);
app.post("/HomeService/Booking/availabletime", availabletime);
app.get("/HomeService/Booking/getavailabletime", getavailabletime);

app.post("/HomeService/Booking/CityName", City);
app.get("/HomeService/Booking/getcityname", getcityname);                      

module.exports = app;