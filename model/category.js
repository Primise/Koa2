/*
 * @Author: your name
 * @Date: 2020-12-19 22:23:36
 * @LastEditTime: 2020-12-20 14:27:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\model\category.js
 */

const moment = require('moment')
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../sequelize');
;

//创建类别
let Category = sequelize.define('blog_category', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  category_id:{
    type: Sequelize.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  sort: {
    type: DataTypes.STRING(100)
  },
  category_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  category_description: {
    type: DataTypes.STRING(110),
  },
  // status:{
  //   type: DataTypes.ENUM,
  //   values: [0,1,2] 
  // },
  create_time: {
    type: Sequelize.DATE,
    field: 'create_time',
    defaultValue:Sequelize.NOW,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  update_time: {
    type: Sequelize.DATE,
    field: 'update_time',
    defaultValue:Sequelize.NOW,
    get() {
      return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
}, {
  freezeTableName: true
});
Category.sync({ force: false });


module.exports = Category;