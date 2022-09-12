const cors = require("cors");
const express = require("express");
const user = require("./router/user");
const service = require("./router/service");
const Admin = require("./router/Admin");
const Booking=require("./router/Booking")

const app = express();
app.use(cors());

app.use(express.json());
app.use(user);
app.use(service);
app.use(Admin);
app.use(Booking)

//post api in signup
app.listen(2009);
