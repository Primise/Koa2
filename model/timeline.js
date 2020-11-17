const Sequelize = require('sequelize');
const sequelize = require('../sequelize');



//创建时间轴数据库模型

let TimeLine = sequelize.define('time_line',{
  id:{
    type:Sequelize.INTEGER(11),
    primaryKey:true,
    autoIncrement:true,
  },
  title:{
    type:Sequelize.STRING(100),
  },
  content:{
    type:Sequelize.STRING(255)
  },
  state:{
    type:Sequelize.NUMBER(),
  },
  start_time:Sequelize.INTEGER,
  end_time:Sequelize.INTEGER,
  update_time:Sequelize.INTEGER
},{
  freezeTableName:true
});



TimeLine.sync({force:false});
module.exports= TimeLine;


