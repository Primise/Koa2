/*
 * @Descripttion: 
 * @version: 
 * @Author: primsie7
 * @Date: 2020-11-17 09:12:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-28 23:11:45
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa  = require("koa-jwt")
const cors = require("koa-cors");
const session = require('koa-session');
//引入中间件
const err= require("./middleware/error");


// koa-session
app.keys = ['some secret hurr']
const CONFIG = {
  key:'koa:sess',    /*cookie key (default is koa:sess)*/
  maxAge:86400000,   /*cookie 的过期时间maxAge in ms (default is 1 days)*/
  overwrite:true,   /*是否可以overwrite (默认default true)*/
  httpOnly:true,    /*cookie 是否只有服务器端可以访问httpOnly or not (default true)*/
  signed:true,    /*默认签名*/
  rolling:false,    /*在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）*/
  renew:true,    /*当cookie快过期时请求,会重置cookie的过期时间*/
}
app.use(session(CONFIG, app))

const index = require('./routes/index')



const response = require('./middleware/response')

// error handler
onerror(app)

// middlewares
app.use(err());
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
  jwtKoa({secret:"blog"}).unless({
    path:[/^\/api\/login/,/^\/api\/register/]
    // path: [/^\/api\/admin\/login/, /^\/api\//]
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
