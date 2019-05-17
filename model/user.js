const mongoose = require("../db/database").mongoose;

const User = mongoose.model("user",{
    username:String,
    password:String
})

const findUser = (userInfo,cb)=>{
    User.findOne(userInfo).then((result)=>{
        cb(result)
    })
}

const savaUser = (userInfo,cb)=>{
    console.log(userInfo)
    const user = new User(userInfo);
    user.save().then(()=>{
        cb()
    })
}

module.exports = {
    findUser,
    savaUser
}