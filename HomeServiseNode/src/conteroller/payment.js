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
            amount:req.body.amount*100,
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
        console.log("..",req.body)
        const{
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        }=req.body;
        const sign=razorpay_order_id+"|"+razorpay_payment_id;
        const expectedsign=crypto
        . createHmac("sha256",process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");
        if(razorpay_signature===expectedsign){
            return res.status(200).send({message:"payment verified successfully",payment:true})
        }
        else{
            return res.status(400).send("invalid signature")
        }

    } catch (error) {
        console.log(".....",error)
        
    }
  };
  module.exports={payment,verify}