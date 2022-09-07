const express = require("express");
const cloudinary = require("../utils/cloudnary");
const { verfiytoken } = require("../middlewere/auth");
const upload = require("../utils/multer");
const app = express();

const { createSubService, getsubservice, createService,getservice,deleteService,deleteSubService} = require("../conteroller/service");


//post api in create service
app.post(
  "/HomeService/service",
  [upload.single("image"), verfiytoken],
  createService
);
app.post("/HomeService/subservice", upload.single("image"), createSubService);
app.get("/HomeService/getsubservice", getsubservice);
app.get("/HomeService/getservice",getservice)
app.delete("/HomeService/deleteservice/:_id",verfiytoken,deleteService)
app.delete("/HomeService/deletesubservice/:_id",verfiytoken,deleteSubService)

module.exports = app;
