const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

//创建Model数据库模型

let Article = sequelize.define('articles', {
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
  },
  read_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  author: Sequelize.STRING,
  description: Sequelize.TEXT,
  image_url:Sequelize.TEXT,
  create_time: Sequelize.INTEGER,
  update_time: Sequelize.INTEGER,
  is_delete:Sequelize.STRING
},
  {
    // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
    // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
    freezeTableName: true
  });


//创建表或者同步表
//User.sync()返回一个Promise对象
//force=true会把存在的表先drop掉在创建

 Article.sync({ force: false });

module.exports= Article;



