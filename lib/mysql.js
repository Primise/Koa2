let mysql = require("mysql");
let config = require("../config/init.js");

// 第一种mysql

// const connection = mysql.createConnection({
//     host:'127.0.0.1',
//     post:'3306',
//     user:'root',
//     password:'xxxx'
// })
// //执行sql
// connection.query(sql,(err,result)=>{
//     err//错误信息
//     result//结果
// })

// //销毁连接  | 由于js是异步的 所以子啊执行sql之前就销毁了链接
// connection.destroy();

//第二种mysql Pool连接池
var pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release(); //释放连接资源 | 与connection.destroy()
        });
      }
    });
  });
};

let users = 
`create table if not exists users(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
pass VARCHAR(100) NOT NULL,
avator VARCHAR(100) NOT NULL,
moment VARCHAR(100) NOT NULL,
PRIMARY KEY ( id )
);`;
let createTable = function(sql){
    return(sql,[])
}

// 建表
createTable(users);


// 注册用户
let insertData = function( value ) {
    let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
    return query( _sql, value )
  }


module.exports={
    query,
    createTable,
    insertData
}
