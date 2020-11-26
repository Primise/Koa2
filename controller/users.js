/*
 * @Author: your name
 * @Date: 2020-11-14 14:52:20
 * @LastEditTime: 2020-11-26 23:13:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\controller\users.js
 */
const User = require('../model/user');
const Op = require('sequelize').Op
/**
 * 登录
 * @params数据
*/
const login = async (ctx) => {
  let {user_name,password} = ctx.request.body;
  if (!user_name||!user_name) {
    ctx.fail( '用户名或密码不能为空',-1);
    return;
  }
  const data = await User.findOne({
    where: {
      user_name: {
        [Op.eq]: `${user_name}`
      },
      password: password
    }
  })
  data?ctx.success(data):ctx.fail("用户名或密码错误",-1)

};
module.exports={
  login
}