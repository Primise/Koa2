const Koa = require('koa');

const app = new Koa();

app.use(async(ctx) => {
    if (ctx.url === '/index') {
        ctx.cookies.set(
            'name', 'zzz'
        )
        ctx.body = `cookie is ok `
    } else {
        ctx.body = 'hello world'
    }
})

app.listen(3000, () => {
    console.log(`app is running at 3000`)
})