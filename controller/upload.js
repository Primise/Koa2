/*
 * @Description: 上传图片
 * @Author: primsie7
 * @Date: 2020-12-03 11:09:47
 * @LastEditTime: 2020-12-22 22:52:09
 */
const fs = require("fs");
const path = require("path");
const { timeFormat } = require('../utils/utils')
// const timeFormat = require("../utils/utils")
// 递归创建目录 同步方法
function checkDirExist(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (checkDirExist(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
// 生成新的文件名称
function getUploadFileExt(name) {
  let ext = name.split('.');
  let first = name.replace(ext[ext.length - 1], '');
  let last = timeFormat(new Date(), 'yyyy-mm-dd-HH-mm-ss')
  return `${first}${last}.${ext[ext.length - 1]}`
}

class UploadServer {
  // 上传图片到七牛
  static async upload(ctx) {
    try {
      //上传单个文件
      // console.log(ctx.request.files)
      const { bucket } = ctx.request.body;
      const file = ctx.request.files.file;//获取上传文件
      // 创建可读流
      const reader = fs.createReadStream(file.path);

      // 生成文件夹
      let dir = path.join(__dirname, `../public/upload/${bucket}`);
      checkDirExist(dir)

      // 生成图片文件名字
      let newName = getUploadFileExt(file.name);
      console.info('newName', newName);

      // 文件目录
      let filePath = `${dir}/${newName}`

      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // console.info('upStream', upStream)

      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      let urlstr = `${ctx.origin}/upload/${bucket}/${newName}`

      const data = {
        url: urlstr,
        createTime: +new Date()
      }
      ctx.success(data, null, "操作成功")


    } catch (error) {
      console.log(error)
      ctx.fail(500, "上传失败")
    }
  }
}












module.exports = UploadServer;
