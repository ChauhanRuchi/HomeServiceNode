const express = require("express");
const app = express();

const { register, login } = require("../conteroller/user");
//post api in sign up
app.post("/HomeService/signup", register);
//post api in signin
app.post("/HomeService/signin", login);
module.exports = app;
