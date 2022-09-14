const { auth } = require("../middlewere/auth");
const bcrypt = require("bcrypt");
const signup = require("../module/user");
const validator = require("email-validator");
const { default: mongoose } = require("mongoose");
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
      let data = new signup({
        email: req.body.formdata.email,
        password: haspass,
      });
      let result = "";
      result = await data
        .save()
        .then((result) => res.status(201).json({message:"sign up done...",signup:true}))
        .catch((err) =>
          res.status(400).send({ message: "email is already exit..."})
        );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//sign in router...
const login = async (req, res) => {
  try {
    console.log(validator.validate(req.body.formdata.email))
    let data = await signup.find({
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
      console.log( data[0].password)
      if (isMatch == true)
        res.status(200).json({
          login:true,
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

const logout=async(req,res)=>{
  try {
    localStorage.removeItem(req.body);
    let data=signup.findOneAndDelete(req.body);
    if(data==null){
      res.status(400).send("please login");
    }
    else{
      res.status(200).send({message:"successfully logout..."})
    }

  } catch (error) {
    
  }

}
module.exports = { register, login };
