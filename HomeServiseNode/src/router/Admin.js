const express = require("express");
const app = express();

const { adminlogin ,admin} = require("../conteroller/Admin");
//post api in create service
app.post("/HomeService/admin/signin", adminlogin);
app.post("/HomeService/admin/signup", admin);

module.exports = app;
