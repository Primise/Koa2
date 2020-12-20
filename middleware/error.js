/*
 * @Author: your name
 * @Date: 2020-11-25 22:40:53
 * @LastEditTime: 2020-12-19 23:31:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\middleware\error.js
 */
const jwt= require("jsonwebtoken");//引入jwt验证
const util = require("util")//工具类

const verify = util.promisify(jwt.verify);

const secret= "blog";


/**
 * 判断token
*/
module.exports = function(){
  return async function(ctx,next){
    try{
      const token = ctx.header.authorization;
      if(token){
        let payload;
         try {
          payload = await verify(token,split(" ")[1],secret);
          ctx.user={
            user_name:payload.user_name,
            admin:payload.admin
          };
         } catch (error) {
           console.log("token verify fail: "+error)
         }
      }
      await next(); 
    }catch(err){
      console.log(err)
      if(err.status=== 401){
        ctx.status= 401;
        ctx.body={
          code:401,
          msg:'token过期，验证失败'
        }
      }else{
        err.status = 404;
        ctx.body={
          code:404,
          msg:"接口不存在"
        }
      }
    }
  }
}