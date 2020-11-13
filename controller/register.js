const userModel = require("../lib/mysql.js");


/**
 * 注册
 * @params数据
*/
exports.registerData = async ctx =>{
    let {name,pass} = ctx.request.body;
    console.log(name,pass)
    userModel.insertData({name:name,pass:pass}).then(res=>{
        console.log('注册成功');
        ctx.body={
            code:0,
            data:{
                name:name,
                pass:pass,
            }
        }
    })
   
}