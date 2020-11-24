/*
 * @Author: your name
 * @Date: 2020-11-14 14:52:20
 * @LastEditTime: 2020-11-24 22:19:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\controller\users.js
 */
const User = require('../model/article');


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