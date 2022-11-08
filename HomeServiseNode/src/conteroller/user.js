const { auth } = require("../middlewere/auth");
const bcrypt = require("bcryptjs");
const user = require("../module/user");
const validator = require("email-validator");
const { default: mongoose } = require("mongoose");
const { mailsend } = require("../module/MailSend");
let isMatch = "";

//sign up router.....
const register = async (req, res) => {
  try {
    console.log(req.body.formdata.email);
    if (req.body.formdata.email === "") {
      res.status(400).send({ mes: "please enter email" });
    } else if (validator.validate(req.body.formdata.email) == false) {
      res.status(400).send({ mes: "please enter valid email" });
    } else if (req.body.formdata.password === "") {
      res.status(400).send({ mes: "please enter password" });
    } else {
      let haspass = "";
      haspass = await bcrypt.hash(req.body.formdata.password, 10);
      let data = new user({
        email: req.body.formdata.email,
        password: haspass,
      });
      await data
        .save()
        .then((result) => {
          console.log("result:", result);
          mailsend({ email: req.body.formdata.email });
          res.status(201).json({ mes: "sign up done...", signup: true });
        })
        .catch((err) => {
          console.log("err:", err);
          res.status(400).send({ mes: "email is already exit...", err });
        });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//sign in router...
const login = async (req, res) => {
  try {
    console.log(validator.validate(req.body.formdata.email));
    let data = await user.find({
      email: req.body.formdata.email,
    });
    if (req.body.formdata.email === "") {
      res.status(400).send({ mes: "please enter email" });
    } else if (req.body.formdata.password === "") {
      res.status(400).send({ mes: "please enter password.." });
    } else if (validator.validate(req.body.formdata.email) == false) {
      res.status(400).send({ mes: "please enter valid email address.." });
    } else if (data.length != 0) {
      isMatch = await bcrypt.compare(
        req.body.formdata.password,
        data[0].password
      );
      console.log(data[0].password);
      if (isMatch == true)
        res.status(200).json({
          email: req.body.formdata.email,
          login: true,
          Token: auth(req.body.formdata.email, req.body.formdata.password),
        });
      else res.status(400).send({ mes: "Wrong Credentials1.." });
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
      data = await User.find({ email: "Chauhanruchi212@gmail.com" });
      haspass = await bcrypt.hash(req.body.confirmpassword, 10);

      console.log("tyyyyyy", req.body);
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
        console.log("...", isMatch);
        isMatch = await bcrypt.compare(req.body.oldpassword, data[0].password);
        result = await User.updateOne(
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
    console.log(error);
    res.send(error);
  }
};
const getuserdata = async (req, res) => {
  try {
    let userdata = await signup.find();
    if (userdata == null) {
      res.status(400).send("not user data");
    } else {
      res.status(200).send(userdata);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login, getuserdata, changepassword };
