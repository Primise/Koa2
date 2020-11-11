const userModel = require("../../lib/mysql.js");


/**
 * 注册
 * @params数据
*/
exports.registerData = async ctx=>{
    let {name,pass,avator} = ctx.request.body;
    userModel.insertData({name:name,pass:pass,avator:avator}).then(res=>{
        console.log('注册成功');
        ctx.body={
            code:0,
            data:{
                name:name,
                pass:pass,
                avator:avator
            }
        }
    })
   
}