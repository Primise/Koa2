const Koa = require('koa');

const app = new Koa();
const fs = require('fs')

function render(page) {
    return new Promise((reslove, reject) => {
        let pageUrl = `./pages/${page}`
        fs.readFile(pageUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                reslove(data)
            }
        })
    })

}
async function route(url) {
    console.log(url)
    let html = '404.html'
    switch (url) {
        case '/':
            html = '404.html'
            break;
        case '/index':
            html = 'index.html'
            break;
        case '/todo':
            html = 'todo.html'
            break;
        default:
            break;
    }
    let page = await render(html)
    return page;
}

app.use(async(ctx) => {
    let url = ctx.request.url;
    let html = await route(url)
    ctx.body = html;
});

app.listen(3000, () => {
    console.log(` app is running at 3000`)
})