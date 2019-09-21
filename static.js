const Koa = require('koa');

const path = require('path');

const static = require('koa-static')


const app = new Koa();

const pathStatic = "./static";

app.use(static(path.join(__dirname, pathStatic)))


app.use(async(ctx) => {
    ctx.body = 'hello world'
})
app.listen(3000, () => {
    console.log(` app is running at 3000`)
})