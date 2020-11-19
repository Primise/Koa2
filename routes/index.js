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


// Article 文章
router.get('/article/list', Article.getArticleList);



module.exports =router;
