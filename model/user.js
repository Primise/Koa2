
/*
 * @Author: your name
 * @Date: 2020-11-24 22:19:11
 * @LastEditTime: 2020-12-09 13:29:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\model\user.js
 */


const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const Model = Sequelize.Model;



// 第一种使用sequelize.define()

// let User = sequelize.define('user',{
//   id:{
//     type:Sequelize.INTEGER(11),
//     primaryKey: true,
//     autoIncrement: true
//   },
//   user_id:Sequelize.STRING(11),
//   user_name:Sequelize.STRING(11),
//   true_name:Sequelize.STRING(11),
//   password:Sequelize.STRING(25),

// },
// {
//   // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
//   // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
//   freezeTableName: true
// }) 


// User.sync({ force: false });


//创建Model数据库模型
class User extends Model{}
User.init({

  
},{sequelize,modelName:'user'});

sequelize.sync({force:false})
module.exports= User;