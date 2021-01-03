/*
 * @Description: 上传图片
 * @Author: primsie7
 * @Date: 2020-12-03 11:09:47
 * @LastEditTime: 2021-01-02 23:25:52
 */
const fs = require("fs");
const path = require("path");
const { timeFormat } = require('../utils/utils')

const qiniu = require ('qiniu');
const QINIU = require("../utils/config")
const Busboy = require('busboy')

// 递归创建目录 同步方法
// function checkDirExist(dirname) {
//   if (fs.existsSync(dirname)) {
//     return true;
//   } else {
//     if (checkDirExist(path.dirname(dirname))) {
//       fs.mkdirSync(dirname);
//       return true;
//     }
//   }
// }
// function getSuffix (fileName) {
//   return fileName.split('.').pop()
// }
// // 重命名
// function Rename (fileName) {
//   return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
// }
// // 生成新的文件名称
// function getUploadFileExt(name) {
//   let ext = name.split('.');
//   let first = name.replace(ext[ext.length - 1], '');
//   let last = timeFormat(new Date(), 'yyyy-mm-dd-HH-mm-ss')
//   return `${first}${last}.${ext[ext.length - 1]}`
//   // return `${first}${last}.${ext[ext.length - 1]}`
// }



// 写入目录
const mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
  return false
}

function getSuffix (fileName) {
  return fileName.split('.').pop()
}

// 重命名
function Rename (fileName) {
  return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
}
// 删除文件
function removeTemImage (path) {
  fs.unlink(path, (err) => {
    if (err) {
      throw err
    }
  })
}


function upToQiniu (filePath, key) {
  const accessKey = QINIU.accessKey // 你的七牛的accessKey
  const secretKey = QINIU.secretKey // 你的七牛的secretKey
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
 
  const options = {
    scope: QINIU.bucket // 你的七牛存储对象
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
 
  const config = new qiniu.conf.Config()
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z2
  const localFile = filePath
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  // 文件上传
  return new Promise((resolved, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      console.log(respErr, respBody, respInfo)
     if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        resolved(respBody)
      } else {
        resolved(respBody)
      }
    })
  })
}

// 上传到本地服务器
function uploadFile (ctx, options) {
  let busboy = new Busboy({headers: ctx.req.headers})
  const fileType = options.fileType
  const filePath = path.join(options.path, fileType)
  const confirm = mkdirsSync(filePath)
  if (!confirm) {
    return
  }
  console.log('文件上传中...')
  return new Promise((resolve, reject) => {
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      // const fileName = Rename(filename)
      // const saveTo = path.join(path.join(filePath, fileName))
      console.log(fieldname)
      const patt = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/
			const isPic = patt.test(filename)

			if (options.isImg) {
				if (!isPic) {
					resolve(new ErrorModel({
						message: '文件格式非图片类型'
					}))
					return
				}
			}

			let fileName = filename
			let _uploadFilePath = path.join(filePath, fileName)
			let saveTo = path.join(_uploadFilePath)

			// 文件保存到制定路径
			file.pipe(fs.createWriteStream(saveTo))
      file.on('end', function () {
        console.log('end')
        resolve({
          imgPath: `/${fileType}/${fileName}`,
          imgKey: fileName
        })
      })
    })

    busboy.on('finish', function () {
      console.log('文件上传结束')
    })

    busboy.on('error', function (err) {
      console.log('文件上出错')
      reject(result)
    })
    ctx.req.pipe(busboy)
  })
}


class UploadServer {

  // 上传图片到七牛
  static async upload(ctx) {
    try {
      //上传单个文件
      // const { bucket } = ctx.request.body;
      // const file = ctx.request.files.file;//获取上传文件
      // 创建可读流
      // const reader = fs.createReadStream(file.path);

      // // 生成文件夹
      // let dir = path.join(__dirname, `../public/upload/${bucket}`);
      // checkDirExist(dir)

      // // 生成图片文件名字
      // let newName = getUploadFileExt(file.name);
      // // let newName = Rename(file.name);
      // console.info('newName', newName);

      // // 文件目录
      // let filePath = `${dir}/${newName}`
      // console.log(filePath)
      // // 创建可写流
      // const upStream = fs.createWriteStream(filePath);
      // // console.info('upStream', upStream)

      // // 可读流通过管道写入可写流
      // reader.pipe(upStream);
      // const qiniu = await upToQiniu(filePath, newName)

      const serverPath = path.join(__dirname, '../public/upload/')
        // 获取上存图片
        const result = await uploadFile(ctx, {
          fileType: QINIU.bucket,
          path: serverPath
        })
        const imgPath = path.join(serverPath, result.imgPath)
        // 上传到七牛
      const qiniu = await upToQiniu(imgPath, result.imgKey)
        // 上存到七牛之后 删除原来的缓存图片
      const data = {
        url: `${QINIU.origin}/${qiniu.key}`,
        createTime: + new Date()
      }
      ctx.success(data, null, "操作成功")


    } catch (error) {
      console.log(error)
      ctx.fail(500, "上传失败")
    }
  }

   
  
}












module.exports = UploadServer;
