//create token...
const jsonwebtoken = require("jsonwebtoken");

let auth = (email, password) => {
  let privatekey = "screatekey";
  let params = { email, password };
  let token = jsonwebtoken.sign(params, privatekey);
  return token;
};
let verfiytoken = (req, res, next) => {
  const bearerheader = req.headers["authorization"];
  if (typeof bearerheader !== "undefined") {
    const bearer = bearerheader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
module.exports = { auth, verfiytoken };
