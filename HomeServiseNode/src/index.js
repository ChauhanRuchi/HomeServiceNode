const cors = require("cors");
const bodyparser = require("body-parser");
const express = require("express");
const user = require("./router/user");
const service = require("./router/service");
const Admin = require("./router/Admin");
const Booking = require("./router/Booking");
const payment = require("./router/payment");

const app = express();
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(user);
app.use(service);
app.use(Admin);
app.use(Booking);
app.use(payment);

//post api in signup
app.listen(2009);
