
const router = require('koa-router')({
  prefix:'/api'
})

const controller = require("../controller/public/register")
router.get('/', (ctx)=>{
  ctx.body='默认接口'
})
router.post('/register',controller.registerData)

module.exports = router;