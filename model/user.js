
/*
 * @Author: your name
 * @Date: 2020-11-24 22:19:11
 * @LastEditTime: 2020-11-25 22:11:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\model\user.js
 */

const Sequelize = require('sequelize');
const sequelize = require('../sequelize');




//创建Model数据库模型
let User = sequelize.define('user',{
  user_id:{
    type:Sequelize.STRING(11),
  },
  user_name:Sequelize.STRING(11),
  true_name:Sequelize.STRING(11),
  user_password:

}) 