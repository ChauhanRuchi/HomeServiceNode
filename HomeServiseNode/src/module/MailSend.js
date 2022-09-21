let nodemailer = require("nodemailer");
function mailsend(data){
    let tranporte = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "Chauhanruchi212@gmail.com",
          pass: "higizjmjbdrudrzn",
        },
      });
      let mailoption = {
        from: "Chauhanruchi212@gmail.com",
        to:data.email,
        subject: "Account Created Successfully",
        text:"Congratulations! Your new account has been successfully created at HomeService!",
      };
      tranporte.sendMail(mailoption, (error, info) => {
        if (error) {
          console.log(`error is${error}`);
        } else {
          console.log(info.response);
        }
      });
}
module.exports={mailsend}

