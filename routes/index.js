/*
 * @Author: your name
 * @Date: 2020-11-24 21:14:46
 * @LastEditTime: 2021-01-10 22:16:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\routes\index.js
 */
const router = require('koa-router')({
  prefix:'/api'
});

const Article = require('../controller/article');
const User = require('../controller/users');
const CategoryServer = require('../controller/category') 
const UploadServer = require("../controller/upload")
const UploadToken = require("../utils/token")
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
router.post('/article/delete/:id', Article.delete)

/**
 * Category 文章
 */ 
router.get('/category/list', CategoryServer.categoryList)
router.post('/category/add', CategoryServer.addCategory)
 

/**
 * 上传图片
 */
 router.post("/image/upload",UploadServer.upload)
 router.get("/token",UploadToken.token)










 /**
 *  前端博客web使用的接口，无权限校验
 */
// blog - 文章列表
router.get('/article/weblist', Article.getArticleList);
// blog - 热门文章列表
// Routers.get('/article/webhotlist', Article.webhotlist);
// // blog - 文章详情
router.get('/article/webdetail/:id', Article.detail);
// // blog - 分类列表
// Routers.get('/category/weblist', Category.list);
// // blog - 个人分类列表
// Routers.get('/articletocategory/list', ArticleToCategory.list);
// // blog - 评论列表
// Routers.get('/comment/weblist', Comment.weblist);
// // blog - 评论创建
// Routers.post('/comment/webcreate', Comment.webcreate);
// // blog - 文章评论列表
// Routers.get('/articlecomment/weblist', ArticleComment.weblist);
// // blog - 创建文章评论
// Routers.post('/articlecomment/webcreate', ArticleComment.webcreate);
module.exports =router;
