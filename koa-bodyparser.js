const Koa = require('koa');

const bodyparser = require('koa-bodyparser')
const app = new Koa();


app.use(bodyparser())
app.use(async(ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        //显示表单页面

        let html = `
            <h2> primise Demo</h2>
            <form  method="POST" action="">
              <p>userName</p>
              <input name="userName" /> <br/>
              <p>age</p>
              <input name="age" /> <br/>
              <p>webSite</p>
              <input name='webSite' /><br/>
              <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html

    } else if (ctx.url === '/' && ctx.method === 'POST') {


        //接收数据
        let postdata = ctx.request.body;

        ctx.body = postdata
    } else {
        ctx.body = `<h1>404页面丢失</h1>`
    }
})

app.listen(3000, () => {
    console.log(`app is running at 3000`)
})