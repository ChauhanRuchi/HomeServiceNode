const express = require("express");
const cloudinary = require("../utils/cloudnary");
const { verfiytoken } = require("../middlewere/auth");
const upload = require("../utils/multer");
const app = express();

const { service1, getsubservice, servicecre,getservice } = require("../conteroller/service");


//post api in create service
app.post(
  "/HomeService/service",
  [upload.single("image"), verfiytoken],
  servicecre
);
app.post("/HomeService/subservice", upload.single("image"), service1);
app.get("/HomeService/getsubservice", getsubservice);
app.get("/Homeservice/getservice",getservice)
module.exports = app;
