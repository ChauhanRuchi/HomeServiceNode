const service = require("../module/service");
let ObjectID = require("mongodb").ObjectID;

const jsonwebtoken = require("jsonwebtoken");
const subservice = require("../module/subservice");
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/multer");
const { default: mongoose, isValidObjectId } = require("mongoose");
let resultimg = "";
let result1 = "",
    URL = "";
const createService = async (req, res) => {
  try {
    console.log(req.body.formdata);
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
          public_id: resultimg.public_id,
        });
        let result = "";
        result = data
          .save()
          .then((result) =>
            res.status(201).json({ mes: "Add Service", resultimg, data: true })
          )
          .catch((err) => res.status(400).send({ mes: err }));
      }
    });
  } catch (error) {
    res.send(error);
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
const createSubService = async (req, res) => {
  try {
    console.log(req.body);
    let getservice = await service.find({ _id: req.body.serviceid });
    if (req.body.servicename === undefined || "") {
      res.status(400).send({ mes: "please enter servicename" });
    } else if (req.body.serviceid === undefined || "") {
      res.status(400).send({ mes: "please select subservicename" });
    } else if (req.body.decription === undefined || "") {
      res.status(400).send({ mes: "enter your servicedecription" });
    } 
    else if (req.body.charge === undefined || "") {
      res.status(400).send({ mes: "enter service charge.." });
    } 
    else {
      let result1 = await cloudinary.uploader.upload(req.file.path);
      let data = new subservice({
        serviceid: req.body.serviceid,
        mainservice: getservice[0].servicename,
        servicename: req.body.servicename,
        decription: req.body.decription,
        url: result1.url,
        charge:req.body.charge
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
const getsubservicebyservice = async (req, res) => {
  try {
    let getsubservice = await subservice.find({ serviceid: req.params });
    if (getsubservice == null) {
      res.status(400).send("service not found..");
    } else {
      res.status(200).send(getsubservice);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getsubservice = async (req, res) => {
  try {
    let getsubservice = await subservice.find();
    if (getsubservice == null) {
      res.status(400).send("service not found..");
    } else {
      res.status(200).send(getsubservice);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteService = async (req, res) => {
  try {
    let data = await service.findByIdAndDelete(req.params);

    jsonwebtoken.verify(req.token, "screatekey", (err, authdata) => {
      if (err) {
        res.sendStatus(403);
      } else if (data == null) {
        res.status(400).send({ message: "service not found" });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteSubService = async (req, res) => {
  try {
    let data = await subservice.findByIdAndDelete(req.params);

    jsonwebtoken.verify(req.token, "screatekey", (err, authdata) => {
      if (err) {
        res.sendStatus(403);
      } else if (data == null) {
        res.status(400).send({ message: "SubService not found" });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const editService = async (req, res) => {
  
  let servicedata = await service.findById(req.params);

  try {
    try {
      if (req.file !== undefined) {
        let public_id = servicedata.public_id;
        cloudinary.uploader.destroy(public_id, (err, result) => {});
        result1 = await cloudinary.uploader.upload(req.file.path);
        URL = result1?.image;
      }
    } catch (error) {
      console.log("path..", error);
    }

    let editService = {
      url: URL || servicedata.url,
      servicename: req.body.servicename || servicedata.servicename,
      decription: req.body.decription || servicedata.decription,
    };

    let data = await service.findByIdAndUpdate(req.params, editService);

    jsonwebtoken.verify(req.token, "screatekey", (err, authdata) => {
      if (err) {
        res.sendStatus(403);
      } else if (data == null) {
        res.status(400).send("service not found");
      } else {
        res.status(200).send(data);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const editSubService = async (req, res) => {
  try {
    let servicedata = await subservice.findById(req.params);
    try {
  
      if (req.file !== undefined) {
        let public_id = servicedata.public_id;
        cloudinary.uploader.destroy(public_id, (err, result) => {});
        let result1 = await cloudinary.uploader.upload(req.file.path);
        URL = result1?.image;
      }
    } catch (error) {
      console.log("path..", error);
    }

    let data = await subservice.findByIdAndUpdate(req.params, {
      url:URL||subservice.url,
      servicename: req.body.servicename,
      decription: req.body.decription,
    });

    jsonwebtoken.verify(req.token, "screatekey", (err, authdata) => {
      if (err) {
        res.sendStatus(403);
      } else if (data == null) {
        res.status(400).send("artical not found");
      } else {
        res.status(200).send(data);
      }
    });
  } catch (error) {
    console.log("error.....",error)
    res.status(500).send(error);
  }
};
const searchbyid = async (req, res) => {
  try {
    let getservice = await service.find({ _id: req.params });
    console.log(getservice[0].servicename);

    if (getservice == null) {
      res.status(400).send("service not found..");
    } else {
      res.status(200).send(getservice[0].servicename);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createSubService,
  getsubservice,
  createService,
  getservice,
  deleteService,
  deleteSubService,
  editService,
  editSubService,
  getsubservicebyservice,
  searchbyid,
};
