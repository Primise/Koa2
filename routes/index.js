/*
 * @Author: your name
 * @Date: 2020-11-24 21:14:46
 * @LastEditTime: 2020-11-26 22:41:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\routes\index.js
 */
const router = require('koa-router')({
  prefix:'/api'
});

const Article = require('../controller/article');
const User = require('../controller/users');
/**
 * 所有路由接口
*/
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// 用户
router.post('/login', User.login)

// Article 文章
router.get('/article/list', Article.getArticleList)

module.exports =router;
