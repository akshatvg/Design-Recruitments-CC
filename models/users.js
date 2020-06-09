var mongoose = require('mongoose')
var validator = require('validator')
var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(user) {
            if (!validator.isEmail(user)) {
                throw new Error('invalid email')
            }
        }
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10
    },
    regno: {
        type: String,
        required: true,
        maxlength: 9
    },
    password: {
        type: String,
        required: true
    },
    link:
    {
        type:String
    },
    date:{
        type:Date
    },
    token:{
            type:String
        },
    rand:
    {
        type:Number
    },
    verified:{
        type:Boolean,
        default:false
    },
    host:
    {
        type:String
    }
})

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete user.password
    delete user.tokens
    return userObject
}
userSchema.methods.generateToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'mysecret')
    user.token=token
    await user.save()
    return token
}
userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to login')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error('Unable to login')
    }
    return user
}
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8)
        next()
    }
})

var User = mongoose.model('User', userSchema)

module.exports = User