const service = require("../module/service");
const jsonwebtoken = require("jsonwebtoken");
const subservice = require("../module/subservice");
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/multer");
const { default: mongoose } = require("mongoose");
let resultimg = "";

const servicecre = async (req, res) => {
  
  try {
    jsonwebtoken.verify(req.token, "screatekey", async (err, authdata) => {
      if (err) res.send(err);
      else console.log(req.body);
      if (req.body.servicename === undefined || req.body.servicename === "") {
        res.status(400).send({ mes: "please enter servicename" });
      } else if (!req.body.decription) {
        res.status(400).send({ mes: "please enter decription" });
      } else {
        resultimg = await cloudinary.uploader.upload(req.file.path);

        let data = new service({
          servicename: req.body.servicename,
          decription: req.body.decription,
          url: resultimg.url,
        });
        let result = "";
        result = data
          .save()
          .then((result) => res.status(201).json({ mes: "Add Service" }))
          .catch((err) => res.status(400).send({ mes: err }));
      }
    });
  } catch (error) {
    res.send(error);
  }
};
const service1 = async (req, res) => {
  try {
    if (req.body.servicename === undefined || "") {
      res.status(400).send({ mes: "please enter servicename" });
    } else if (req.body.subservicename === undefined || "") {
      res.status(400).send({ mes: "please enter subservicename" });
    } else if (req.body.decription === undefined || "") {
      res.status(400).send({ mes: "enter your servicedecription" });
    } else if (req.body.adminname === undefined || "") {
      res.status(400).send({ mes: "enter your name" });
    } else {
      let result1 = await cloudinary.uploader.upload(req.file.path);
      let data = new subservice({
        servicename: req.body.servicename,
        subservicename: req.body.subservicename,
        decription: req.body.decription,
        adminname: req.body.adminname,
        url: result1.url,
      });
      let result = "";
      result = data
        .save()
        .then((result) => res.status(201).json({ mes: "Add Service", result1 }))
        .catch((err) => res.status(400).send({ mes: err }));
    }
  } catch (error) {
    res.status(500).send({ mes: error });
  }
};
const getsubservice = async (req, res) => {
  try {
    let getsubservice = await subservice.find();
    if (getsubservice == null) {
      res.status(400).send("service not found..");
    } 
    else {
      res.status(200).send(getsubservice);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getservice = async (req, res) => {
  try {
    let getservice = await service.find();
    if (getservice == null) {
      res.status(400).send("service not found..");
    } else {
      res.status(200).send(getservice);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { service1, getsubservice, servicecre, getservice };
