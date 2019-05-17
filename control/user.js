const userModel = require("../model/user");

//引入node核心模块 加密
const crypto = require("crypto");
//引入jsonwebtoken
// const jwt = require("jsonwebtoken");

const utils = require("../utils/token");

const register = (req,res) =>{
    const {username,password} = req.body;

    //查用户名是否存在
    userModel.findUser({username},(result)=>{
        console.log(username);
        if(result){
            res.json({
                state:false,
                info:"用户名已存在！"
            })
        }else{
            //创建sha256算法
            const hash = crypto.createHash('sha256');
            //需要加密的文件
            hash.update(password);

            //得到加密的文件
            // hash.update(password);

            userModel.savaUser({username,password:hash.digest('hex')},()=>{
                // console.log(username);

                res.json({
                    state:true,
                    info:"注册成功！"
                })
            })
        }
    })
}

const login = (req,res)=>{
    const {username,password} = req.body;
    userModel.findUser({username},(result)=>{
        if(result){
            //创建sha256算法
            const hash = crypto.createHash('sha256');
            //需要加密的文件
            hash.update(password);

            if(result.password == hash.digest('hex')){
                //创建一个token

                const token = utils.createToken({user:username},"1901")
                res.cookie("token",token)
                res.cookie("user",username)


                res.cookie("token",token);


                res.json({
                    state: true,
                    info:"登录成功"
                })
            }else{
                res.json({
                    state:false,
                    info:"密码错误"
                })
            }

        }else{
            res.json({
                state:false,
                info:"用户名不存在"
            })
        }
    })
}

module.exports = {
    register,
    login
}