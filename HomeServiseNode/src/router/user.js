const express = require("express");
const upload = require("../utils/multer");

const app = express();

const { register, login,getuserdata,changepassword } = require("../conteroller/user");
const { verfiytoken } = require("../middlewere/auth");

//post api in sign up
app.post("/HomeService/signup", register);
//post api in signin
app.post("/HomeService/signin", login);
app.get("/HomeService/userdata", getuserdata);
app.patch("/HomeService/user/changepassword",upload.single("image"),verfiytoken,changepassword)
module.exports = app;
