/*
 * @Description: 上传图片
 * @Author: primsie7
 * @Date: 2020-12-03 11:09:47
 * @LastEditTime: 2020-12-03 11:37:26
 */
const fs = require("fs");
const path = require("path");

class UploadServer {
  static async upload(ctx) {
    try {
      //上传单个文件
      const file = ctx.request.files.file;//获取上传文件
      
    } catch (error) {
        ctx.fail(500,"上传失败")
    }
  }
}












module.exports = UploadServer;
