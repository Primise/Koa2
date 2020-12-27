/*
 * @Descripttion: 
 * @version: 
 * @Author: primsie7
 * @Date: 2020-11-17 09:12:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-27 19:58:32
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt   = require("koa-jwt")
const {JWT_SECRET} = require('./utils/config')
const cors = require("koa-cors");
// const koaBody = require('koa-body'); //解析上传文件的插件
// app.use(koaBody({
//         multipart: true,
//         formidable: {
//             maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
//         }
//     }))

//引入中间件
const err= require("./middleware/error");


app.keys = ['im a newer secret', 'i like turtle'];
//session
// const session = require('koa-session2');
// const Store = require("./utils/redisStore");
// // 配置
// app.use(session({
//   store:new Store(),
//   key:"koa:sess",
// }));




// koa-session
// app.keys = ['some secret hurr']
// const CONFIG = {
//   key:'koa:sess',    /*cookie key (default is koa:sess)*/
//   maxAge:86400000,   /*cookie 的过期时间maxAge in ms (default is 1 days)*/
//   overwrite:true,   /*是否可以overwrite (默认default true)*/
//   httpOnly:true,    /*cookie 是否只有服务器端可以访问httpOnly or not (default true)*/
//   signed:true,    /*默认签名*/
//   rolling:false,    /*在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）*/
//   renew:true,    /*当cookie快过期时请求,会重置cookie的过期时间*/
// }
// app.use(session(CONFIG, app))

const index = require('./routes/index')


const response = require('./middleware/response')

// error handler
onerror(app)

// middlewares
app.use(err());
app.use(cors())
app.use(response());
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 去除一些不需要通过jwt验证的接口
app.use(
  koajwt({secret:JWT_SECRET}).unless({
    path: [
      /^\/api\/login/, 
      // /^\/api\//,
      // 查看文章列表
      /^\/api\/article\/weblist/,
    ]
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
