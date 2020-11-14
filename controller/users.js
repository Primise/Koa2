const user = require('../model/article');


/**
 * 注册
 * @params数据
*/
exports.addUser = async ctx=>{
  let {name,pass} = ctx.request.body;
  console.log(name,pass);
  // user.addUser(name,pass).then(res=>{
  //   console.log('注册成功'+res);
  //   ctx.body={
  //     code:0,
  //     data:{
  //       name:name,
  //       pass:pass,
  //     }
  //   }
  // })
} 