/*
 * @Author: your name
 * @Date: 2020-11-24 21:14:46
 * @LastEditTime: 2020-12-20 21:19:55
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
const CategoryServer = require('../controller/category') 
console.log(CategoryServer)
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
router.post('/article/add', Article.articleAdd)
// router.get('/article/list', Article.getArticleList)

/**
 * Category 文章
 */ 
router.get('/category/list', CategoryServer.categoryList)
router.post('/category/add', CategoryServer.addCategory)
 

/**
 * 上传图片
 */
 router.post("/upload",UploadServer.upload)

module.exports =router;
