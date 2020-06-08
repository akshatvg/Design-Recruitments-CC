var jwt=require('jsonwebtoken')
var User=require('../models/users')

const auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('JWT ','')
        const decoded=jwt.verify(token,'mysecret')
        const user=await User.findOne({_id:decoded._id,token:token})
        console.log("hi")
        if(!user)
        {
            res.status(404).send({"error":"user not found"})
        }
        console.log(user)
        req.user=user
        next()
    }catch(e){
        res.status(401).send({"error":"please authenticate user"})
    }
    
}

module.exports=auth