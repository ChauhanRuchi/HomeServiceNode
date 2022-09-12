const express = require("express");
const app = express();
const {BookingAvailable} = require("../conteroller/Booking");

//post api in create Booking availavle date
app.post("/HomeService/Booking/AvailableDate", BookingAvailable);

module.exports = app;