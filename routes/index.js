const router = require('koa-router')({
  prefix:'/api'
});

const Article = require('../controller/article');
/**
 * 所有路由接口
*/

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// Article
router.get('/article/list', Article.getArticleList);



module.exports =router;
