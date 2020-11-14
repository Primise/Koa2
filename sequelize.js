const Sequelize  = require('sequelize');
const config = require('./config/init');
const {database,username, password,host} = config.mysql;
/**
 * 连接指定类型数据库
 * host:数据库地址
 * dialect:指定数据库类型
 * max: 连接池最大连接数量
 * min:连接池最小连接数量
 * idle:如果一个线程超过时间就会被释放
 * @type{Sequelize}
*/

const sequelize = new Sequelize (database,username, password, {
  host: host,   
  dialect: 'mysql',
  pool: {
      max: 20,     
      min: 0,      
      idle: 30000  
  },
  define: {
    freezeTableName: true,//禁止自动修改表名
    timestamps: false,//不需要添加 createdAt 和 updatedAt 两个时间戳字段
}
});
module.exports = sequelize;


