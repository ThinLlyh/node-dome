//jwt.sign(信息，秘钥，过期时间)返回值一般情况下都会当做cookie存储到客户端

const jwt = require("jsonwebtoken");

//创建token
const createToken=  (tokenInfo,secret)=>{
    return jwt.sign(tokenInfo,secret,{expiresIn: 60*60});
}

//从客户端获取到的cookie值  secret是一个秘钥   计算成功返回一个值，计算错误为err,说明当前的cookie是伪造的或过期的
const tokenVerify = (token,secret,cb)=>{
    jwt.verify(token,secret,function(err,decoded){
        cb(err)
    });
}


module.exports = {
    createToken,
    tokenVerify
}