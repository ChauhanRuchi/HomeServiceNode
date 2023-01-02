const { auth } = require("../middlewere/auth");
const bcrypt = require("bcryptjs");
const Admin = require("../module/Admin");
const admins = require("../module/Admin");

const validator = require("email-validator");
const jsonwebtoken = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const service = require("../module/service");
let isMatch = "";
let result = "";
let haspass = "";
let data = "";
//sign up router.....
const admin = async (req, res) => {
  try {
    if (req.body.email === "") {
      res.status(400).send({ mes: "please enter email" });
    } else if (validator.validate(req.body.email) == false) {
      res.status(400).send({ mes: "please enter valid email" });
    } else if (req.body.password === "") {
      res.status(400).send({ mes: "please enter password" });
    } else {
      haspass = await bcrypt.hash(req.body.password, 10);
      let data = new Admin({
        email: req.body.email,
        password: haspass,
      });
      let result = "";
      result = await data
        .save()
        .then((result) => res.status(201).json("sign up done..."))
        .catch((err) =>
          res.status(400).send({ mes: "email is already exit..." })
        );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//sign in router...
const adminlogin = async (req, res) => {
  try {
    let data = await Admin.find({
      email: req.body.email,
    });

    if (req.body.email === "" || req.body.email === undefined) {
      res.status(400).send({ mes: "please enter email" });
    } else if (validator.validate(req.body.email) == false) {
      res.status(400).send({ mes: "please enter valid email address.." });
    } else if (req.body.password === "" || req.body.password === undefined) {
      res.status(400).send({ mes: "please enter password.." });
    } else if (data.length != 0) {
      isMatch = await bcrypt.compare(req.body.password, data[0].password);
      if (isMatch == true)
        res.status(200).json({
          login: true,
          Token: auth(req.body.email, req.body.password),
        });
      else res.status(400).send({ mes: "Wrong Credentials.." });
    } else if (data.length == 0) {
      res.status(400).send({ mes: "Wrong Credentials.." });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const changepassword = async (req, res) => {
  try {
    jsonwebtoken.verify(req.token, "screatekey", async (err, authdata) => {
      data = await Admin.find({ email: "Owner212@gmail.com" });
      haspass = await bcrypt.hash(req.body.confirmpassword, 10);

      if (req.body.oldpassword == "" || req.body.oldpassword == undefined) {
        res.status(400).send("please enter old password");
      } else if (
        req.body.newpassword == "" ||
        req.body.newpassword == undefined
      ) {
        res.status(400).send("please enter new password");
      } else if (
        req.body.confirmpassword == "" ||
        req.body.confirmpassword == undefined
      ) {
        res.status(400).send("please enter confirm password");
      } else if (req.body.newpassword !== req.body.confirmpassword) {
        res.status(400).send({ message: "password not match.." });
      } else if (data.length != 0) {
        isMatch = await bcrypt.compare(req.body.oldpassword, data[0].password);
        result = await Admin.updateOne(
          { password: data[0].password },
          { password: haspass }
        );

        if (isMatch == true) {
          res.status(200).send({
            changepassword: true,
            message: "succefully change password" + result,
          });
        } else {
          res.status(400).send("old password is wrong...");
        }
      }
    });
  } catch (error) {
    res.send(error);
  }
};
const logout = async (req, res) => {
  try {
    res.status(200).send("token", localStorage.getItem("AdminToken"));
  } catch (error) {
    res.send(error);
  }
};

module.exports = { adminlogin, admin, changepassword, logout };
