const express=require('express')
const User=require('../models/users')
var contact=require('../models/contactus')
var auth=require('../middleware/auth')
var captcha=require('../middleware/captcha')
const router=new express.Router()
var db = require('../config/keys')
const nodemailer=require('nodemailer')
let transporter = nodemailer.createTransport({
    host:'smtp.zoho.com',
    port: 465,
    auth: {
      user: 'noreply@codechefvit.com', // your gmail address
      pass: "Ccisbest123#"// your gmail password
    }
  });
router.post('/design/user/create',async(req,res)=>{
    const check1=await User.findOne({email:req.body.email})
    const check2=await User.findOne({regno:req.body.regno})
    if(check1 || check2)
    {
        res.status(401).send({"error":"User already exists"})
    }
    else{
        var check = /^19[BM][A-Z]{2}[0-9]{4}$/
            if (!req.body.regno.match(check)) {
                
                res.status(402).send({"error":"Registration number not acceptable"})
            }
            else{
                const user=new User(req.body)
                try{
                    await user.save()
                    // console.log(user)
                    res.status(201).send(user)
                }
                catch{
                    res.status(400).send({"error":"failed to register! Try again"})
                }
            }
    
}
})

router.post('/design/user/login',captcha,async(req,res)=>{
    try{
        // console.log("--------------")
        //// console.log(req.body)
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateToken()
        if(!user)
        {
            res.status(404).send({"error":"invalid"})
        }
        res.status(200).send({token})
    }
    catch{
        res.status(400).send({"error":"invalid email or password"})
    }
})

router.post('/submit/design/url',auth,async(req,res)=>{
    try{
        const user=req.user
        if(!user)
        {
            res.status(404).send()
        }
        else{
            user.link=req.body.link
            user.date=new Date()
            await user.save()
            res.status(201).send(user)
        }
    }
    catch(e)
    {
        res.status(400).send()
    }
})

router.get('/check/user/submission',auth,async(req,res)=>{
    try{
        const user=req.user
        res.status(200).send(user)
    }
    catch(e)
    {
        res.status(400).send()
    }
})
router.post('/contact/team',async(req,res)=>{
    try{
        var data=new contact(req.body)
        await data.save()
        res.status(201).send()
    }
    catch(e)
    {
        res.status(400).send()
    }
})

router.post('/send/verification/link',async function(req,res){
    try{
        var rand=Math.floor((Math.random() * 100) + 54);
        var user=await User.findOne({email:req.body.email})
        user.rand=rand
        await user.save()
        var host=req.get('host');
        var link="https://"+req.get('host')+"/verify?email="+req.body.email+"&id="+rand;
        var mailto=req.body.email
        mailOptions={
            from : 'noreply@codechefvit.com',
            to : mailto,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        }
        // console.log(mailOptions)
        transporter.sendMail(mailOptions, function(error, response){
        if(error){
                // console.log(error)
            res.status(401).json("error")
        }else{
                // console.log("Message sent: ");
            res.status(200).json("sent")
            }
        });
    }
    catch(e)
    {
        res.status(400).send()
    }
});

router.get('/verify',async function(req,res){
    // console.log(req.protocol+":/"+req.get('host'));
    var user=await User.findOne({email:req.query.email})
    if(req.query.id==user.rand)
    {
        // console.log("email is verified");
        user.verified=true
        await user.save()
        // console.log('updated')
        res.status(200).json("Your email has been successfully verified. Go to design.codechefvit.com and submit your response now!")
    }
    else
    {
        // console.log("email is not verified")
        res.json("Bad Request - email not verified")
    }
    })

router.post('/verifyemail',(req,res)=>{
    User.findOne({email:req.body.email}).then((user)=>{
        if(user.verified==true)
        {
            res.status(200).json("email is verified")
        }
        else{
            res.status(400).json("email not verified")
        }
    }).catch((err)=>{
        res.status(404).send('User not registered')
    })
})
module.exports=router