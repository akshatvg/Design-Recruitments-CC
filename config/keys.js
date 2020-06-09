
var db={
    mongoDB:process.env.MONGO_DB || process.env.MONGODB,
    secret:process.env.SECRET || process.env.CAPTSECRET,
    email:process.env.E_mail || process.env.email,
    password:process.env.password || process.env.pass
}
module.exports=db