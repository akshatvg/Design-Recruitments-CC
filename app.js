const express=require('express')
var cors = require('cors')
const app=express()
 
app.use(cors())
require('dotenv').config()
var db = require('./config/keys')
var mongoose = require('mongoose')
mongoose.connect(db.mongoDB, {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology:true
})
const userRoute=require('./router/design')
var rateLimit = require('express-rate-limit')
var port= process.env.PORT || 3000
app.use(express.json())
app.use(userRoute)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.listen(port,()=>{
    console.log('server running')
})