/*
 * @Description: 七牛token信息
 * @Author: primsie7
 * @Date: 2020-12-22 10:15:33
 * @LastEditTime: 2020-12-22 11:07:05
 */
const qiniu = require ('qiniu');
const QINIU = require("./config")

class UploadToken {
    static async token(ctx){
        try {
            let mac = await new qiniu.auth.digest.Mac(QINIU.accessKey,QINIU.secretKey);
            let options ={
             scope:QINIU.bucket,
             expires:3600*24   
            }
          let putPolicy = await new qiniu.rs.PutPolicy(options);
          let uploadToken = await putPolicy.uploadToken(mac);
          let data ={token:uploadToken};
          ctx.success(data,null,"获取token成功")
        } catch (error) {
            console.log(error)
            ctx.fail("获取token失败",500)
        }
    }
}


module.exports = UploadToken;