const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

//创建Model数据库模型

let Article = sequelize.define('article', {
  //指定映射的字段类型，字段名；
  //例如数据库中的user表中的username 字段映射成username
  //如何不指定field,会自动隐射相同名称的字段
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING(255),
    unique: {
      msg: '已添加'
    }
  },
  readedCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  author: Sequelize.STRING,
  summary: Sequelize.STRING,
  category: Sequelize.STRING,
  tag: Sequelize.STRING,
  content: Sequelize.TEXT,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm')
    }
  }
},
  {
    // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
    // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
    freezeTableName: true
  });


//创建表或者同步表
//User.sync()返回一个Promise对象
//force=true会把存在的表先drop掉在创建

 Article.sync({ force: true });

module.exports= Article;



