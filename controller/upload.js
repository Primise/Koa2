/*
 * @Description: 上传图片
 * @Author: primsie7
 * @Date: 2020-12-03 11:09:47
 * @LastEditTime: 2020-12-22 10:57:53
 */
const fs = require("fs");
const path = require("path");

class UploadServer {
  // 上传图片到七牛
  static async upload(ctx) {
    try {
      //上传单个文件
      console.log(ctx.request)
      const file = ctx.request.files.file;//获取上传文件
      
    } catch (error) {
      console.log(error)
        ctx.fail(500,"上传失败")
    }
  }
}












module.exports = UploadServer;
