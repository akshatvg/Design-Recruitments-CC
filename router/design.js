const express=require('express')
const User=require('../models/users')
var contact=require('../models/contactus')
var auth=require('../middleware/auth')
var captcha=require('../middleware/captcha')
const router=new express.Router()

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
                    console.log(user)
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
        console.log("--------------")
        //console.log(req.body)
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
module.exports=router