const path = require("path");
const jobModel = require("../model/job");
const Cookie = require("../utils/getCookie");
const JwtToken = require("../utils/token");
const addjob = (req,res)=>{
    const {jobName,jobPrice,jobAsk,companyName} = req.body;
    const jobLogo = req.files.jobLogo[0].path;
    const url = "http://127.0.0.1:3000/img/"+path.parse(jobLogo).base;

    //获取客户端的cookie
    const token = Cookie.getCookie(req,"token");

    //token的校验
    JwtToken.tokenVerify(token,"1901",function(err){
        if(err){
            //err存在，则没有登录
            res.json({
                state:false,
                info:"token过期,请重新登录"
            })
        }else{
            jobModel.jobSave({jobName,jobPrice,jobAsk,companyName,jobLogo:url},()=>{
                res.json({
                    state:true,
                    info:"添加成功"
                })
            })
        }
    })
}

module.exports = {
    addjob,
}