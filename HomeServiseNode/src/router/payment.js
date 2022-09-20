const express = require("express");
const upload = require("../utils/multer");

const {payment,verify} = require("../conteroller/payment");
const app = express();

app.post("/HomeService/payment",upload.single("image"),payment)
app.post("/HomeService/verify",verify)

module.exports = app;
