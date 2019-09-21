const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa();
let home = new Router();
home.get('/jszhuang', async(ctx, next) => {
    ctx.body = 'Home  jszhuang page'
})
home.get('/todo', async(ctx, next) => {
    ctx.body = 'Home  todo page'
})

let page = new Router();
page.get('/jszhuang', async(ctx, next) => {
    ctx.body = 'page  jszhuang page'
})
page.get('/todo', async(ctx, next) => {
    ctx.body = 'page  todo page'
})

const router = new Router();

router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(2200, () => {
    console.log(`app is running at 2200`)
})