const Koa = require('koa');

const views = require('koa-views');
const path = require('path')
const app = new Koa();


app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(async(ctx) => {
    let title = 'primise'
    await ctx.render("index", { title })
})

app.listen(3000, () => {
    console.log(`app is running at 3000`)
})