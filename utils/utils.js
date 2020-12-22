/*
 * @Description: 
 * @version: 
 * @Author: primsie7
 * @Date: 2020-11-19 11:16:16
 * @LastEditTime: 2020-12-22 22:41:44
 */
 function timeFormat(date, type) {
  var time = new Date(date);

  var year = time.getFullYear()
  var month = time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1
  var day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()

  var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
  var minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
  var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
  if (type === "yyyy-mm-dd") {
      return [year, month, day].join("-")
  } else if (type === "mm-dd") {
      return [month, day].join("-")
  } else if (type === "MM-DD") {
      return `${month}月${day}日`
  } else if (type === "yyyy-mm-dd-HH-mm-ss") {
      return [year, month, day, hour, minute, second].join("-")
  } else {
      return [year, month, day].join("-") + " " + [hour, minute, second].join(":")
  }
}

module.exports={
  timeFormat
}


