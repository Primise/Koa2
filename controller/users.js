/*
 * @Author: your name
 * @Date: 2020-12-22 22:13:56
 * @LastEditTime: 2020-12-27 19:56:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\controller\users.js
 */

const User = require('../model/user');
const Op = require('sequelize').Op;
const jwt = require("jsonwebtoken");
const {JWT_SECRET }  = require("../utils/config")
/**
 * 登录
 * @params数据
*/
const login = async (ctx) => {
  let { user_name, password } = ctx.request.body;
  if (!user_name || !user_name) {
    ctx.fail('用户名或密码不能为空', -1);
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
  if (data) {
    const payload = {
      username: user_name,
      admin: true
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    data.token = token;
    ctx.success(data)
  } else {
    ctx.fail("用户名或密码错误", -1)
  }


};
const logout = async(ctx)=>{
  
}
module.exports = {
  login,
  logout
}