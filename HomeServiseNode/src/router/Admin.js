const express = require("express");
const app = express();

const { adminlogin ,admin,changepassword,logout} = require("../conteroller/Admin");
const { verfiytoken } = require("../middlewere/auth");
//post api in create service
app.post("/HomeService/admin/signin", adminlogin);
app.post("/HomeService/admin/signup", admin);
app.patch("/HomeService/admin/changepassword",verfiytoken,changepassword)
app.post("/HomeService/admin/logout",logout)

module.exports = app;
