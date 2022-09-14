const express = require("express");
const {payment,verify} = require("../conteroller/payment");
const app = express();

app.post("/HomeService/payment",payment)

module.exports = app;
