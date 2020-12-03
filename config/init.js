/*
 * @Description: 
 * @Author: primsie7
 * @Date: 2020-11-11 09:37:17
 * @LastEditTime: 2020-12-03 09:55:18
 */
const config = {
  port: 3000,
  //数据库设置
  mysql: {
    database: 'test',
    username: 'root',
    password: '123456',
    port: '3306',
    host:"localhost"
    // host: '47.114.178.212'
  }
}
module.exports = config;