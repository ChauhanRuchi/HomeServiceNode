const Razorpay =require("razorpay")
const dontenv = require("dotenv");
dontenv.config();
const crypto =require("crypto");

const payment = async (req, res) => {
    try {
        const instance=new Razorpay({
        key_id:process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET
        })
        const option={
            amount:800*100,
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex")
                }
                instance.orders.create(option,(error,order)=>{
                    if(error){
                        res.status(500).send({message:"someting went wrong.."})
                    }
                    res.status(200).send({data:order})

                })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"internal server error"})
    }
   
  };
  const verify = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
  };
  module.exports={payment}