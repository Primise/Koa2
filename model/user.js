
/*
 * @Author: your name
 * @Date: 2020-11-24 22:19:11
 * @LastEditTime: 2020-11-26 22:59:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\model\user.js
 */

const Sequelize = require('sequelize');
const sequelize = require('../sequelize');




//创建Model数据库模型
let User = sequelize.define('user',{
  id:{
    type:Sequelize.STRING(11),
    primaryKey: true,
    autoIncrement: true
  },
  user_id:Sequelize.STRING(11),
  user_name:Sequelize.STRING(11),
  true_name:Sequelize.STRING(11),
  password:Sequelize.STRING(25),

},
{
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
}) 


User.sync({ force: false });

module.exports= User;