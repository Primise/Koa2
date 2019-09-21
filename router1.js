const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa();
const router = new Router({
    prefix: '/jszhuang'
});

router
    .get('/', (ctx, next) => {
        ctx.body = 'hello zhangzhuangzhuang '
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo page'
    })

app
    .use(router.routes())
    .use(router.allowedMethods())
app.use(async(ctx) => {

})

app.listen(2200, () => {
    console.log(`app is running at 2200`)
})