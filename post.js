const Koa = require('koa');


const app = new Koa();

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
        let postdata = await parsePostData(ctx)

        ctx.body = postdata
    } else {
        ctx.body = `<h1>404页面丢失</h1>`
    }
})

function parsePostData(ctx) {
    return new Promise((reslove, rejcet) => {
        try {
            let postdata = "";
            ctx.req.addListener("data", (data) => {
                postdata += data;
            });
            ctx.req.on('end', () => {
                let parseData = parseQueryStr(postdata);
                reslove(parseData);
            })
        } catch (error) {
            rejcet(error)
        }
    })
}

function parseQueryStr(queryStr) {
    let queryData = {};
    let queryList = queryStr.split("&");
    console.log(queryList)
    console.log(queryList.entries())
    for (let [index, queryStr] of queryList.entries()) {
        let itemList = queryStr.split("=");
        console.log(itemList)
        queryData[itemList[0]] = decodeURIComponent(itemList[1])

    }
    return queryData;
}
app.listen(3000, () => {
    console.log(`app is running at 3000`)
})