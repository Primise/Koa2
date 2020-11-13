const Sequelize  = require('sequelize');
const config = require('./config/init');
const {database,username, password} = config.mysql;
const sequelize = new Sequelize (database,username, password, {
  host: host,
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  }
});

module.exports = sequelize;


