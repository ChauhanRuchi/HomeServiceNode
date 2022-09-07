const service = require("../module/service");
let ObjectID = require('mongodb').ObjectID;

const jsonwebtoken = require("jsonwebtoken");
const subservice = require("../module/subservice");
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/multer");
const { default: mongoose, isValidObjectId } = require("mongoose");
let resultimg = "";

const createService = async (req, res) => {

  try {
    console.log(req.body.formdata)
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
          public_id:resultimg.public_id
        });
        let result = "";
        result = data
          .save()
          .then((result) => res.status(201).json({ mes: "Add Service" ,resultimg}))
          .catch((err) => res.status(400).send({ mes: err }));
      }
    });
  } catch (error) {
    res.send(error);
  }
};
const getservice = async (req, res) => {
  let servicedata=service.find({_id:new ObjectID("63188c7c1c3250a01936e2e7")},{})
    console.log(servicedata)
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
const createSubService = async (req, res) => {
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
const deleteService = async (req, res) => {
  try {
    let data = await service.findByIdAndDelete(req.params);

    jsonwebtoken.verify(
      req.token,
      "screatekey",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (data == null) {
          res.status(400).send({message:"service not found"});
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteSubService = async (req, res) => {
  try {
    let data = await subservice.findByIdAndDelete(req.params);

    jsonwebtoken.verify(
      req.token,
      "screatekey",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (data == null) {
          res.status(400).send({message:"SubService not found"});
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
const editService = async (req, res) => {
  try {
    cloudinary.uploader.destroy("jccbvlcr9tazujwnmrg8",(err ,result)=>{
    });
  
    let data = await service.findByIdAndUpdate(req.params, {
      servicename: req.body.servicename,
      decription: req.body.decription,
    });

    jsonwebtoken.verify(
      req.token,
      "ghjkjhgfdsdfghjkiuytrertyuioiwert",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (data == null) {
          res.status(400).send("artical not found");
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { createSubService, getsubservice, createService, getservice,deleteService,deleteSubService};
