const express = require("express");
const cloudinary = require("../utils/cloudnary");
const { verfiytoken } = require("../middlewere/auth");
const upload = require("../utils/multer");
const app = express();

const {
  createSubService,
  getsubservice,
  getsubservicebyservice,
  createService,
  getservice,
  deleteService,
  deleteSubService,
  editService,
  editSubService,
} = require("../conteroller/service");

//post api in create service
app.post(
  "/HomeService/service",
  [upload.single("image"), verfiytoken],
  createService
);
app.post("/HomeService/subservice", upload.single("image"), createSubService);
app.get("/HomeService/getservicebysub/:_id", getsubservicebyservice);
app.get("/HomeService/getservice", getservice);
app.get("/HomeService/getsubservice", getsubservice);

app.delete("/HomeService/deleteservice/:_id", verfiytoken, deleteService);
app.delete("/HomeService/deletesubservice/:_id", verfiytoken, deleteSubService);
app.patch(
  "/HomeService/editservice/:_id",
  verfiytoken,
  upload.single("image"),
  editService
);
app.put(
  "/HomeService/editsubservice/:_id",
  verfiytoken,
  upload.single("image"),
  editSubService
);

module.exports = app;
