/*
 * @Author: your name
 * @Date: 2020-11-24 21:14:46
 * @LastEditTime: 2020-12-03 11:09:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\routes\index.js
 */
const router = require('koa-router')({
  prefix:'/api'
});

const Article = require('../controller/article');
const User = require('../controller/users');
const UploadServer = require('../controller/upload') 
/**
 * 所有路由接口
*/
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

/**
 * 用户操作
 */ 
//用户登录
router.post('/login', User.login)
// router.post('/user/login', User.register)
/**
 * Article 文章
 */ 
//文章列表
router.get('/article/list', Article.getArticleList)
//详情
// router.get('/article/detail:id', Article.articleDetail)
// router.post('/article/add', Article.getArticleList)
// router.get('/article/list', Article.getArticleList)

/**
 * Category 文章
 */ 

 

/**
 * 上传图片
 */
 router.post("/upload",UploadServer.upload)

module.exports =router;
